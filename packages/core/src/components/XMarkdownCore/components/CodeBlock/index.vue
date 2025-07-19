<script lang="ts" setup>
import type { BundledLanguage } from 'shiki';
import type { ElxRunCodeProps } from '../RunCode/type';
import type { CodeBlockExpose } from './shiki-header';
import type { RawProps } from './types';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight
} from '@shikijs/transformers';
import { codeToHtml } from 'shiki';
import useSWRV from 'swrv';
import { Md5 } from 'ts-md5';
import { computed, h, ref, toValue, watch } from 'vue';
import {
  SHIKI_CACHE_KEY_LENGTH,
  SHIKI_SUPPORT_LANGS,
  shikiThemeDefault
} from '../../shared';
import { useMarkdownContext } from '../MarkdownProvider';
import RunCode from '../RunCode/index.vue';
import {
  controlEle,
  controlHasRunCodeEle,
  copyCode,
  isDark,
  languageEle,
  toggleExpand,
  toggleTheme
} from './shiki-header';
import '../../style/shiki.scss';

const props = withDefaults(
  defineProps<{
    raw?: RawProps;
  }>(),
  {
    raw: () => ({})
  }
);

const context = useMarkdownContext();
const { codeXSlot, customAttrs } = toValue(context) || {};
const preStyle = ref<any | null>(null);
const preClass = ref<string | null>(null);
const themes = computed(() => context?.value?.themes ?? shikiThemeDefault);
const colorReplacements = computed(() => context?.value?.colorReplacements);
const nowViewBtnShow = computed(() => context?.value?.needViewCodeBtn ?? false);
const viewCodeModalOptions = computed(
  () => context?.value?.viewCodeModalOptions
);
const isExpand = ref(true);
const nowCodeLanguage = ref<BundledLanguage>();
const codeAttrs =
  typeof customAttrs?.code === 'function'
    ? customAttrs.code(props.raw)
    : customAttrs?.code || {};
const shikiTransformers = [
  transformerNotationDiff(),
  transformerNotationErrorLevel(),
  transformerNotationFocus(),
  transformerNotationHighlight(),
  transformerNotationWordHighlight()
];

const cacheKey = computed(() => {
  const content = props.raw?.content ?? '';
  return content.length > SHIKI_CACHE_KEY_LENGTH
    ? Md5.hashStr(content)
    : content;
});
// 使用 useSWRV 获取高亮后的代码行，并设置默认值为空数组，保证类型安全
const { data: renderLinesRaw } = useSWRV<string[]>(
  cacheKey,
  async () => {
    try {
      let lines: string[] = [];
      let { language = 'text', content = '' } = props.raw || {};
      // 检查语言是否支持，不支持则使用 text
      if (!(SHIKI_SUPPORT_LANGS as readonly string[]).includes(language)) {
        language = 'text';
      }
      nowCodeLanguage.value = language as BundledLanguage;
      // 调用 shiki 生成高亮 HTML
      const html = await codeToHtml(content.trim(), {
        colorReplacements: colorReplacements.value,
        lang: language as BundledLanguage,
        themes: themes.value,
        transformers: shikiTransformers
      });
      // 解析 HTML，获取 pre 元素和 code 元素
      const parse = new DOMParser();
      const doc = parse.parseFromString(html, 'text/html');
      const preElement = doc.querySelector('pre');
      preStyle.value = preElement?.getAttribute('style');
      const preClassNames = preElement?.className;
      preClass.value = preClassNames ?? '';
      const codeElement = doc.querySelector('pre code');
      if (codeElement) {
        const lineNodes = codeElement.querySelectorAll('.line');
        lines = Array.from(lineNodes).map(line => line.outerHTML);
      }
      return lines;
    } catch (error) {
      // 捕获异常，返回空数组，保证类型安全
      console.error('Error generating HTML:', error);
      return [];
    }
  },
  {
    dedupingInterval: 3000,
    errorRetryCount: 2,
    revalidateOnFocus: false,
    revalidateDebounce: 300
  }
);
// 通过 computed 包装，始终返回 string[]，不会为 undefined
const renderLines = computed(() => renderLinesRaw.value ?? []);
const runCodeOptions = reactive<ElxRunCodeProps>({
  code: [],
  content: '',
  visible: false,
  lang: '',
  preClass: '',
  preStyle: {}
});
function viewCode(renderLines: string[]) {
  if (!renderLines?.length) return;

  Object.assign(runCodeOptions, {
    code: renderLines,
    content: props.raw?.content ?? '',
    lang: nowCodeLanguage.value || 'html',
    preClass: preClass.value || 'pre-md',
    preStyle: preStyle.value || {},
    visible: true
  });
}

watch(
  () => renderLines.value,
  val => {
    if (runCodeOptions.visible) {
      runCodeOptions.code = val;
      runCodeOptions.content = props.raw.content ?? '';
    }
  }
);

// 渲染插槽函数
function renderSlot(slotName: string) {
  if (!codeXSlot) {
    return 'div';
  }
  const slotFn = codeXSlot[slotName];
  if (typeof slotFn === 'function') {
    return slotFn({
      ...props,
      renderLines: renderLines.value,
      isDark,
      isExpand,
      nowViewBtnShow: nowViewBtnShow.value,
      toggleExpand,
      toggleTheme,
      copyCode,
      viewCode
    } satisfies CodeBlockExpose);
  }

  return h(slotFn as any, {
    ...props,
    renderLines: renderLines.value,
    isDark,
    isExpand,
    nowViewBtnShow: nowViewBtnShow.value,
    toggleExpand,
    toggleTheme,
    copyCode,
    viewCode
  } satisfies CodeBlockExpose);
}

function handleHeaderLanguageClick() {
  isExpand.value = !isExpand.value;
}

// 计算属性
const computedClass = computed(() => `pre-md ${preClass.value} is-expanded`);
const codeClass = computed(() => `language-${props.raw?.language || 'text'}`);
const RunCodeComputed = computed(() => {
  return nowCodeLanguage.value === 'html' && nowViewBtnShow.value
    ? RunCode
    : undefined;
});
const codeControllerEleComputed = computed(() => {
  if (nowCodeLanguage.value === 'html' && nowViewBtnShow.value) {
    return controlHasRunCodeEle(
      () => {
        copyCode(renderLines.value);
      },
      () => {
        viewCode(renderLines.value);
      }
    );
  }
  return controlEle(() => {
    copyCode(renderLines.value);
  });
});

watch(
  () => nowViewBtnShow.value,
  v => {
    if (!v) {
      runCodeOptions.visible = false;
    }
  }
);
</script>

<template>
  <div :key="props.raw?.key" :class="computedClass" :style="preStyle">
    <div class="markdown-elxLanguage-header-div is-always-shadow">
      <component
        :is="renderSlot('codeHeader')"
        v-if="codeXSlot?.codeHeader && renderSlot('codeHeader')"
      />
      <template v-else>
        <component
          :is="
            codeXSlot?.codeHeaderLanguage
              ? renderSlot('codeHeaderLanguage')
              : languageEle(props.raw?.language ?? 'text')
          "
          @click="handleHeaderLanguageClick"
        />
        <component
          :is="
            codeXSlot?.codeHeaderControl
              ? renderSlot('codeHeaderControl')
              : codeControllerEleComputed
          "
        />
      </template>
    </div>

    <code
      :class="codeClass"
      :style="{
        display: 'block',
        overflowX: 'auto'
      }"
      v-bind="codeAttrs"
    >
      <span v-for="(line, index) in renderLines" :key="index" v-html="line" />
    </code>
    <component
      :is="RunCodeComputed"
      v-bind="{ ...viewCodeModalOptions, ...runCodeOptions }"
      v-model:visible="runCodeOptions.visible"
    />
  </div>
</template>

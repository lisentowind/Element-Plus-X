<script setup lang="ts">
import type { ThemeRegistrationResolved } from 'shiki';
import type { Ref } from 'vue';
import { parseEChartsOption } from '@components/Markdown/hooks';
import { MARKDOWN_SHIKI_THEME_COLOR_KEY } from '@components/Markdown/shared';
import { nanoid } from 'nanoid';
import { inject, ref, watch } from 'vue';
import VCharts from 'vue-echarts';
import { controlEle, expand, languageEle } from '../CodeBlock/shiki-header';
import { downloadPngBtnEle } from './echarts-header';
import 'echarts';

export interface MarkdownEChartConfig {
  width?: string;
  height?: string;
  margin?: string;
  renderEngine: 'canvas' | 'svg';
}

const props = defineProps<{
  options: any;
  loading?: boolean;
  config?: MarkdownEChartConfig;
}>();

const VChartsRef = ref<InstanceType<typeof VCharts>>();
const Nanoid = nanoid();
const parsedOptions = ref<any>(null);
const parseError = ref<string | null>(null);
const colors = inject<Ref<ThemeRegistrationResolved>>(
  MARKDOWN_SHIKI_THEME_COLOR_KEY
);
const firstRender = ref(true);

const finalConfig: MarkdownEChartConfig = {
  renderEngine: 'svg',
  width: '90%',
  height: '300px',
  margin: '0 auto',
  ...(props.config || {})
};

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 500) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const parseOptions = debounce((value: string | object) => {
  parseEChartsOption(value)
    .then(result => {
      parsedOptions.value = result;
      parseError.value = null;
      console.log('✅ 成功解析 JSON：');
    })
    .catch(err => {
      parsedOptions.value = null;
      parseError.value = err.message;
      console.warn('❌ JSON 解析失败：', err.message);
    });
}, 500);

watch(
  () => props.options,
  val => {
    parseOptions(val);
  },
  { immediate: true }
);
</script>

<template>
  <pre
    class="pre-md markdown-echarts-box"
    :style="{ '--shiki-color-bg': colors?.bg }"
    @vnode-updated="
      (vnode: any) => {
        if (parsedOptions && firstRender) {
          const ele = vnode.el as HTMLElement;
          if (ele && firstRender) {
            firstRender = false;
            setTimeout(() => {
              expand(ele);
            }, 100);
          }
        }
      }
    "
  >
    <div class="markdown-language-header-div el-card is-always-shadow">
      <component :is="languageEle(parseError ? parseError : parsedOptions ? 'echarts' : 'echarts 解析中...')" />
      <component
        :is="controlEle(
          parsedOptions ? [JSON.stringify(parsedOptions)] : [],
          VChartsRef && downloadPngBtnEle(VChartsRef)
        )"
      />
    </div>

    <component
      :is="VCharts"
      v-if="parsedOptions"
      ref="VChartsRef"
      :option="parsedOptions"
      :autoresize="true"
      :init-options="{ renderer: finalConfig.renderEngine }"
      :style="{
        height: finalConfig.height,
        width: finalConfig.width,
        margin: finalConfig.margin,
        backgroundColor: 'transparent'
      }"
      :group="`radiance${Nanoid}`"
      :loading="props.loading"
    />
    <div v-else class="markdown-echarts-content-empty" />
  </pre>
</template>

<style scoped src="./echarts.scss"></style>

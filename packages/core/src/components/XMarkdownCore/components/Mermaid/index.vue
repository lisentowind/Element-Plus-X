<script setup lang="ts">
import type { MdComponent } from '../types';
import type { MermaidToolbarConfig } from './types';
import { MERMAID_CACHE_KEY_LENGTH } from '@components/XMarkdownCore/shared';
import mermaid from 'mermaid';
import { debounce } from 'radash';
import useSWRV from 'swrv';
import { Md5 } from 'ts-md5';
import { computed, nextTick, ref, toValue, watch } from 'vue';
import { useMermaidZoom } from '../../hooks';
import { useMarkdownContext } from '../MarkdownProvider';
import { copyToClipboard, downloadSvgAsPng } from './composables';
import MermaidToolbar from './MermaidToolbar.vue';

interface MermaidProps extends MdComponent {
  toolbarConfig?: MermaidToolbarConfig;
}

const props = withDefaults(defineProps<MermaidProps>(), {
  raw: () => ({}),
  toolbarConfig: () => ({})
});
// should provide a element with class `elx-markdown-mermaid-container` for mermaid to render?
let merMaindContainer = document.querySelector(
  '.elx-markdown-mermaid-container'
) as HTMLElement;
if (!merMaindContainer) {
  merMaindContainer = document.createElement('div') as HTMLElement;
  merMaindContainer.ariaHidden = 'true';
  merMaindContainer.style.maxHeight = '0';
  merMaindContainer.style.opacity = '0';
  merMaindContainer.style.overflow = 'hidden';
  merMaindContainer.classList.add('elx-markdown-mermaid-container');
  document.body.append(merMaindContainer);
}
// 获取插槽上下文
const context = useMarkdownContext();
const { codeXSlot } = toValue(context);

// 计算工具栏配置，合并默认值
const toolbarConfig = computed(() => {
  const contextMermaidConfig = toValue(context)?.mermaidConfig || {};
  return {
    showToolbar: true,
    showFullscreen: true,
    showZoomIn: true,
    showZoomOut: true,
    showReset: true,
    ...contextMermaidConfig,
    ...props.toolbarConfig
  };
});

const svg = ref('');
const containerRef = ref<HTMLElement | null>(null);
const showSourceCode = ref(false);

// 初始化缩放功能
const zoomControls = useMermaidZoom({
  container: containerRef,
  scaleStep: 0.2,
  minScale: 0.1,
  maxScale: 5
});
const cacheKey = computed(() => {
  const content = props.raw?.content ?? '';
  return content.length > MERMAID_CACHE_KEY_LENGTH
    ? `mermaid-${Md5.hashStr(content)}`
    : `mermaid-${content}`;
});
const { data: cachedSvg } = useSWRV<string>(
  cacheKey,
  async () => {
    try {
      const valid = await mermaid.parse(props.raw.content);
      if (valid) {
        mermaid.initialize({
          suppressErrorRendering: true,
          startOnLoad: false,
          securityLevel: 'loose'
        });
        const key = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(
          key,
          props.raw.content,
          merMaindContainer
        );
        return svg;
      }
    } catch (error) {
      console.log('Mermaid parse error:', error);
    }
    return '';
  },
  {
    dedupingInterval: 3000,
    errorRetryCount: 2,
    revalidateOnFocus: false,
    revalidateDebounce: 300
  }
);

// 使用 radash 防抖函数，确保只在最后一次更新后初始化
const debouncedInitialize = debounce({ delay: 500 }, onContentTransitionEnter);

watch(cachedSvg, newSvg => {
  if (newSvg) {
    svg.value = newSvg as string;
    debouncedInitialize();
  }
});

// 工具栏事件处理
function handleZoomIn() {
  if (!showSourceCode.value) {
    zoomControls?.zoomIn();
  }
}

function handleZoomOut() {
  if (!showSourceCode.value) {
    zoomControls?.zoomOut();
  }
}

function handleReset() {
  if (!showSourceCode.value) {
    zoomControls?.reset();
  }
}

function handleFullscreen() {
  if (!showSourceCode.value) {
    zoomControls?.fullscreen();
    zoomControls?.reset();
  }
}

function handleToggleCode() {
  showSourceCode.value = !showSourceCode.value;
}

async function handleCopyCode() {
  if (!props.raw.content) {
    return;
  }
  copyToClipboard(props.raw.content);
}

function handleDownload() {
  downloadSvgAsPng(svg.value);
}
// 处理图表内容过渡完成事件
function onContentTransitionEnter() {
  // 只在图表模式下初始化缩放功能
  if (!showSourceCode.value) {
    // 使用 nextTick 确保 DOM 完全更新
    nextTick(() => {
      if (containerRef.value) {
        zoomControls.initialize();
      }
    });
  }
}

// 创建暴露给插槽的方法对象
const exposedMethods = computed(() => {
  return {
    // 基础属性
    showSourceCode: showSourceCode.value,
    svg: svg.value,
    rawContent: props.raw.content || '',
    toolbarConfig: toolbarConfig.value,

    // 缩放控制方法
    zoomIn: handleZoomIn,
    zoomOut: handleZoomOut,
    reset: handleReset,
    fullscreen: handleFullscreen,

    // 其他操作方法
    toggleCode: handleToggleCode,
    copyCode: handleCopyCode,
    download: handleDownload,

    // 原始 props（除了重复的 toolbarConfig）
    raw: props.raw
  };
});
</script>

<template>
  <div
    ref="containerRef"
    :key="props.raw.key"
    class="markdown-mermaid unselectable"
    unselectable="on"
    onselectstart="return false"
    ondragstart="return false"
  >
    <!-- 工具栏 -->
    <Transition name="toolbar" appear>
      <div class="toolbar-container">
        <!-- 自定义完整头部插槽 -->
        <component
          :is="codeXSlot.codeMermaidHeader"
          v-if="codeXSlot?.codeMermaidHeader"
          v-bind="exposedMethods"
        />
        <!-- 默认工具栏 + 自定义操作插槽 -->
        <template v-else>
          <!-- 自定义操作按钮插槽 -->
          <component
            :is="codeXSlot.codeMermaidHeaderControl"
            v-if="codeXSlot?.codeMermaidHeaderControl"
            v-bind="exposedMethods"
          />
          <!-- 默认工具栏 -->
          <MermaidToolbar
            v-else
            :toolbar-config="toolbarConfig"
            :is-source-code-mode="showSourceCode"
            :source-code="props.raw.content"
            @on-zoom-in="handleZoomIn"
            @on-zoom-out="handleZoomOut"
            @on-reset="handleReset"
            @on-fullscreen="handleFullscreen"
            @on-toggle-code="handleToggleCode"
            @on-copy-code="handleCopyCode"
            @on-download="handleDownload"
          />
        </template>
      </div>
    </Transition>
    <Transition
      name="content"
      mode="out-in"
      @after-enter="onContentTransitionEnter"
    >
      <pre v-if="showSourceCode" key="source" class="mermaid-source-code">
    {{ props.raw.content }}
  </pre
      >
      <div v-else class="mermaid-content" v-html="svg" />
    </Transition>
  </div>
</template>

<style src="./style.scss"></style>

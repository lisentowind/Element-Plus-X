<script setup lang="ts">
import * as echarts from 'echarts';

// 保留原有props.code逻辑，同时添加可选配置
const props = defineProps<{
  code: string; // 原始JSON字符串配置
  width?: string; // 可选：图表宽度
  height?: string; // 可选：图表高度
  theme?: string; // 可选：图表主题
}>();

const refEle = ref<HTMLElement>();
let myChart: echarts.ECharts | null = null; // 图表实例引用

function parseEChartsOption(str: string): any {
  try {
    // Step 1: Remove variable assignment prefix and trailing semicolon
    let cleanedStr = str.replace(/^option\s*=\s*/, '').replace(/;\s*$/, '');

    // Step 2: Replace single quotes with double quotes for string values
    cleanedStr = cleanedStr.replace(/'/g, '"');

    // Step 3: Add double quotes around unquoted keys
    cleanedStr = cleanedStr.replace(/(\w+)\s*:/g, '"$1":');

    // Step 4: Parse the transformed string into JSON object
    return JSON.parse(cleanedStr);
  } catch (error) {
    console.error('Failed to parse ECharts option:', error);
    return null;
  }
}

// 核心渲染逻辑（保留原始解析流程）
function renderChart() {
  if (!refEle.value) return;

  try {
    // 解析JSON配置（保留原有逻辑）
    const cleanedStr = parseEChartsOption(props.code);

    // 初始化/更新图表
    if (!myChart) {
      myChart = echarts.init(refEle.value, props.theme);
    }
    myChart.setOption(cleanedStr);
  } catch (error) {
    console.error('图表配置解析失败:', error);
  }
}

// 窗口resize处理
function handleResize() {
  myChart?.resize();
}

// 销毁逻辑
function destroyChart() {
  if (myChart) {
    myChart.dispose(); // 释放ECharts实例
    myChart = null;
  }
  window.removeEventListener('resize', handleResize);
}

// 初始化渲染
onMounted(() => {
  renderChart();
  window.addEventListener('resize', handleResize); // 添加resize监听
});

// 监听code变化自动更新（关键优化）
watch(
  () => props.code,
  () => {
    renderChart(); // 配置变化时重新渲染
  }
);

// 卸载时清理资源
onUnmounted(() => {
  destroyChart();
});
</script>

<template>
  <div class="echarts-wrap">
    <span class="echarts-titlt">这是我自己定义的 echarts 组件</span>
    <div
      ref="refEle"
      :style="{
        height: height || '400px', // 可选高度，默认400px
        width: width || '100%' // 可选宽度，默认100%
      }"
    />
  </div>
</template>

<style scoped lang="less">
.echarts-wrap {
  position: relative;

  .echarts-titlt {
    position: absolute;
    width: fit-content;
    margin-left: 20px;
    color: blue;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>

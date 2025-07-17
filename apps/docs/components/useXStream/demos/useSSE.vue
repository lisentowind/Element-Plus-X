<docs>
---
title: SSE 基础使用
---

这个钩子函数，是对标 `ant-design-x` 的 `XStream` 方法，我们 融合 `Vue` 的开发范式。

在此基础上，新增了对流式请求的 `中断` 处理，并将 原钩子函数的配置方法，放在了 `startStream` 入参中，让开发者更能理解 这个钩子的作用
</docs>

<script setup lang="ts">
import { useXStream } from 'vue-element-plus-x';

const { startStream, cancel, data, error, isLoading } = useXStream();

// 默认支持 SSE 协议
async function startSSE() {
  try {
    const response = await fetch(
      'https://node-test.element-plus-x.com/api/sse',
      {
        headers: { 'Content-Type': 'text/event-stream' }
      }
    );
    const readableStream = response.body!;
    await startStream({ readableStream });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// 机器人的 content 计算属性
const content = computed(() => {
  if (!data.value.length) return '';
  let text = '';
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index].data;
    try {
      const parsedChunk = JSON.parse(chunk).content;
      text += parsedChunk;
    } catch (error) {
      // 这个 结束标识 是后端给的，所以这里这样判断
      // 实际项目中，以项目需要为准
      if (chunk === ' [DONE]') {
        // 处理数据结束的情况
        // console.log('数据接收完毕')
      } else {
        console.error('解析数据时出错:', error);
      }
    }
    // console.log('New chunk:', chunk)
  }
  console.log('Text:', text);
  return text;
});
</script>

<template>
  <div class="container">
    <div class="btn-list">
      <el-button :disabled="isLoading" @click="startSSE">
        {{ isLoading ? '加载中...' : '获取 SSE流数据' }}
      </el-button>

      <el-button :disabled="!isLoading" @click="cancel()"> 中断请求 </el-button>
    </div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>

    <Bubble
      v-if="content"
      :content="content"
      is-markdown
      style="width: calc(100% - 12px)"
    />
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  .el-button {
    width: fit-content;
  }
  :deep(.markdown-body) {
    background-color: transparent;
    padding: 12px;
  }
}
</style>

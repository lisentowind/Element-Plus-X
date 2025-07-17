<docs>
---
title: SIP 基础使用
---

这里展示对 SIP 协议的支持
</docs>

<script setup lang="ts">
import { useXStream } from 'vue-element-plus-x';

const { startStream, cancel, data, error, isLoading } = useXStream();

async function startSIPStream() {
  try {
    const response = await fetch(
      'https://node-test.element-plus-x.com/api/sip',
      {
        headers: { 'Content-Type': 'application/sip' }
      }
    );
    const readableStream = response.body!;

    // 自定义 transformStream 处理 SIP 数据
    const sipTransformStream = new TransformStream<string, any>({
      transform(chunk, controller) {
        // 这里可以添加 SIP 数据的解析逻辑
        controller.enqueue(chunk);
      }
    });

    await startStream({ readableStream, transformStream: sipTransformStream });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

// 计算属性
const content = computed(() => {
  if (!data.value.length) return '';
  let text = '';
  for (let index = 0; index < data.value.length; index++) {
    const chunk = data.value[index];
    try {
      console.log('chunk', chunk);
      text += chunk;
    } catch (error) {
      console.error('解析数据时出错:', error);
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
      <el-button :disabled="isLoading" @click="startSIPStream">
        {{ isLoading ? '加载中...' : '获取 SIP 协议数据' }}
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

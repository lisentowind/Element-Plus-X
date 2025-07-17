<docs>
---
title: 🐵 支持控制 Bubble 组件 播放、中断/继续、 销毁。支持监听组件状态。
---

💩 更好的控制中断输出、继续打字和销毁等操作
::: tip
😸 内置 `Typewriter` 组件。将 `Typewriter` 组件内的所有属性方法挂载到 `Bubble` 组件上，方便在敏捷开发中使用。
:::

:::info
🐒 如果你觉得内置的 `Typewriter` 组件，不能满足你的需求，还可以 使用 `#content` 插槽对 `Bubble` 组件进行定制化开发。
使用 `#content`, 内置的 `Typewriter` 组件将会失效。在插槽中，你也可以自行和 `Typewriter` 组合使用，也可以自定义 `流式请求` 、 `流式渲染` 等个性化操作。
:::
</docs>

<script setup lang="ts">
import type { TypewriterInstance } from 'vue-element-plus-x/types/Typewriter';
import {
  Delete,
  RefreshLeft,
  VideoPause,
  VideoPlay
} from '@element-plus/icons-vue';

const markdownContent = ref(
  `# 🔥 Bubble 实例方法-事件 \n 😄 使你的打字器可高度定制化。\n - 更方便的控制打字器的状态 \n - 列表项 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n // 🙉 控制台可以查看相关打日志\n console.log('Hello, world!'); \n \`\`\``
);

const isTypingValue = ref(false);
const progressValue = ref(0);
const bubbleRef = ref();
// 开始打字的监听方法
function onStart(instance: TypewriterInstance) {
  console.log('开始打字：组件 ref 实例', unref(instance));
  isTypingValue.value = true;
}
// 打字中，进度监听方法
function onWriting(instance: TypewriterInstance) {
  const progress: number = instance.progress.value;
  // 避免打印打多次 onWriting 事件 😂
  if (progress > 90 && progress < 100) {
    // 可以直接获取打字进度，可以根据打字进度，设置更炫酷的样式
    // console.log('Writing', `${progress}%`)
    console.log(
      '打字中 isTyping:',
      instance.isTyping.value,
      'progress:',
      progress
    );
  }

  if (~~progress === 80) {
    console.log(
      '打字中 progress 为 80% 时候的内容',
      instance.renderedContent.value
    );
  }
  isTypingValue.value = true;
  progressValue.value = ~~progress; // 通过运算符~~取整 💩
}
// 监听打字结束事件
function onFinish(instance: TypewriterInstance) {
  isTypingValue.value = false;
  console.log(
    '打字结束 isTyping',
    instance.isTyping.value,
    'progress:',
    instance.progress.value
  );
}
// 组件实例方法，控制 暂停打字
function onInterrupt() {
  bubbleRef.value.interrupt();
  isTypingValue.value = false;
}
function onDestroy() {
  bubbleRef.value.destroy();
  isTypingValue.value = false;
  progressValue.value = 0;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button
        v-if="isTypingValue"
        type="warning"
        style="width: fit-content"
        @click="onInterrupt"
      >
        <el-icon :size="18">
          <VideoPause />
        </el-icon>
        <span>暂停</span>
      </el-button>
      <el-button
        v-if="!isTypingValue && progressValue !== 0 && progressValue !== 100"
        type="success"
        style="width: fit-content"
        @click="bubbleRef?.continue()"
      >
        <el-icon :size="18">
          <VideoPlay />
        </el-icon>
        <span>继续</span>
      </el-button>
      <el-button
        v-if="!isTypingValue && (progressValue === 0 || progressValue === 100)"
        type="primary"
        style="width: fit-content"
        @click="bubbleRef?.restart()"
      >
        <el-icon :size="18">
          <RefreshLeft />
        </el-icon>
        <span>重播</span>
      </el-button>
      <el-button type="danger" style="width: fit-content" @click="onDestroy">
        <el-icon>
          <Delete />
        </el-icon>
        <span>销毁</span>
      </el-button>
    </div>

    <el-progress
      v-if="progressValue > 0 && progressValue !== 100"
      :duration="0"
      :percentage="progressValue"
    />
    <el-progress
      v-if="progressValue === 100"
      :percentage="100"
      status="success"
    />

    <!-- 这里展示了如果是 markdown 的话，typing.suffix 会被忽略 -->
    <Bubble
      ref="bubbleRef"
      :content="markdownContent"
      :typing="{ suffix: '💩', interval: 40 }"
      :is-markdown="true"
      @start="onStart"
      @writing="onWriting"
      @finish="onFinish"
    />
  </div>
</template>

<style scoped lang="less">
// 避免 markdown-body 样式被覆盖
:deep(.markdown-body) {
  background: transparent;
}
</style>

<docs>
---
title: default-theme-mode 属性
---

通过 `default-theme-mode` 属性，设置代码块高亮，默认是高亮主题还是默认是暗黑主题。

:::info
这里文档中演示可能会受 vitePress 的样式影响，请自行查看效果。如果在项目中，使用属性无效，可以加入👉[交流群](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81)。反馈一下
:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`js
console.log('hello world');
\`\`\`
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" default-theme-mode="light" />
  </div>
</template>

<style scoped lang="less"></style>

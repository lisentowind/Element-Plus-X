<docs>
---
title: 覆盖样式
---

如果你集成该组件时，发现组件内置的样式变的奇怪。可能是你项目的内置全局样式，和这个组件的一些基础样式有冲突。那么你可以通过覆盖样式的方式来解决这个问题。

:::info
创建一个样式文件，例如：`self-markdown.css`，并添加一些自定义样式内容：

```css
.h1 {
  font-size: 24px;
  color: red;
  margin-bottom: 16px;
}
```

将这个文件引入到你的项目，例如：

```ts
import 'self-markdown.css'
```

如果没有覆盖，大概率是因为你设置层级不够，可以尝试样式穿透
:::
</docs>

<script setup lang="ts">
const markdown = `
# 一级标题
## 二级标题
### 三级标题
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" class="self-markdown-body" />
  </div>
</template>

<style scoped lang="less">
.self-markdown-body {
  :deep(h1) {
    font-size: 24px;
    color: red;
    margin-bottom: 16px;
  }
  :deep(h2) {
    margin: 0;
    font-size: 20px;
    color: blue;
    margin-bottom: 16px;
  }
}
</style>

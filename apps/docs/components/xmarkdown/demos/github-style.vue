<docs>
---
title: github 样式
---

市场上也有很多优秀的作者，开源了他们的 markdown 样式，这里演示一个集成使用 github 样式的案例。

你可以直接下载 [github-markdown.css](https://cdn.jsdelivr.net/npm/github-markdown-css@latest/github-markdown.min.css) 这个文件，或者把样式代码复制到自己的 css 文件中。然后在项目中引用。

:::warning
不过值得注意的是，一般这种文件样式，都是被 `markdown-body` 类名包住的。光引入样式文件，是不行的。你可能还需要给 `XMarkdown` 添加一个类名，来让样式生效。这个类名和引入的样式文件中的最外层的类名，应该保持一致。
:::
</docs>

<script setup lang="ts">
// （假如你的样式文件存在）引入样式文件
// import "./github-markdown.css"

const markdown = `
# 一级标题
## 二级标题
### 三级标题
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <!-- 这里设置类名，让 github 样式生效 -->
    <XMarkdown :markdown="markdown" class="markdown-body" />
  </div>
</template>

<style scoped lang="less"></style>

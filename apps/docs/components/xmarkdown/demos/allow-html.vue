<docs>
---
title: 是否开启 html 标签渲染
---

支持 html 标签渲染，使用 `allowHtml` 属性开启，默认开启。
</docs>

<script setup lang="ts">
const markdown = `<div style="color: red;">这是一个 html 标签测试。</div>`;
const value1 = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-switch v-model="value1" />
    <XMarkdown :markdown="markdown" :allow-html="value1" />
  </div>
</template>

<style scoped lang="less"></style>

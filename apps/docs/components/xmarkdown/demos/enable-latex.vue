<docs>
---
title: 是否开启对 latex 数学公式渲染
---

支持 latex 数学公式渲染，使用 `enableLatex` 属性开启，默认开启。
</docs>

<script setup lang="ts">
const markdown = `
### 行内公式
$e^{i\\pi} + 1 = 0$

### 块级公式
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$
`;
const value1 = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-switch v-model="value1" />
    <XMarkdown :markdown="markdown" :enable-latex="value1" />
  </div>
</template>

<style scoped lang="less"></style>

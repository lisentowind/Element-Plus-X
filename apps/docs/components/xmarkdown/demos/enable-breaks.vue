<docs>
---
title: 是否开启 breaks 渲染
---

支持 remark-breaks 渲染，使用 `enableBreaks` 属性开启，默认开启。

支持硬中断而不需要空格或转义符（将回车符变成 `<br>`）。让你的内容渲染更加还原。
</docs>

<script setup lang="ts">
const markdown = `Mars is
the fourth planet`;
const value1 = ref(true);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-switch v-model="value1" />
    <XMarkdown :markdown="markdown" :enable-breaks="value1" />
  </div>
</template>

<style scoped lang="less"></style>

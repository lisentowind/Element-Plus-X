<docs>
---
title: customAttrs 自定义属性
---

使用 `customAttrs` 属性，接收一个对象，对象中的属性为标签名，值为标签的属性。匹配一个标签，就会给该标签添加相应的属性。
</docs>

<script setup lang="ts">
const markdown = `
<a href="https://element-plus-x.com/">element-plus-x</a>
<h1>标题1</h1>
<h2>标题2</h2>

<self-btn>给自定义标签添加 el-button 类名</self-btn>
`;

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfAttrs = {
  a: () => ({
    target: '_blank',
    rel: 'noopener noreferrer'
  }),
  h1: {
    style: {
      color: 'red',
      fontSize: '24px'
    }
  },
  h2: {
    style: {
      color: 'blue',
      fontSize: '20px'
    }
  },
  // 给自定义标签添加 el-button 类名
  'self-btn': {
    class: 'el-button'
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :custom-attrs="selfAttrs" />
  </div>
</template>

<style scoped lang="less"></style>

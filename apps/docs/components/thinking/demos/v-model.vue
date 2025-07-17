<docs>
---
title: v-model 属性 受控组件
---

通过 v-model 属性，我们可以设置 默认状态。
</docs>

<script setup lang="ts">
const senderValue = ref(true);
</script>

<template>
  <div>
    <Thinking v-model="senderValue" content="欢迎使用 Element-Plus-X" />
  </div>
</template>

<style scoped lang="less"></style>

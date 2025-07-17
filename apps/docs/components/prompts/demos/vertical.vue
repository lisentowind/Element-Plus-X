<docs>
---
title: 纵向展示
---

使用 `vertical` 属性，控制 `Prompts` 展示方向。注意这个是作用在整个 `Prompts` 组件上，而不是单个 `PromptsItem` 上。
</docs>

<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts';

const items = ref<PromptsItemsProps[]>([
  {
    key: '1',
    label: '🐛 提示集组件标题',
    description: '描述信息'.repeat(3)
  },
  {
    key: '2',
    label: '🐛 我是被禁用的',
    disabled: true
  },
  {
    key: '3',
    label: '🐛 单个禁用控制更准确',
    disabled: true
  },
  {
    key: '4',
    label: '🐛 提示集组件标题'
  }
]);

function handleItemClick(item: PromptsItemsProps) {
  ElMessage.success(`点击了 ${item.key}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Prompts
      title="🐵 提示集组件标题"
      :items="items"
      vertical
      @item-click="handleItemClick"
    />
  </div>
</template>

<style scoped lang="less"></style>

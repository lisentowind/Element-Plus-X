<docs>
---
title: 基础用法
---

快速创建一组提示集列表。默认超出不会换行，且隐藏滚动条。
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
    label: '🐛 提示集组件标题'
  },
  {
    key: '3',
    label: '🐛 提示集组件标题'
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
      @item-click="handleItemClick"
    />
  </div>
</template>

<style scoped lang="less"></style>

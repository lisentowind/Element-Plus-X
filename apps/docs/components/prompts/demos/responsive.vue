<docs>
---
title: 响应式宽度

---

配合 `wrap` 与 `styles` 固定宽度展示。 注意是作用在 `PromptsItem` 上结合使用才会生效。单独作用方便更定制化。
</docs>

<script setup lang="ts">
import type { PromptsItemsProps } from 'vue-element-plus-x/types/Prompts';

const items = ref<PromptsItemsProps[]>([
  {
    key: '1',
    label: '🐛 提示集组件标题',
    description: '描述信息'.repeat(3),
    itemStyle: { width: 'calc(50% - 6px)' }
  },
  {
    key: '2',
    label: '🐛 我是被禁用的',
    disabled: true,
    itemStyle: { width: 'calc(50% - 6px)' }
  },
  {
    key: '3',
    label: '🐛 单个禁用控制更准确',
    disabled: true,
    itemStyle: { width: 'calc(50% - 6px)' }
  },
  {
    key: '4',
    label: '🐛 提示集组件标题',
    itemStyle: { width: 'calc(50% - 6px)' }
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
      wrap
      @item-click="handleItemClick"
    />
  </div>
</template>

<style scoped lang="less"></style>

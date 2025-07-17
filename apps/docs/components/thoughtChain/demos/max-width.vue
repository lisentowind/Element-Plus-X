<docs>
---
title: maxWidth 属性
---

设置 思维链的最大宽度，默认 '500px'。字符串类型，意味着你可以传入百分比，如 '50%'。或其他单位，甚至 css 计算宽度，如 'calc(100% - 200px)'。
</docs>

<script setup lang="ts">
import type { ThoughtChainItemProps } from 'vue-element-plus-x/types/ThoughtChain';

interface DataType {
  id: string;
  title?: string;
  thinkTitle?: string;
  thinkContent?: string;
  status?: 'success' | 'loading' | 'error';
  hideTitle?: boolean;
}

const thinkingItems: ThoughtChainItemProps<DataType>[] = [
  {
    id: '1',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: true,
    title: '成功-主标题',
    thinkTitle: '思考内容标题-默认展开',
    thinkContent: '进行搜索文字'.repeat(20)
  }
];
</script>

<template>
  <ThoughtChain
    :thinking-items="thinkingItems"
    max-width="calc(100% - 300px)"
  />
</template>

<style scoped lang="less"></style>

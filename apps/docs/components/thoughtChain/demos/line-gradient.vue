<docs>
---
title: lineGradient 属性
---

启用线条颜色渐变，但不支持自定义颜色。当数组大于 1 时有效
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
  },
  {
    id: '2',
    status: 'loading',
    isCanExpand: true,
    title: '加载-主标题',
    thinkTitle: '思考内容标题-默认展开',
    thinkContent: '进行搜索文字'.repeat(20)
  },
  {
    id: '3',
    status: 'error',
    isCanExpand: true,
    title: '失败-主标题',
    thinkTitle: '思考内容标题-默认展开',
    thinkContent: '进行搜索文字'.repeat(20)
  },
  {
    id: '4',
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
  <ThoughtChain :thinking-items="thinkingItems" line-gradient />
</template>

<style scoped lang="less"></style>

<docs>
---
title: dotSize 属性
---

默认值是 `default`，可选值有 `small`、`default`、`large`。
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
    thinkContent: '进行搜索文字'.repeat(10)
  },
  {
    id: '2',
    title: '加载中-主标题',
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: '思考内容标题',
    thinkContent: '进行搜索文字'.repeat(10)
  },
  {
    id: '3',
    title: '失败-主标题',
    status: 'error',
    isCanExpand: true,
    isDefaultExpand: false,
    thinkTitle: '思考内容标题',
    thinkContent: '进行搜索文字'.repeat(10)
  },
  {
    id: '4',
    hideTitle: true,
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: true,
    thinkTitle: '隐藏主标题，思考内容标题-默认展开',
    thinkContent: '进行搜索文字'.repeat(10)
  }
];
</script>

<template>
  <ThoughtChain :thinking-items="thinkingItems" dot-size="small" />
  <ThoughtChain :thinking-items="thinkingItems" dot-size="large" />
</template>

<style scoped lang="less"></style>

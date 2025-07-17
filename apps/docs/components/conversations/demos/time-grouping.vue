<docs>
---
title: 时间分组与吸顶效果
---

自动根据会话项的 `group` 字段分组，滚动时分组标题吸顶显示，提升导航体验。
</docs>

<script setup lang="ts">
import type { ConversationItem } from 'vue-element-plus-x/types/Conversations';

const timeBasedItems = ref<ConversationItem<{ id: string; label: string }>[]>([
  {
    id: '1',
    label: '今天的会话111111111111111111111111111',
    group: 'today',
    disabled: true
  },
  {
    id: '2',
    group: 'today',
    label: '今天的会话2'
  },
  {
    id: '3',
    group: 'yesterday',
    label: '昨天的会话1'
  },
  {
    id: '4',
    label: '昨天的会话2'
  },
  {
    id: '5',
    label: '一周前的会话'
  },
  {
    id: '6',
    label: '一个月前的会话'
  },
  {
    id: '7',
    label: '很久以前的会话'
  }
]);

const activeKey1 = ref('1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey1"
      :items="timeBasedItems"
      groupable
      :label-max-width="200"
      :show-tooltip="false"
      row-key="id"
    />
  </div>
</template>

<style scoped lang="less"></style>

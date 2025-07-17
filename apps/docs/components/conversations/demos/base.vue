<docs>
---
title: 基础使用
---

通过 `@change` 事件 获取选中的会话信息。 `v-model:active` 绑定当前选中的会话。
</docs>

<script setup lang="ts">
import type { ConversationItem } from 'vue-element-plus-x/types/Conversations';

const timeBasedItems = ref<ConversationItem<{ id: string; label: string }>[]>([
  {
    id: '1',
    label: '今天的会话111111111111111111111111111',
    group: 'today'
  },
  {
    id: '2',
    group: 'today',
    label: '今天的会话2',
    disabled: true
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

const activeKey1 = ref();

function handleChange(item: ConversationItem<{ id: string; label: string }>) {
  ElMessage.success(`选中了: ${item.label}`);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey1"
      :items="timeBasedItems"
      :label-max-width="200"
      :show-tooltip="true"
      row-key="id"
      @change="handleChange"
    />
  </div>
</template>

<style scoped lang="less"></style>

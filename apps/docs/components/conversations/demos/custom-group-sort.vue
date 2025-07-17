<docs>
---
title: 自定义分组排序
---

通过 `groupable` 属性传入排序函数，自定义分组顺序（如：学习 > 工作 > 个人 > 未分组）。
</docs>

<script setup lang="ts">
import type { GroupableOptions } from 'vue-element-plus-x/types/Conversations';

const groupBasedItems = ref([
  {
    key: 'g1',
    label: '工作文档1',
    group: '工作'
  },
  {
    key: 'g2',
    label: '工作文档11111111111111111111111111111111111111111',
    group: '工作'
  },
  {
    key: 'g3',
    label: '工作文档3',
    group: '工作'
  },
  {
    key: 'g4',
    label: '工作文档4',
    group: '工作'
  },
  {
    key: 'g5',
    label: '工作文档5',
    group: '工作'
  },
  {
    key: 'g6',
    label: '工作文档6',
    group: '工作'
  },
  {
    key: 'g7',
    label: '学习笔记1',
    group: '学习'
  },
  {
    key: 'g8',
    label: '学习笔记2',
    group: '学习'
  },
  {
    key: 'g9',
    label: '个人文档1',
    group: '个人'
  },
  {
    key: 'g10',
    label: '未分组项目'
  }
]);

// 自定义分组选项
const customGroupOptions: GroupableOptions = {
  // 自定义分组排序，学习 > 工作 > 个人 > 未分组
  sort: (a: any, b: any) => {
    const order: Record<string, number> = {
      学习: 0,
      工作: 1,
      个人: 2,
      未分组: 3
    };
    const orderA = order[a] !== undefined ? order[a] : 999;
    const orderB = order[b] !== undefined ? order[b] : 999;
    return orderA - orderB;
  }
};

const activeKey2 = ref('g1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey2"
      :items="groupBasedItems"
      :groupable="customGroupOptions"
      :label-max-width="200"
      :show-tooltip="true"
      show-to-top-btn
      row-key="key"
    >
      <template #groupTitle="{ group }">
        <div class="custom-group-title">
          <!-- 为不同组添加不同的前缀 -->
          <span v-if="group.title === '工作'">📊 </span>
          <span v-else-if="group.title === '学习'">📚 </span>
          <span v-else-if="group.title === '个人'">🏠 </span>
          <span v-else>📁 </span>
          {{ group.title }}
        </div>
      </template>
    </Conversations>
  </div>
</template>

<style scoped lang="less">
.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #409eff;
}
</style>

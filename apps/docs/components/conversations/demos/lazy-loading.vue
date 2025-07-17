<docs>
---
title: 懒加载功能
---

滚动至底部时自动触发加载更多数据，支持加载状态显示，优化大数据量场景性能。
</docs>

<script setup lang="ts">
import { ChatDotRound, ChatLineRound } from '@element-plus/icons-vue';

const lazyItems = shallowRef([
  {
    key: 'l1',
    label: '初始项目1',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l2',
    label: '初始项目2',
    prefixIcon: ChatDotRound
  },
  {
    key: 'l3',
    label: '初始项目3',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l4',
    label: '初始项目1',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l5',
    label: '初始项目2',
    prefixIcon: ChatDotRound
  },
  {
    key: 'l6',
    label: '初始项目3',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l7',
    label: '初始项目1',
    prefixIcon: ChatLineRound
  },
  {
    key: 'l8',
    label: '初始项目2',
    prefixIcon: ChatDotRound
  },
  {
    key: 'l9',
    label: '初始项目3',
    prefixIcon: ChatLineRound
  }
]);

// 加载更多处理
const isLoading = ref(false);

function loadMoreItems() {
  if (isLoading.value) return;

  isLoading.value = true;
  console.log('加载更多数据...');

  // 模拟异步加载
  setTimeout(() => {
    const newItems = [
      {
        key: `l${lazyItems.value.length + 1}`,
        label: `加载的项目${lazyItems.value.length + 1}`,
        prefixIcon: markRaw(ChatLineRound)
      },
      {
        key: `l${lazyItems.value.length + 2}`,
        label: `加载的项目${lazyItems.value.length + 2}`,
        prefixIcon: markRaw(ChatDotRound)
      }
    ];

    lazyItems.value = [...lazyItems.value, ...newItems];
    isLoading.value = false;
  }, 2000);
}

const activeKey6 = ref('l1');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey6"
      :items="lazyItems"
      :label-max-width="200"
      row-key="key"
      :show-tooltip="true"
      :load-more="loadMoreItems"
      :load-more-loading="isLoading"
      show-to-top-btn
    />
  </div>
</template>

<style scoped lang="less"></style>

<docs>
---
title: 操作列表插槽
---

通过 `#action-list` 插槽用于自定义输入框的操作列表内容。

::: info
当你使用 `#action-list` 插槽时，会隐藏内置的输入框的操作按钮。你可以通过和 `组件实例方法` 相结合，实现更丰富的操作。
:::
</docs>

<script setup lang="ts">
import {
  Delete,
  Loading,
  Operation,
  Position,
  Promotion,
  Right,
  Setting
} from '@element-plus/icons-vue';

const senderRef = ref();
const senderValue = ref('');
const loading = ref(false);

function handleSubmit() {
  console.log('submit', senderValue.value);
  senderRef.value.submit();
  loading.value = true;
}

function handleCancel() {
  console.log('cancel');
  loading.value = false;
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <MentionSender>
      <!-- 自定义操作列表 -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button type="danger" circle>
            <el-icon><Delete /></el-icon>
          </el-button>

          <el-button type="primary" circle style="rotate: -45deg">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>
      </template>
    </MentionSender>

    <MentionSender>
      <!-- 自定义操作列表 -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button type="primary" plain circle color="#626aef">
            <el-icon><Operation /></el-icon>
          </el-button>

          <el-button type="primary" circle color="#626aef">
            <el-icon><Right /></el-icon>
          </el-button>
        </div>
      </template>
    </MentionSender>

    <MentionSender>
      <!-- 自定义操作列表 -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button plain circle color="#eebe77">
            <el-icon><Setting /></el-icon>
          </el-button>

          <el-button type="primary" plain circle>
            <el-icon><Promotion /></el-icon>
          </el-button>
        </div>
      </template>
    </MentionSender>

    <MentionSender ref="senderRef" v-model="senderValue" :loading="loading">
      <!-- 自定义操作列表 -->
      <template #action-list>
        <div class="action-list-self-wrap">
          <el-button
            v-if="loading"
            type="primary"
            plain
            circle
            @click="handleCancel"
          >
            <el-icon class="is-loaidng">
              <Loading />
            </el-icon>
          </el-button>

          <el-button v-else plain circle @click="handleSubmit">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>
      </template>
    </MentionSender>
  </div>
</template>

<style scoped lang="less">
.action-list-self-wrap {
  display: flex;
  align-items: center;
  & > span {
    width: 120px;
    font-weight: 600;
    color: var(--el-color-primary);
  }
}

.is-loaidng {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

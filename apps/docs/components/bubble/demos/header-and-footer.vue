<docs>
---
title: 支持自定义气泡 头部、底部 内容
---

通过 `#header` 和 `#footer` 插槽 来自定义气泡的头部和底部。
</docs>

<script setup lang="ts">
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue';

const content = ref(
  '嗨！你好，欢迎使用 Element Plus X，有什么问题，可以问我哦~'
);
const avatarAI =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
</script>

<template>
  <Bubble :content="content">
    <template #avatar>
      <el-avatar :src="avatarAI" />
    </template>
    <template #header>
      <span>Element Plus X</span>
    </template>
    <template #footer>
      <div class="footer-container">
        <el-button type="info" :icon="Refresh" size="small" circle />
        <el-button type="success" :icon="Search" size="small" circle />
        <el-button type="warning" :icon="Star" size="small" circle />
        <el-button color="#626aef" :icon="DocumentCopy" size="small" circle />
      </div>
    </template>
  </Bubble>
</template>

<style scoped lang="less">
.footer-container {
  :deep(.el-button + .el-button) {
    margin-left: 8px;
  }
}
</style>

<docs>
---
title: 删除图标、删除事件
---

可以设置 `showDelIcon` 属性来显示删除图标，并设置 `@delete` 方法来设置删除事件。
</docs>

<script setup lang="ts">
function handleDel() {
  ElMessage.success('删除成功');
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard name="删除测试文件.md" show-del-icon @delete="handleDel" />
  </div>
</template>

<style scoped lang="less"></style>

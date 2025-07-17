<docs>
---
title: 定制样式
---

通过 `style`/`hoverStyle` 自定义卡片样式，支持悬停删除图标和自定义插槽扩展。
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <FilesCard
      name="自定义style样式.xls"
      style="
        background-color: #f0f9eb;
        border: 2px solid #67c23a;
        border-radius: 20px;
      "
    />
    <FilesCard
      name="自定义hoverStyle样式.xls"
      style="
        background-color: #f0f9eb;
        border: 1px solid #67c23a;
        border-radius: 20px;
      "
      :hover-style="{
        'box-shadow': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        'border-color': 'red',
        'background-color': 'rgba(255, 0, 0, 0.1)'
      }"
    />
  </div>
</template>

<style scoped lang="less"></style>

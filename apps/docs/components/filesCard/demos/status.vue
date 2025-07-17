<docs>
---
title: status 和 percent 属性
---

控制文件加载状态（上传中、完成、失败）及进度显示。
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div class="files-card-container-wrapper">
      <span>设置 status 属性，控制文件加载状态 "uploading","done","error"</span>
      <div class="files-card-container">
        <FilesCard name="uploading 测试文件.pdf" status="uploading" />
        <FilesCard name="done 测试文件.pdf" status="done" />
        <FilesCard name="error 测试文件.pdf" status="error" />
      </div>
      <span
        >"uploading"+"percent"
        控制上传进度，"error"+"errorTip"控制自定义失败提示
      </span>
      <div class="files-card-container">
        <FilesCard
          name="uploading 测试文件.doc"
          status="uploading"
          :percent="50"
        />
        <FilesCard
          name="error 测试文件.doc"
          status="error"
          error-tip="自定义失败提示"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.files-card-container-wrapper {
  display: flex;
  gap: 12px;
  flex-direction: column;

  .files-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>

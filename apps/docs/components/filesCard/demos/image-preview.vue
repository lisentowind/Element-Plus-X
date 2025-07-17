<docs>
---
title: 图片文件专区
---

支持图片预览、正方形/长方形变体、上传状态覆盖层等功能。同样也可以 通过 status 和 percent 控制。
</docs>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div class="files-card-container-wrapper">
      <span
        >图片文件 <span style="color: red">可预览</span> 和
        <span style="color: red">不可预览</span></span
      >
      <div class="files-card-container">
        <FilesCard
          name="可预览的图片.jpeg"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard name="无法预览的图片.jpeg" show-del-icon />
      </div>
      <span
        >图片文件
        <span style="color: red">正方形变体</span>
        其他格式不受变体属性影响</span
      >
      <div class="files-card-container">
        <FilesCard
          name="可预览的图片.jpeg"
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
          img-variant="square"
          show-del-icon
        />
        <FilesCard
          name="无法预览的图片.jpeg"
          img-variant="square"
          show-del-icon
        />
        <FilesCard
          name="其他文件不受变体影响.txt"
          img-variant="square"
          show-del-icon
          :file-size="30000"
        />
      </div>
      <span
        >图片文件 默认长方形变体
        <span style="color: red"
          >支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span
        ></span
      >
      <div class="files-card-container">
        <FilesCard
          name="上传进度.jpeg"
          :percent="50"
          status="uploading"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="上传失败.jpeg"
          status="error"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="关闭预览悬停遮罩.jpeg"
          :img-preview-mask="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="关闭预览功能.jpeg"
          :img-preview="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
      </div>

      <span
        >图片文件 正方形变体
        <span style="color: red"
          >支持上传状态 、支持预览开启关闭 、支持预览遮罩蒙层开启关闭</span
        ></span
      >
      <div class="files-card-container">
        <FilesCard
          name="上传进度.jpeg"
          img-variant="square"
          :percent="50"
          status="uploading"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="上传失败.jpeg"
          img-variant="square"
          status="error"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="上传完成.jpeg"
          img-variant="square"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="关闭预览悬停遮罩.jpeg"
          img-variant="square"
          :img-preview-mask="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
        />
        <FilesCard
          name="关闭预览功能.jpeg"
          img-variant="square"
          :img-preview="false"
          show-del-icon
          url="https://avatars.githubusercontent.com/u/76239030?v=4"
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

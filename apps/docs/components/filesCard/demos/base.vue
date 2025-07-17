<docs>
---
title: 基础用法
---

你可以在 组件实例上拿到 colorMap 内置文件类型 fileType: color 对象。 内置了 16 种文件类型图标。
</docs>

<script setup lang="ts">
import type { FilesType } from 'vue-element-plus-x/types/FilesCard';

const filesCardRef = ref();
const colorMap = ref({}) as Ref<Record<FilesType, string>>;

onMounted(() => {
  // 获取内置颜色
  colorMap.value = filesCardRef.value?.colorMap;
  console.log(colorMap.value);
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>设置 name 属性, 且 name 没有后缀。name="测试文件"</span>
    <FilesCard ref="filesCardRef" name="测试文件" />
    <span>设置 name 属性，有文件后缀。name="测试文件.pdf"</span>
    <FilesCard name="测试文件.pdf" />
    <span>支持更据 name 后缀匹配内置图标 </span>
    <div class="files-card-container">
      <FilesCard name="测试doc后缀.doc" />
      <FilesCard name="测试xls后缀.xls" />
      <FilesCard name="测试ppt后缀.ppt" />
      <FilesCard name="测试txt后缀.txt" />
      <FilesCard name="测试pdf后缀.pdf" />
      <FilesCard name="测试png后缀.png" />
      <FilesCard name="测试jpg后缀.jpg" />
      <FilesCard name="测试gif后缀.gif" />
      <FilesCard name="测试mp4后缀.mp4" />
      <FilesCard name="测试mp3后缀.mp3" />
      <FilesCard name="测试zip后缀.zip" />
      <FilesCard name="测试rar后缀.rar" />
      <FilesCard name="测试7z后缀.7z" />
      <FilesCard name="测试lnk后缀.lnk" />
      <FilesCard name="测试obj后缀.obj" />
      <FilesCard name="测试fbx后缀.fbx" />
      <FilesCard name="测试glb后缀.glb" />
      <FilesCard name="测试sql后缀.sql" />
      <FilesCard name="测试db后缀.db" />
      <FilesCard name="测试md后缀.md" />
      <FilesCard name="测试js后缀.js" />
      <FilesCard name="测试py后缀.py" />
      <FilesCard name="测试java后缀.java" />
      <FilesCard name="测试php后缀.php" />
      <FilesCard name="测试json后缀.json" />
    </div>
    <span>如果有后缀，但是匹配不到常用的图标，则默认为 File 文件</span>
    <FilesCard name="https://dd.com多个特殊字符.后缀.self" />
  </div>
</template>

<style scoped lang="less">
.files-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>

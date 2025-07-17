<docs>
---
title: 自定义内置文件对应的颜色
---
</docs>

<script setup lang="ts">
import type {
  FilesCardProps,
  FilesType
} from 'vue-element-plus-x/types/FilesCard';

// 自己定义文件颜色1
const colorMap1: Record<FilesType, string> = {
  word: '#5E74A8',
  excel: '#4A6B4A',
  ppt: '#C27C40',
  pdf: '#5A6976',
  txt: '#D4C58C',
  mark: '#FFA500',
  image: '#8E7CC3',
  audio: '#A67B5B',
  video: '#4A5568',
  three: '#5F9E86',
  code: '#4B636E',
  database: '#4A5A6B',
  link: '#5D7CBA',
  zip: '#8B5E3C',
  file: '#AAB2BF',
  unknown: '#888888'
};

// 自己定义文件颜色2
const colorMap2: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#4CB050',
  ppt: '#FF9933',
  pdf: '#E81123',
  txt: '#666666',
  mark: '#FFA500',
  image: '#B490F3',
  audio: '#00B2EE',
  video: '#2EC4B6',
  three: '#00C8FF',
  code: '#00589F',
  database: '#F5A623',
  link: '#007BFF',
  zip: '#888888',
  file: '#F0D9B5',
  unknown: '#D8D8D8'
};

type ColorKey = keyof typeof colorMap1;
const colorKeys = computed(() => Object.keys(colorMap1) as ColorKey[]);

const filesCardProps = ref<FilesCardProps>({
  uid: '1',
  name: '测试名称',
  description: '测试description'
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div class="files-card-container-wrapper">
      <p>自定义颜色1</p>
      <div class="files-card-container">
        <FilesCard
          v-for="items in colorKeys"
          :key="items"
          v-bind="{ ...filesCardProps }"
          :icon-color="colorMap1[items]"
          :file-type="items"
        />
      </div>
      <p>自定义颜色2</p>
      <div class="files-card-container">
        <FilesCard
          v-for="items in colorKeys"
          :key="items"
          v-bind="{ ...filesCardProps }"
          :icon-color="colorMap2[items]"
          :file-type="items"
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

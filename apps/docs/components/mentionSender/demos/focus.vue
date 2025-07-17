<docs>
---
title: 聚焦失焦
---

通过 ref 选项控制聚焦。

::: info
通过组件实例控制

- `senderRef.value.focus('all')` 聚焦到整个文本 （默认）
- `senderRef.value.focus('start')` 聚焦到文本最前方
- `senderRef.value.focus('end')` 聚焦到文本最后方
- `senderRef.value.blur()` 失去焦点
:::
</docs>

<script setup lang="ts">
const senderRef = ref();
const senderValue = ref('🐳 欢迎使用 Element Plus X');
function blur() {
  senderRef.value.blur();
}

function focus(type = 'all') {
  senderRef.value.focus(type);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex">
      <el-button dark type="success" plain @click="focus('start')">
        文本最前方
      </el-button>
      <el-button dark type="success" plain @click="focus('end')">
        文本最后方
      </el-button>
      <el-button dark type="success" plain @click="focus('all')">
        整个文本
      </el-button>
      <el-button dark type="success" plain @click="blur"> 失去焦点 </el-button>
    </div>
    <MentionSender ref="senderRef" v-model="senderValue" />
  </div>
</template>

<style scoped lang="less">
.header-self-wrap {
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 200px;
  .header-self-title {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
  }
  .header-self-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #626aef;
    font-weight: 600;
  }
}
</style>

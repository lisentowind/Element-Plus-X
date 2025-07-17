<docs>
---
title: 雾化效果
---

开启打字器时，继承打字器雾化属性。通过设置 `is-fog` 属性，开启雾化打字器渲染模式。 兼容 Markdown 样式。注意，开启雾化后，`typing` 的后缀 `suffix` 属性将会失效。

`is-fog` 默认为 false，可以设置为  `true` 或者 `{ bgColor: '#f5f5f5', width: '80px' }`。设置雾化背景颜色，可以更好的匹配自定义的样式。
</docs>

<script setup lang="ts">
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4';
const content = ref(
  `## 🔥Element-Plus-X \n 🥰 感谢使用 Element-Plus-X! \n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`
);

function changeContent(type: number) {
  content.value = '';

  setTimeout(() => {
    if (type === 1) {
      content.value = `## 🔥Element-Plus-X \n 🥰 感谢使用 Element-Plus-X! \n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n`;
    } else if (type === 2) {
      content.value = `🔥Element-Plus-X `.repeat(10);
    }
  }, 80);
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div style="display: flex; gap: 12px">
      <el-button style="width: fit-content" @click="changeContent(1)">
        雾化 markdown
      </el-button>
      <el-button style="width: fit-content" @click="changeContent(2)">
        雾化 text
      </el-button>
    </div>
    <Bubble
      :content="content"
      :typing="{ step: 3, interval: 80, suffix: '💩' }"
      is-markdown
      :is-fog="{ bgColor: '#f5f5f5' }"
    >
      <template #avatar>
        <el-avatar :size="32" :src="avatarUser" />
      </template>
    </Bubble>
  </div>
</template>

<style scoped lang="less">
:deep(.markdown-body) {
  background-color: transparent;
}
</style>

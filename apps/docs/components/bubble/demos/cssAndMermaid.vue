<docs>
---
title: 渲染 markdown 文本内容
---

通过设置 `is-markdown` 属性，开启 `markdown` 文本内容渲染模式。 更新 `content` 如果是之前的子集，则会继续输出，否则会重新输出。
</docs>

<script setup lang="ts">
const avatarUser = 'https://avatars.githubusercontent.com/u/76239030?v=4';
const markdownText =
  ref(`#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n console.log('Hello, world!'); \n \`\`\` \n \`\`\`mermaid
 pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
 \n
\`\`\`

\`\`\`mermaid
 xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]

 \n
\`\`\`
`);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Bubble :content="markdownText" typing is-markdown>
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

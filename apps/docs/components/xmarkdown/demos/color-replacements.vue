<docs>
---
title: color-replacements 属性
---

通过 `color-replacements` 属性，可以单独控制某个主题下的代码颜色。

:::warning
注意: 颜色键必须以 `#` 开头，并且为小写格式，否则不生效。

主题ID 会有对应的颜色变量，这个可以在控制台查看，我们可以对内置的颜色变量进行颜色替换。
:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`js
console.log('hello world');
\`\`\`
`;
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown
      :markdown="markdown"
      :color-replacements="{
        // 左侧是想修改的变量，右侧是修改后的颜色
        'vitesse-light': {
          '#ab5959': '#ee82ee',
          '#1e754f': '#9370db'
        },
        'vitesse-dark': {
          '#cb7676': '#ff0066',
          '#4d9375': '#952189'
        }
      }"
    />

    <XMarkdown
      :markdown="markdown"
      :color-replacements="{
        // 这里传一个默认值 使其不受到其他 colorReplacements 的影响
        'vitesse-light': {
          '#ab5959': '#ab5959',
          '#1e754f': '#1e754f'
        },
        'vitesse-dark': {
          '#cb7676': '#cb7676',
          '#4d9375': '#4d9375'
        }
      }"
    />
  </div>
</template>

<style scoped lang="less"></style>

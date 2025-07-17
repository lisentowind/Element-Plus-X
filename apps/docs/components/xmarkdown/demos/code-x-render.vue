<docs>
---
title: codeXRender 代码块自定义渲染
---

使用 `codeXRender` 属性，自定义代码块的渲染。这个属性接受一个对象，对象中的 key 为代码块的语言，value 为一个函数，函数的参数为代码块的属性，返回值为一个 VNode。意味着你可以用 Vue 的模板语法来渲染代码块。

:::warning
这个功能会拦截你设置的代码块，你可以和后端商量好码块的语言，然后根据语言返回一个对应的 VNode。

后续我们会打造一个基于这个组件的组件库广场，如果你对此感兴趣，欢迎加入🥰[交流群](https://element-plus-x.com/introduce.html#%F0%9F%91%A5-%E7%A4%BE%E5%8C%BA%E6%94%AF%E6%8C%81)，或者添加作者联系方式，一同打造这个广场项目。🥳敬请期待
:::
</docs>

<script setup lang="ts">
import { h } from 'vue';
import Echarts from './echarts.vue';

const markdown = `
\`\`\`javascript
const a = 1;
\`\`\`

\`\`\`echarts
option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
\`\`\`
`;

const selfCodeXRender = {
  // 渲染自定义代码块标识符 javascript, 返回一个组件
  javascript: (props: { raw: any }) => {
    return h(
      'pre',
      { class: 'language-javascript' },
      h('code', { class: 'language-javascript' }, props.raw.content)
    );
  },

  // 渲染自定义代码块标识符 echarts, Echarts 是自己封装的Vue组件
  echarts: (props: { raw: any }) => h(Echarts, { code: props.raw.content })
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :code-x-render="selfCodeXRender" />
  </div>
</template>

<style scoped lang="less"></style>

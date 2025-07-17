<docs>
---
title: 基础用法
---

快速渲染一个 Markdown 基础的文本。内置了行内代码、代码块、数学公式函数（行/块）、mermaid 图表等基础样式。

:::warning
支持增量更新，可以在控制台查看节点的更新变化。以下代码示例为展示增量更新效果，模拟流式接收字符的逻辑。
:::
</docs>

<script setup lang="ts">
const markdown = ref(`
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**这是粗体文本**  
__这也是粗体文本__

*这是斜体文本*  
_这也是斜体文本_

***这是粗斜体文本***

~~这是带删除线的文本~~

- 无序列表项1
- 无序列表项2
  - 子列表项2.1
  - 子列表项2.2

1. 有序列表项1
2. 有序列表项2
  1. 子列表项2.1
  2. 子列表项2.2

[Element-Plus-X](https://element-plus-x.com "Element-Plus-X")

![示例图片](https://element-plus-x.com/logo.png "一张示例图")

>这是一段引用文本
>
>> 这是嵌套的引用文本

---

| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |

### 行内代码

用 \`ElmentPlusX\` 表示 行内块代码用 \`\` 语句

### 代码块

\`\`\`javascript
const code = "Element-Plus-X";
\`\`\`

### 行内公式
$e^{i\\pi} + 1 = 0$

### 块级公式
$$
F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt
$$

### mermaid 饼状图

\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

`);

const timer = ref();
const index = ref(markdown.value.length); // 默认显示所有内容

const content = computed(() => {
  return markdown.value.slice(0, index.value);
});

function start() {
  timer.value = setInterval(() => {
    index.value += 5;
    if (index.value > markdown.value.length) {
      clearInterval(timer.value);
      index.value = markdown.value.length;
    }
  }, 100);
}
function pause() {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

function redo() {
  index.value = 0;
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
  start();
}
onMounted(() => {
  start();
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span style="font-size: 20px; font-weight: 700">控制台查看增量渲染</span>
    <div style="display: flex; gap: 8px">
      <el-button @click="start"> 开始 </el-button>
      <el-button @click="pause"> 暂停 </el-button>
      <el-button @click="redo"> 重新开始 </el-button>
    </div>
    <XMarkdown :markdown="content" class="vp-raw" />
  </div>
</template>

<style scoped lang="less"></style>

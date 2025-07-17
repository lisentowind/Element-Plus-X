<docs>
---
title: codeXSlot 代码块顶部插槽自定义渲染
---

使用 `codeXSlot` 属性，自定义代码块顶部插槽的渲染。这个属性接受一个对象，对象中的 key 为 CodeBlockHeaderExpose 这个类型的固定的属性，value 为一个函数，函数的参数为代码块的属性，返回值为一个 VNode，意味着你可以用 Vue 的模板语法来渲染代码块的顶部。

你可以在自定义的模版中获取到 props, 并且 props 中有以下属性 （具体属性可以在项目中自行打印查看）：
- `isExpand`: props.isExpand 是否展开代码块。
- `toggleExpand`: props.toggleExpand 展开代码块。
- `isDark`: props.isDark.value 获取当前代码块主题。
- `toggleTheme`: props.toggleTheme 切换代码块主题。
- `renderLines`: props.renderLines 获取这个代码块的内容，你可以用它来传给复制函数。
- `copyCode`: props.copyCode(props.renderLines) 复制代码块(需要传参)。
- `viewCode`: props.viewCode(props.renderLines) 触发内置预览 HTML 代码块弹框(需要传参)。
- `value`: props.value 获取这个代码块类型是 '代码' | '预览'。
- `changeSelectValue`: props.changeSelectValue('代码' | '预览') 切换代码块类型(需要传参)。
- `changeSelectValue`: props.changeSelectValue('代码' | '预览') 切换代码块类型(需要传参)。
- `content`: props.content 获取这个代码块内容。
- `close`: props.close() 关闭内置预览 HTML 弹框(不需要传参)。

以下是 mermaid 的代码块头部自定义组件 props 中有可以获取的内置属性：
- `zoomIn`: props.zoomIn 放大。
- `zoomOut`: props.zoomOut 缩小。
- `reset`: props.reset 回到初始位置。
- `toggleCode`: props.toggleCode 切换显示代码。
- `download`: props.download 下载图片。
- `fullscreen`: props.fullscreen 进入全屏。
- `copyCode`: props.copyCode 复制代码。

```ts
// 这个属性的类型定义
interface CodeBlockHeaderExpose {
  // 自定义渲染整个代码块的头部
  codeHeader?: CodeBlockHeaderRenderer;
  // 自定义渲染代码块的左侧语言标识符
  codeHeaderLanguage?: CodeBlockHeaderRenderer;
  // 自定义渲染代码块的右侧控制按钮
  codeHeaderControl?: CodeBlockHeaderRenderer;
  // 自定义渲染代码块的右侧预览弹框的标题区域
  viewCodeHeader?: CodeBlockHeaderRenderer;
  // 自定义渲染代码块的右侧预览弹框的内容区域
  viewCodeContent?: CodeBlockHeaderRenderer;
  // 自定义渲染代码块的右侧预览弹框的关闭按钮
  viewCodeCloseBtn?: CodeBlockHeaderRenderer;
  // 自定义渲染 mermaid 顶部插槽
  codeMermaidHeaderControl?: CodeBlockHeaderRenderer;
}
```
</docs>

<script setup lang="ts">
// 这个 ts 类型还未成功导出，还有 props 类型目前暂时使用 any，需要后续优化
// import type { CodeBlockHeaderExpose, CodeBlockExpose } from 'vue-element-plus-x/types/components/XMarkdownCore/components/CodeBlock/shiki-header.d.ts';
import { h } from 'vue';

const markdown = `
\`\`\`javascript
const a = 1;
\`\`\`
`;

const mermaidMarkdown = `
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
`;

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfCodeXSlot1 = {
  // 自定义渲染整个代码块的头部 h 函数也可以写成自定义的组件的形式
  // (props: any) => h(SelfComponent, { selfProps: props }),
  codeHeader: (props: any) =>
    h(
      'div',
      {
        onClick: (ev: MouseEvent) => props.toggleExpand(ev)
      },
      { default: () => '这是自定义头部，点击切换折叠状态' }
    ),
  // 自定义渲染代码块的左侧语言标识符
  codeHeaderLanguage: () => h('div', '自定义代码块左侧语言标识符'),
  // 自定义渲染代码块的右侧控制按钮
  codeHeaderControl: () => h('div', '自定义代码块右侧控制按钮')
};

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfCodeXSlot2 = {
  // 自定义渲染代码块的左侧语言标识符
  codeHeaderLanguage: () => h('div', '自定义代码块左侧语言标识符')
};

const selfCodeXSlot3 = {
  // 自定义渲染代码块的右侧控制按钮
  codeHeaderControl: () => h('div', '自定义代码块右侧控制按钮')
};

// 如果你是用了codeHeader 属性，其他两个属性失效
const selfCodeXSlot4 = {
  codeMermaidHeaderControl: (props: any) => {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
        }
      },
      [
        h(
          'div',
          {
            style: { display: 'flex', alignItems: 'center', gap: '12px' }
          },
          [
            h('span', { style: { fontSize: '16px' } }, '🎨'),
            h('span', { style: { fontWeight: '600' } }, 'Custom Mermaid'),
            h(
              'span',
              {
                style: {
                  fontSize: '12px',
                  background: 'rgba(255,255,255,0.25)',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }
              },
              props.showSourceCode ? '📝 源码' : '📊 图表'
            )
          ]
        ),

        h('div', { style: { display: 'flex' } }, [
          h(
            ElTooltip,
            {
              content: '放大',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.zoomIn
                  },
                  () => '🔍'
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '重置缩放',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.reset
                  },
                  () => '🔄'
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: props.showSourceCode ? '查看图表' : '查看源码',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.toggleCode
                  },
                  () => (props.showSourceCode ? '👁️' : '📝')
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '自定义复制',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    // 🎯 用户自定义复制逻辑演示 - 完全接管
                    onClick: async () => {
                      try {
                        const customContent = `🎨 自定义前缀：\n\n${props.rawContent}\n\n📝 来自：Element-Plus-X`;
                        await navigator.clipboard.writeText(customContent);
                        ElMessage.success('🎉 组件插槽自定义复制成功！');
                      } catch (err) {
                        console.error('❌ 自定义复制失败:', err);
                      }
                    }
                  },
                  () => '📋'
                )
            }
          ),
          h(
            ElTooltip,
            {
              content: '下载图片',
              placement: 'top'
            },
            {
              default: () =>
                h(
                  ElButton,
                  {
                    size: 'small',
                    type: 'primary',
                    text: true,
                    bg: true,
                    style: {
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none'
                    },
                    onClick: props.download
                  },
                  () => '💾'
                )
            }
          )
        ])
      ]
    );
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot1" />
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot2" />
    <XMarkdown :markdown="markdown" :code-x-slot="selfCodeXSlot3" />
    <XMarkdown :markdown="mermaidMarkdown" :code-x-slot="selfCodeXSlot4" />
  </div>
</template>

<style scoped lang="less"></style>

<docs>
---
title: themes 属性
---

通过 `themes` 属性，对代码块进行主题设置。这个属性是一个对象，高亮和暗黑主题属性，值为内置的一套 `主题ID`。

```ts
themes: {
  light: 'vitesse-light'; // 亮色主题 （组件默认主题）
  dark: 'vitesse-dark'; // 暗色主题 （组件默认主题）
}
```

我们内置了一下 shiki 样式，你可以在 [shiki-theme](https://shiki.style/themes) 中查看。

:::warning
重新设置主题后，可能需要刷新页面才会生效。以下列举了所有内置的 `shiki` 样式所对应的 `主题ID`。如果你是 ts 项目，开发中应该可以获取到内置的样式主题的类型推断提示。

<img src="https://cdn.element-plus-x.com/shiki-style.png" width="100%">
:::

::: details 💝查看所有 主题ID 对照表
| 名称（Name） | 中文翻译 | 对应值（`主题ID`） |
| --- | --- | --- |
| Andromeeda | 仙女座 | andromeeda |
| Aurora X | 极光X | aurora-x |
| Ayu Dark | Ayu暗色 | ayu-dark |
| Catppuccin Frappé | 卡布奇诺冰沙 | catppuccin-frappe |
| Catppuccin Latte | 卡布奇诺拿铁 | catppuccin-latte |
| Catppuccin Macchiato | 卡布奇诺玛奇朵 | catppuccin-macchiato |
| Catppuccin Mocha | 卡布奇诺摩卡 | catppuccin-mocha |
| Dark Plus | 深色增强 | dark-plus |
| Dracula Theme | 德古拉主题 | dracula |
| Dracula Theme Soft | 德古拉柔和主题 | dracula-soft |
| Everforest Dark | 常绿森林暗色 | everforest-dark |
| Everforest Light | 常绿森林亮色 | everforest-light |
| GitHub Dark | GitHub暗色 | github-dark |
| GitHub Dark Default | GitHub暗色默认 | github-dark-default |
| GitHub Dark Dimmed | GitHub暗色低饱和 | github-dark-dimmed |
| GitHub Dark High Contrast | GitHub暗色高对比 | github-dark-high-contrast |
| GitHub Light | GitHub亮色 | github-light |
| GitHub Light Default | GitHub亮色默认 | github-light-default |
| GitHub Light High Contrast | GitHub亮色高对比 | github-light-high-contrast |
| Gruvbox Dark Hard | Gruvbox暗色高饱和 | gruvbox-dark-hard |
| Gruvbox Dark Medium | Gruvbox暗色中饱和 | gruvbox-dark-medium |
| Gruvbox Dark Soft | Gruvbox暗色低饱和 | gruvbox-dark-soft |
| Gruvbox Light Hard | Gruvbox亮色高饱和 | gruvbox-light-hard |
| Gruvbox Light Medium | Gruvbox亮色中饱和 | gruvbox-light-medium |
| Gruvbox Light Soft | Gruvbox亮色低饱和 | gruvbox-light-soft |
| Houston | 休斯顿 | houston |
| Kanagawa Dragon | 神奈川龙 | kanagawa-dragon |
| Kanagawa Lotus | 神奈川莲 | kanagawa-lotus |
| Kanagawa Wave | 神奈川浪 | kanagawa-wave |
| LaserWave | 激光波 | laserwave |
| Light Plus | 亮色增强 | light-plus |
| Material Theme | Material主题 | material-theme |
| Material Theme Darker | Material主题深色增强 | material-theme-darker |
| Material Theme Lighter | Material主题浅色增强 | material-theme-lighter |
| Material Theme Ocean | Material主题海洋风 | material-theme-ocean |
| Material Theme Palenight | Material主题夜樱色 | material-theme-palenight |
| Min Dark | 极简暗色 | min-dark |
| Min Light | 极简亮色 | min-light |
| Monokai | 莫奈凯 | monokai |
| Night Owl | 夜枭 | night-owl |
| Nord | 诺德 | nord |
| One Dark Pro | One深色专业版 | one-dark-pro |
| One Light | One亮色 | one-light |
| Plastic | 塑料风 | plastic |
| Poimandres | 波伊曼德尔斯 | poimandres |
| Red | 红色主题 | red |
| Rosé Pine | 玫瑰松木 | rose-pine |
| Rosé Pine Dawn | 玫瑰松木黎明 | rose-pine-dawn |
| Rosé Pine Moon | 玫瑰松木月夜 | rose-pine-moon |
| Slack Dark | Slack暗色 | slack-dark |
| Slack Ochin | Slack淡茶 | slack-ochin |
| Snazzy Light | 时尚亮色 | snazzy-light |
| Solarized Dark | 日光暗色 | solarized-dark |
| Solarized Light | 日光亮色 | solarized-light |
| Synthwave '84 | 84年合成波 | synthwave-84 |
| Tokyo Night | 东京之夜 | tokyo-night |
| Vesper | Vesper（黄昏星） | vesper |
| Vitesse Black | 极速黑 | vitesse-black |
| Vitesse Dark | 极速暗色 | vitesse-dark |
| Vitesse Light | 极速亮色 | vitesse-light |
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
      :themes="{ light: 'andromeeda', dark: 'material-theme-darker' }"
    />
  </div>
</template>

<style scoped lang="less"></style>

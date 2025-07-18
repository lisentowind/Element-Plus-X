import type { Preview } from '@storybook/vue3';
import { themes } from '@storybook/theming';

/**
 * 加载 CDN 资源的工具函数
 * @param url CDN 资源链接
 * @param type 资源类型 'css' | 'js'
 */
function loadCdnResource(url: string, type: 'css' | 'js') {
  if (type === 'css') {
    // 加载 CSS 资源
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  } else if (type === 'js') {
    // 加载 JS 资源
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
  }
}

// 配置需要加载的 CDN 资源
const cdnResources = [
  {
    url: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
    type: 'css'
  }
];

// 加载 CDN 资源
cdnResources.forEach(resource => {
  loadCdnResource(resource.url, resource.type as 'css' | 'js');
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      },
      disableSaveFromUI: true
      // expanded: true // 默认展开所有组件描述
    },
    backgrounds: {
      grid: {
        disable: true // 禁用网格
      }
    },
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark },
      // Override the default light theme
      light: { ...themes.normal }
    }
  }
};

export default preview;

import type { Meta, StoryObj } from '@storybook/vue3';
import {
  echartsMdContent,
  highlightMdContent,
  mathMdContent,
  mdContent,
  mermaidMdContent
} from '@assets/mock';
import EchartsCodeDemo from './echarts-code.vue';
import HighlightCodeDemo from './highlight-code.vue';
import Markdown from './index.vue';

const meta = {
  title: 'Example/Markdown 组件 ',
  component: Markdown,
  tags: ['autodocs'],
  argTypes: {
    markdown: { control: 'text' },
    themes: {
      control: 'object',
      defaultValue: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    },
    mermaidConfig: { control: 'object' }
  },
  args: {
    markdown: mdContent,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    mermaidConfig: {
      showToolbar: true,
      showFullscreen: true,
      showZoomIn: true,
      showZoomOut: true,
      showReset: true,
      showDownload: true,
      toolbarStyle: {},
      toolbarClass: 'mermaid-config-toolbar'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const MarkdownDemo: Story = {
  args: {
    markdown: mdContent
  } as Story['args']
};

export const highlightMdContentDemo: Story = {
  args: {
    markdown: highlightMdContent
  },
  render: args => ({
    components: {
      HighlightCodeDemo
    },
    setup() {
      return { attrs: args };
    },
    template: `<HighlightCodeDemo v-bind="attrs"  />`
  })
};

export const echartsMdContentDemo: Story = {
  args: {
    markdown: echartsMdContent
  },
  render: args => ({
    components: {
      EchartsCodeDemo
    },
    setup() {
      return { attrs: args };
    },
    template: `<EchartsCodeDemo v-bind="attrs"  />`
  })
};

export const PieRenderDemo: Story = {
  args: {
    markdown: mermaidMdContent
  } as Story['args']
};

export const MathRenderDemo: Story = {
  args: {
    markdown: mathMdContent
  } as Story['args']
};

// Mermaid 工具栏配置演示
export const MermaidToolbarDemo: Story = {
  args: {
    markdown: mermaidMdContent,
    mermaidConfig: {
      showToolbar: true,
      showFullscreen: true,
      showZoomIn: true,
      showZoomOut: true,
      showReset: true,
      toolbarStyle: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      },
      toolbarClass: 'mermaid-config-toolbar',
      iconColor: '#FFFFFF',
      tabTextColor: '#FFFFFF'
    }
  } as Story['args']
};

// Mermaid 渲染错误案例演示
export const MermaidErrorDemo: Story = {
  args: {
    markdown: `
### Mermaid 渲染错误演示
\`\`\`mermaid
graph TD
    A[开始] --> B[处理
    B --> C[结束]
    D -->
\`\`\`
`,
    mermaidConfig: {
      showToolbar: true,
      showFullscreen: true,
      showZoomIn: true,
      showZoomOut: true,
      showReset: true,
      showDownload: true,
      toolbarStyle: {},
      toolbarClass: 'mermaid-error-demo'
    }
  } as Story['args']
};

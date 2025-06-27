import type { BubbleProps } from '@components/Bubble/types';
import type { BubbleListProps } from '@components/BubbleList/types';
import type { FilesType } from '@components/FilesCard/types';
import type { ThinkingStatus } from '@components/Thinking/types';

// 头像1
export const avatar1: string =
  'https://avatars.githubusercontent.com/u/76239030?v=4';

// 头像2
export const avatar2: string =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

// md 普通内容
export const mdContent = `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*

- [x] Add some task
- [ ] Do some task
`.trim();

// md 代码块高亮
export const highlightMdContent = `

### javascript
\`\`\`javascript
console.log('Hello, world!');
\`\`\`

### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`


`.trim();

// md echarts代码块高亮
export const echartsMdContent = `
### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`

\`\`\`echarts
 {
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [120, 200, 150, 80, 70, 110, 130],
      "type": "bar"
    }
  ]
}
\`\`\`

### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`

\`\`\`echarts
 {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Email',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      data: [862, 1018, 964, 1026, 1679, 1600, 1570],
      emphasis: {
        focus: 'series'
      },
      markLine: {
        lineStyle: {
          type: 'dashed'
        },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    },
    {
      name: 'Baidu',
      type: 'bar',
      barWidth: 5,
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [620, 732, 701, 734, 1090, 1130, 1120]
    },
    {
      name: 'Google',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 290, 230, 220]
    },
    {
      name: 'Bing',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [60, 72, 71, 74, 190, 130, 110]
    },
    {
      name: 'Others',
      type: 'bar',
      stack: 'Search Engine',
      emphasis: {
        focus: 'series'
      },
      data: [62, 82, 91, 84, 109, 110, 120]
    }
  ]
}

\`\`\`

### java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`


`.trim();

// md 美人鱼图表
export const mermaidMdContent = `

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

`;

// md 数学公式
export const mathMdContent = `

### mermaid 数学公式
\`\`\`mermaid
sequenceDiagram
    autonumber
    participant 1 as $$alpha$$
    participant 2 as $$beta$$
    1->>2: Solve: $$\sqrt{2+2}$$
    2-->>1: Answer: $$2$$
    Note right of 2: $$\sqrt{2+2}=\sqrt{4}=2$$
\`\`\`

`;

export type MessageItem = BubbleProps & {
  key: number;
  role: 'ai' | 'user' | 'system';
  avatar: string;
  thinkingStatus?: ThinkingStatus;
  expanded?: boolean;
};

export const messageArr: BubbleListProps<MessageItem>['list'] = [
  {
    key: 1,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 2,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 3,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 4,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 5,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗' },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 6,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  },
  {
    key: 7,
    role: 'ai',
    placement: 'start',
    content: '欢迎使用 Element Plus X .'.repeat(5),
    loading: true,
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: { step: 2, suffix: '💗', isRequestEnd: true },
    avatar: avatar2,
    avatarSize: '32px'
  },
  {
    key: 8,
    role: 'user',
    placement: 'end',
    content: '这是用户的消息',
    loading: true,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    avatar: avatar1,
    avatarSize: '32px'
  }
];

// 模拟自定义文件卡片数据
// 内置样式
export const colorMap: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#00C851',
  ppt: '#FF5722',
  pdf: '#E53935',
  txt: '#424242',
  mark: '#6C6C6C',
  image: '#FF80AB',
  audio: '#FF7878',
  video: '#8B72F7',
  three: '#29B6F6',
  code: '#00008B',
  database: '#FF9800',
  link: '#2962FF',
  zip: '#673AB7',
  file: '#FFC757',
  unknown: '#6E9DA4'
};

// 自己定义文件颜色
export const colorMap1: Record<FilesType, string> = {
  word: '#5E74A8',
  excel: '#4A6B4A',
  ppt: '#C27C40',
  pdf: '#5A6976',
  txt: '#D4C58C',
  mark: '#FFA500',
  image: '#8E7CC3',
  audio: '#A67B5B',
  video: '#4A5568',
  three: '#5F9E86',
  code: '#4B636E',
  database: '#4A5A6B',
  link: '#5D7CBA',
  zip: '#8B5E3C',
  file: '#AAB2BF',
  unknown: '#888888'
};

// 自己定义文件颜色1
export const colorMap2: Record<FilesType, string> = {
  word: '#0078D4',
  excel: '#4CB050',
  ppt: '#FF9933',
  pdf: '#E81123',
  txt: '#666666',
  mark: '#FFA500',
  image: '#B490F3',
  audio: '#00B2EE',
  video: '#2EC4B6',
  three: '#00C8FF',
  code: '#00589F',
  database: '#F5A623',
  link: '#007BFF',
  zip: '#888888',
  file: '#F0D9B5',
  unknown: '#D8D8D8'
};

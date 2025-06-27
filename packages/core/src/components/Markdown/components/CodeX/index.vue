<script lang="ts">
import { defineComponent, h, toValue } from 'vue';
import Echarts from '../Echarts/Echarts.vue';
import { CodeBlock, Mermaid } from '../index';
import { useMarkdownContext } from '../MarkdownProvider';

export default defineComponent({
  props: {
    raw: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const context = useMarkdownContext();
    const { codeXRender } = toValue(context);
    return (): ReturnType<typeof h> | null => {
      const { language } = props.raw;
      if (codeXRender && codeXRender[language]) {
        const renderer = codeXRender[language];
        if (typeof renderer === 'function') {
          return renderer(props);
        }
        return h(renderer, props);
      }
      if (language === 'mermaid') {
        const { mermaidConfig } = context.value;
        // 如果有 mermaidConfig，传递给 Mermaid 组件
        const mermaidProps = {
          ...props,
          ...(mermaidConfig && { toolbarConfig: mermaidConfig })
        };
        return h(Mermaid, mermaidProps);
      }
      if (language === 'echarts') {
        return h(Echarts, { ...props, options: props.raw.content });
      }
      return h(CodeBlock, props);
    };
  }
});
</script>

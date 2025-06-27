<script lang="ts">
import type { ThemeRegistrationResolved } from 'shiki';
import type { Ref } from 'vue';
import { parseEChartsOption } from '@components/Markdown/hooks';
import { MARKDOWN_SHIKI_THEME_COLOR_KEY } from '@components/Markdown/shared';
import { nanoid } from 'nanoid';
import { defineComponent, h, inject, ref, watch } from 'vue';
import VCharts from 'vue-echarts';
import { controlEle, expand, languageEle } from '../CodeBlock/shiki-header';
import { downloadPngBtnEle } from './echarts-header';
import 'echarts';

export interface MarkdownEChartConfig {
  width?: string;
  height?: string;
  margin?: string;
  renderEngine: 'canvas' | 'svg';
}

export interface MarkdownEChartsProps {
  options: any;
  loading?: boolean;
  config?: MarkdownEChartConfig;
}

export default defineComponent({
  name: 'MarkdownECharts',
  props: {
    options: {
      type: [Object, String],
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object as () => MarkdownEChartConfig,
      default: () => ({
        renderEngine: 'svg',
        width: '90%',
        height: '300px',
        margin: '0 auto'
      })
    }
  },
  setup(props) {
    const VChartsRef = ref<InstanceType<typeof VCharts>>();
    const Nanoid = nanoid();
    const parsedOptions = ref<any>(null);
    const parseError = ref<string | null>(null);
    const colors = inject<Ref<ThemeRegistrationResolved>>(
      MARKDOWN_SHIKI_THEME_COLOR_KEY
    );
    const firstRender = ref(true);

    function debounce<T extends (...args: any[]) => void>(fn: T, delay = 500) {
      let timer: ReturnType<typeof setTimeout> | null = null;
      return function (...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    }

    const parseOptions = debounce((value: string | object) => {
      parseEChartsOption(value)
        .then(result => {
          parsedOptions.value = result;
          parseError.value = null;
          console.log('✅ 成功解析 JSON：');
        })
        .catch(err => {
          parsedOptions.value = null;
          parseError.value = err.message;
          console.warn('❌ JSON 解析失败：', err.message);
        });
    }, 500);

    watch(
      () => props.options,
      val => {
        parseOptions(val);
      },
      { immediate: true }
    );

    return () =>
      h(
        'pre',
        {
          class: 'pre-md markdown-echarts-box',
          style: {
            '--shiki-color-bg': colors?.value?.bg
          },
          onVnodeUpdated(vnode) {
            if (parsedOptions.value) {
              const ele = vnode.el as HTMLElement;
              if (ele && firstRender.value) {
                firstRender.value = false;
                setTimeout(() => {
                  expand(ele);
                }, 100);
              }
            }
          }
        },
        [
          h(
            'div',
            {
              class: `markdown-language-header-div el-card is-always-shadow`
            },
            [
              languageEle(
                parseError.value
                  ? parseError.value
                  : parsedOptions.value
                    ? 'echarts'
                    : 'echarts 解析中...'
              ),
              controlEle(
                parsedOptions.value
                  ? [JSON.stringify(parsedOptions.value)]
                  : [],
                VChartsRef.value && downloadPngBtnEle(VChartsRef.value)
              )
            ]
          ),
          parsedOptions.value
            ? h(VCharts, {
                ref: VChartsRef,
                option: parsedOptions.value,
                autoresize: true,
                initOptions: {
                  renderer: props.config.renderEngine
                },
                style: {
                  height: props.config.height,
                  width: props.config.width,
                  margin: props.config.margin,
                  backgroundColor: 'transparent'
                },
                group: `radiance${Nanoid}`,
                loading: props.loading
              })
            : // 加载中
              h('div', { class: 'markdown-echarts-content-empty' })
        ]
      );
  }
});
</script>

<style scoped src="./echarts.scss"></style>

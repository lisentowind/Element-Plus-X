import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved
} from 'shiki';
import type { Ref } from 'vue';
import type { MarkdownContext } from './types';
import deepmerge from 'deepmerge';
import { createHighlighter } from 'shiki';
import { computed, defineComponent, h, inject, provide } from 'vue';
import { useDarkModeWatcher, usePlugins } from '../../hooks';
import {
  MARKDOWN_PROVIDER_KEY,
  MARKDOWN_SHIKI_HIGHLIGHTER_THEME_KEY,
  MARKDOWN_SHIKI_THEME_COLOR_KEY,
  MarkdownProps
} from '../../shared';

const MarkdownProvider = defineComponent({
  name: 'MarkdownProvider',
  props: MarkdownProps,
  setup(props, { slots, attrs }) {
    const { rehypePlugins, remarkPlugins } = usePlugins(props);
    const highlighterTheme = computed(() => props.themes);
    /* ------------------ 根据用户传递的shiki主题获取对应的shiki主题的颜色 全局注册给子级 ----------------- */
    const oldHighlighterTheme = ref();
    const shikiThemeColor = ref<ThemeRegistrationResolved>();
    const { isDark } = useDarkModeWatcher();
    const highlighter =
      ref<HighlighterGeneric<BundledLanguage, BundledTheme>>();
    const themeArr = computed(() => {
      if (highlighterTheme.value) {
        return Object.keys(highlighterTheme.value).map(
          item => highlighterTheme.value[item]
        );
      }
      return ['vitesse-light', 'vitesse-dark'];
    });
    provide(MARKDOWN_SHIKI_THEME_COLOR_KEY, shikiThemeColor);

    watch(
      () => [highlighterTheme.value, isDark.value],
      ([theme, isDark]) => {
        if (theme !== oldHighlighterTheme.value) {
          oldHighlighterTheme.value = theme;
          createHighlighter({
            themes: [...themeArr.value] as any[],
            langs: ['javascript']
          }).then(res => {
            highlighter.value = res;
            shikiThemeColor.value = res.getTheme(
              isDark ? (themeArr.value[1] as any) : (themeArr.value[0] as any)
            );
          });
        }
        if (highlighter.value) {
          shikiThemeColor.value = highlighter.value.getTheme(
            isDark ? (themeArr.value[1] as any) : (themeArr.value[0] as any)
          );
        }
      },
      {
        immediate: true,
        deep: 1
      }
    );

    /* ------------------ 根据用户传递的shiki主题获取对应的shiki主题的颜色 全局注册给子级 ----------------- */

    provide(MARKDOWN_SHIKI_HIGHLIGHTER_THEME_KEY, highlighterTheme);

    const contextProps = computed(() => {
      return deepmerge(
        {
          rehypePlugins: toValue(rehypePlugins),
          remarkPlugins: toValue(remarkPlugins)
        },
        props
      );
    });
    provide(MARKDOWN_PROVIDER_KEY, contextProps);
    return () =>
      h(
        'div',
        { class: 'markdownProvider', ...attrs },
        slots.default && slots.default()
      );
  }
});

function useMarkdownContext(): Ref<MarkdownContext> {
  const context = inject<Ref<MarkdownContext>>(MARKDOWN_PROVIDER_KEY);
  if (!context) {
    return computed(() => ({})) as Ref<MarkdownContext>;
  }
  return context;
}
export { MarkdownProvider, useMarkdownContext };

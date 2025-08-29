import type { GlobalShiki } from '@components/XMarkdownCore/hooks/useShiki';
import type { BuiltinTheme } from 'shiki';
import type { PluggableList } from 'unified';
import type { MermaidToolbarConfig } from '../components/Mermaid/types';
import type { ElxRunCodeOptions } from '../components/RunCode/type';
import type { CustomAttrs, SanitizeOptions } from '../core';
import type { InitShikiOptions } from './shikiHighlighter';

export const shikiThemeDefault: InitShikiOptions['themes'] = {
  light: 'vitesse-light',
  dark: 'vitesse-dark'
};

export const DEFAULT_PROPS = {
  markdown: '',
  allowHtml: false,
  enableLatex: true,
  enableAnimate: false,
  enableBreaks: true,
  enableCodeLineNumber: false,
  codeXRender: () => ({}),
  codeXSlot: () => ({}),
  codeHighlightTheme: null,
  customAttrs: () => ({}),
  remarkPlugins: () => [],
  remarkPluginsAhead: () => [],
  rehypePlugins: () => [],
  rehypePluginsAhead: () => [],
  rehypeOptions: () => ({}),
  sanitize: false,
  sanitizeOptions: () => ({}),
  mermaidConfig: () => ({}),
  langs: () => [],
  defaultThemeMode: 'light' as 'light' | 'dark',
  themes: () => ({ ...shikiThemeDefault }),
  colorReplacements: () => ({}),
  needViewCodeBtn: true,
  secureViewCode: false,
  viewCodeModalOptions: () => ({})
};

export const MARKDOWN_CORE_PROPS = {
  markdown: {
    type: String,
    default: ''
  },
  allowHtml: {
    type: Boolean,
    default: false
  },
  enableCodeLineNumber: {
    type: Boolean,
    default: false
  },
  enableLatex: {
    type: Boolean,
    default: true
  },
  enableAnimate: {
    type: Boolean,
    default: false
  },
  enableBreaks: {
    type: Boolean,
    default: true
  },
  codeXRender: {
    type: Object,
    default: () => ({})
  },
  codeXSlot: {
    type: Object,
    default: () => ({})
  },
  codeHighlightTheme: {
    type: Object as PropType<BuiltinTheme | null>,
    default: () => null
  },
  customAttrs: {
    type: Object as PropType<CustomAttrs>,
    default: () => ({})
  },
  remarkPlugins: {
    type: Array as PropType<PluggableList>,
    default: () => []
  },
  remarkPluginsAhead: {
    type: Array as PropType<PluggableList>,
    default: () => []
  },
  rehypePlugins: {
    type: Array as PropType<PluggableList>,
    default: () => []
  },
  rehypePluginsAhead: {
    type: Array as PropType<PluggableList>,
    default: () => []
  },
  rehypeOptions: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  sanitize: {
    type: Boolean,
    default: false
  },
  sanitizeOptions: {
    type: Object as PropType<SanitizeOptions>,
    default: () => ({})
  },
  mermaidConfig: {
    type: Object as PropType<Partial<MermaidToolbarConfig>>,
    default: () => ({})
  },
  langs: {
    type: Array as PropType<InitShikiOptions['langs']>,
    default: () => []
  },
  defaultThemeMode: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  themes: {
    type: Object as PropType<InitShikiOptions['themes']>,
    default: () =>
      ({
        ...shikiThemeDefault
      }) satisfies InitShikiOptions['themes']
  },
  colorReplacements: {
    type: Object as PropType<InitShikiOptions['colorReplacements']>,
    default: () => ({})
  },
  needViewCodeBtn: {
    type: Boolean,
    default: true
  },
  secureViewCode: {
    type: Boolean,
    default: false
  },
  viewCodeModalOptions: {
    type: Object as PropType<ElxRunCodeOptions>,
    default: () => ({})
  },
  isDark: {
    type: Boolean,
    default: false
  },
  globalShiki: {
    type: Object as PropType<GlobalShiki>,
    default: () => ({})
  }
};

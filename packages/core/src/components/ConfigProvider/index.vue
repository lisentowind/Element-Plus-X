<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { loadCdn } from '../../utils/loadCdn';
import { APP_CONFIG_PROVIDE_KEY, DEFAULT_APP_CONFIG } from './constants';

const props = withDefaults(defineProps<ConfigProviderProps>(), {});

provide<ConfigProviderProps>(APP_CONFIG_PROVIDE_KEY, {
  md: props.md ?? DEFAULT_APP_CONFIG.md,
  mdPlugins: props.mdPlugins ?? DEFAULT_APP_CONFIG.mdPlugins
});
const cdnAssets = props.cdnAssets ?? DEFAULT_APP_CONFIG.cdnAssets;
cdnAssets?.forEach(assets => {
  loadCdn(assets);
});
</script>

<template>
  <slot />
</template>

<style scoped lang="scss" src="./style.scss"></style>

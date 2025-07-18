<script lang="ts" setup>
import type { MarkdownProps } from '../XMarkdownCore/shared/types';
import { MarkdownRendererAsync } from '../XMarkdownCore';
import { useMarkdownContext } from '../XMarkdownCore/components/MarkdownProvider';
import { DEFAULT_PROPS } from '../XMarkdownCore/shared/constants';

const props = withDefaults(defineProps<MarkdownProps>(), DEFAULT_PROPS);

const slots = useSlots();
const customComponents = useMarkdownContext();
const colorReplacementsComputed = computed(() => {
  return props.colorReplacements;
});
const needViewCodeBtnComputed = computed(() => {
  return props.needViewCodeBtn;
});
</script>

<template>
  <div class="elx-xmarkdown-container">
    <MarkdownRendererAsync
      v-bind="props"
      :color-replacements="colorReplacementsComputed"
      :need-view-code-btn="needViewCodeBtnComputed"
    >
      <template
        v-for="(slot, name) in customComponents"
        :key="name"
        #[name]="slotProps"
      >
        <component :is="slot" v-bind="slotProps" />
      </template>
      <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </MarkdownRendererAsync>
  </div>
</template>

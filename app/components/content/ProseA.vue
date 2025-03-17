<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})

function isExternal(href: string) {
  return href.startsWith('http')
}
</script>

<template>
  <NuxtLink
    :href="props.href"
    :target="props.target ?? isExternal(props.href) ? '_blank' : undefined"
    class="group ctx-a inline-flex items-center no-underline transition-colors"
  >
    <span class="relative">
      <slot />
      <span class="absolute bottom-0 left-0 h-px w-full bg-current op-20 transition-opacity" aria-hidden />
    </span>
    <span v-if="isExternal(props.href)" class="i-carbon:arrow-up-right ml-1 text-xs" aria-hidden />
  </NuxtLink>
</template>

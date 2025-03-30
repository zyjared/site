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
    class="group inline-flex items-center no-underline transition-colors ctx-a"
  >
    <span class="underline">
      <slot />
    </span>
    <span v-if="isExternal(props.href)" class="i-ci:arrow-up-right-md text-xs" aria-hidden />
  </NuxtLink>
</template>

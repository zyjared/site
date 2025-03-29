<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h1)))
</script>

<template>
  <h1 :id="props.id" class="mb-16 mt-16 text-3xl font-bold tracking-tight">
    <a
      v-if="generate"
      :href="`#${props.id}`"
      class="cursor-default font-bold no-underline"
    >
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>

<template>
  <h2 :id="props.id" class="mb-8 mt-16 text-2xl font-bold tracking-tight" md="text-3xl">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="cursor-default font-bold no-underline"
    >
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h6)))
</script>

<template>
  <h6 :id="props.id" class="mb-2 mt-6 text-sm font-bold tracking-tight">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="cursor-default font-bold no-underline"
    >
      <slot />
    </a>
    <slot v-else />
  </h6>
</template>

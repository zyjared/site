<script setup lang="ts">
const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h2)))
</script>

<template>
  <h2
    :id="props.id"
    class="relative mb-8 mt-12 pt-6 text-2xl font-bold tracking-tight before:text-ctx-a/0 hover:before:text-ctx-a hover:before:block"
    b="t-1 shared/20"
  >
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

<style scoped>
h2::before {
  content: '#';
  position: absolute;
  transform: translateX(-100%);
  padding-right: 0.25em;
  transition: color 0.2s linear;
}
</style>

<script setup lang="ts">
interface Props {
  /**
   * 占位符文本
   */
  placeholder?: string
}

const { placeholder = '搜索...' } = defineProps<Props>()
const model = defineModel<string>()
</script>

<template>
  <div class="relative w-full" sm="w-64">
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder"
      class="w-full border border-neutral/10 rounded-lg bg-neutral/5 px-3 py-2 pr-9 text-sm outline-none focus:border-neutral/50"
    >
    <span i-carbon:search class="absolute right-3 top-1/2 text-neutral/30 -translate-y-1/2" />
  </div>
</template>

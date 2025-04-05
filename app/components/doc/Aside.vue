<script setup lang="ts">
import type { DocTocLink } from './Toc.vue'

export interface DocToc {
  title: string
  searchDepth: number
  depth: number
  links: DocTocLink[]
}

defineProps<{
  toc: DocToc
  currentId: string | null
}>()
</script>

<template>
  <aside class="overflow-auto space-y-4">
    <slot name="aside-before" />

    <div v-if="toc.links?.length" class="space-y-4">
      <div class="tex font-bold ctx-text/70">
        目录
      </div>
      <nav class="text-sm">
        <DocToc
          :links="toc.links"
          :current-id="currentId"
        />
      </nav>
    </div>

    <slot name="aside-after" />
  </aside>
</template>

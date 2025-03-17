<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

interface Toc {
  title: string
  searchDepth: number
  depth: number
  links: TocLink[]
}

defineProps<{
  toc: Toc
  activeId: string
}>()

const emit = defineEmits(['anchor'])

function scrollToAnchor(id: string) {
  emit('anchor', id)
}
</script>

<template>
  <aside class="overflow-auto space-y-4">
    <slot name="aside-before" />

    <div class="space-y-2">
      <h3 class="text-sm text-shared font-bold">
        目录
      </h3>
      <nav>
        <DocToc
          :links="toc.links"
          :active-id="activeId"
          @anchor="scrollToAnchor"
        />
      </nav>
    </div>

    <slot name="aside-after" />
  </aside>
</template>

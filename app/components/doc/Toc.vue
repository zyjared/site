<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
  activeId?: string
}>()

const emit = defineEmits(['anchor'])

function emitAnchor(id: string) {
  emit('anchor', id)
}
</script>

<template>
  <div class="space-y-2.5">
    <template v-for="link in links" :key="link.id">
      <a
        :href="`#${link.id}`"
        class="block text-sm text-shared transition-colors hover:ctx-text"
        :class="activeId === link.id ? '!ctx-text' : ''"
        @click.prevent="emitAnchor(link.id)"
      >
        {{ link.text }}
      </a>

      <!-- 子目录 -->
      <DocToc
        v-if="link.children?.length"
        :links="link.children"
        :active-id="activeId"
        class="ml-4"
        @anchor="emitAnchor"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
export interface DocTocLink {
  id: string
  depth: number
  text: string
  children?: DocTocLink[]
}

defineProps<{
  links: DocTocLink[]
  currentId: string | null
}>()
</script>

<template>
  <div class="space-y-2.5">
    <template v-for="link in links" :key="link.id">
      <a
        :href="`#${link.id}`"
        class="block text-shared transition-colors hover:ctx-text"
        :class="currentId === link.id ? '!ctx-text' : ''"
      >
        {{ link.text }}
      </a>

      <!-- 子目录 -->
      <DocToc
        v-if="link.children?.length"
        :links="link.children"
        :current-id="currentId"
        class="ml-4"
      />
    </template>
  </div>
</template>

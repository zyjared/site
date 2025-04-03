<script setup lang="ts">
export interface UiTabItem {
  id: string | number
  label: string
  icon?: string
  badge?: string | number
}

interface Props {
  /**
   * 标签项列表
   */
  items: UiTabItem[]
}

const { items } = defineProps<Props>()
const model = defineModel<UiTabItem['id']>()

const emit = defineEmits<{
  select: [item: UiTabItem]
}>()

function handleSelect(item: UiTabItem) {
  model.value = item.id
  emit('select', item)
}

function isSelected(item: UiTabItem) {
  return model.value === item.id
}
</script>

<template>
  <MotionLayoutGroup>
    <div class="relative flex flex-wrap gap-2">
      <button
        v-for="item in items"
        :key="item.id"
        class="relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
        @click="handleSelect(item)"
      >
        <Motion
          v-if="isSelected(item)"
          layout-id="ui-active-tab"
          :transition="{ type: 'spring', stiffness: 200, damping: 20 }"
          class="absolute inset-0 rounded-lg -z-1 bg-ctx-text"
        />
        <div
          class="flex items-center gap-2 duration-300"
          :class="isSelected(item) ? 'text-ctx-bg' : 'text-shared hover:text-shared/80'"
        >
          <span v-if="item.icon" :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="item.badge !== undefined" class="text-xs opacity-60">({{ item.badge }})</span>
        </div>
      </button>
    </div>
  </MotionLayoutGroup>
</template>

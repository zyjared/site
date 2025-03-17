<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const { copy } = useClipboard({ source: props.code })
const copied = ref(false)

async function handleCopy() {
  if (copied.value)
    return
  await copy()
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="group relative my-6 overflow-hidden border border-shared/10 rounded-xl bg-shared/5">
    <!-- 顶部信息栏 -->
    <div class="flex items-center justify-between border-b border-shared/10 px-4 py-2">
      <div class="flex items-center gap-2">
        <!-- 装饰点 -->
        <div class="flex gap-1.5">
          <div class="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <div class="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
          <div class="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        </div>

        <!-- 语言标识 -->
        <div v-if="language" class="ml-2 text-xs text-shared">
          {{ language }}
        </div>

        <!-- 文件名 -->
        <div v-if="filename" class="text-xs text-shared/60">
          · {{ filename }}
        </div>
      </div>

      <!-- 复制按钮 -->
      <button
        class="flex-center gap-1.5 rounded-md bg-shared/10 px-2 py-1 text-xs text-shared/60 transition-colors duration-300"
        hover="bg-shared/20 text-shared"
        @click="handleCopy"
      >
        <div v-if="!copied" class="i-carbon:copy flex-center text-sm" />
        <div v-else class="i-carbon:checkmark text-sm text-green-500" />
        <span>{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>

    <!-- 代码内容区 -->
    <pre :class="$props.class" class="mx-auto my-2 max-w-[calc(100%-2rem)] overflow-x-auto p-2"><slot /></pre>
  </div>
</template>

<style scoped>
pre {
  scrollbar-width: thin;
  scrollbar-color: rgba(115, 115, 115, 0.2) transparent;
}

pre code .line {
  display: block;
}
</style>

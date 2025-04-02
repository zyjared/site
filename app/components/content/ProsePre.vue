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

let timer: unknown
async function handleCopy() {
  await copy()
  copied.value = true
  clearTimeout(timer as number)
  timer = setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="my-6 border border-shared/10 rounded-xl bg-shared/5">
    <!-- 顶部信息栏 -->
    <div class="flex items-center justify-between border-b border-shared/10 px-4 py-2">
      <div class="flex-center gap-2">
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

      <!-- 复制 -->
      <div class="flex-center gap-2 text-sm ctx-text/50">
        <span class="">{{ copied ? '已复制' : '' }}</span>
        <button
          class="flex-center gap-1.5 rounded-md p-2 transition-colors duration-300"
          b="~ 1 shared/10"
          hover="bg-shared/10"
          @click="handleCopy"
        >
          <span v-if="!copied" class="i-carbon:copy" />
          <span v-else class="i-carbon:checkmark" />
        </button>
      </div>
    </div>

    <!-- 代码内容区 -->
    <pre :class="$props.class" class="mx-auto my-2 max-w-[calc(100%-2rem)] overflow-x-auto px-0 py-2"><slot /></pre>
  </div>
</template>

<style scoped>
pre {
  scrollbar-width: thin;
  scrollbar-color: rgba(115, 115, 115, 0.2) transparent;
}
</style>

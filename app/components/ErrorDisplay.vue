<script lang="ts" setup>
interface Error {
  code: number
  title: string
  message: string
  path: string
  fatal?: boolean
  unhandled?: boolean
}

interface Back {
  text: string
  link: string
}

const { error, back = { text: 'Return Home', link: '/' } } = defineProps<{
  error: Error
  back?: null | Back
}>()
</script>

<template>
  <div class="flex-col-center gap-4">
    <div flex="~ gap-6">
      <div flex="~ col justify-between gap-1" class="relative text-right">
        <h2 class="text-8xl font-bold tracking-tight">
          <div class="absolute inset-0 from-blue-500/20 to-indigo-500/20 bg-gradient-to-r blur-2xl" />
          <span>{{ error.code }}</span>
        </h2>
        <div text="sm shared/80" class="tracking-tight font-mono space-y-1">
          <p class="tracking-tight">
            {{ error.path }}
          </p>

          <div class="flex items-center justify-end gap-2">
            <div class="flex gap-1.5 text-xs">
              <span
                v-if="error.fatal"
                class="border border-red-500/20 rounded bg-red-500/10 px-1.5 py-0.5 text-red-400"
              >
                Fatal
              </span>
              <span
                v-if="error.unhandled"
                class="border border-amber-500/20 rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-400"
              >
                Unhandled
              </span>
            </div>

            <span text="red-400 sm" class="tracking-widest uppercase">
              Error
            </span>
          </div>
        </div>
      </div>

      <div class="h-24 w-px from-transparent via-indigo to-transparent bg-gradient-to-b" />

      <p
        class="tracking-wider uppercase write-vertical-right"
        text="shared/60"
      >
        {{ error.title }}
      </p>
    </div>

    <p class="text-shared tracking-tight font-mono">
      {{ error.message }}
    </p>

    <slot />

    <NuxtLink
      v-if="back !== null"
      :to=" back.link"
      class="px-6 py-3 text-shared transition-300"
      un-b="~ solid shared/30"
      un-hover="b-shared theme-text"
    >
      {{ back.text }}
    </NuxtLink>
  </div>
</template>

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
      <div flex="~ col justify-between gap-1" class="text-right relative">
        <h2 class="text-8xl font-bold tracking-tight ">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-2xl" />
          <span>{{ error.code }}</span>
        </h2>
        <div text="sm shared/80" class="space-y-1 font-mono tracking-tight">
          <p class="tracking-tight">
            {{ error.path }}
          </p>

          <div class="flex gap-2 items-center justify-end">
            <div class="flex gap-1.5 text-xs">
              <span
                v-if="error.fatal"
                class="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20"
              >
                Fatal
              </span>
              <span
                v-if="error.unhandled"
                class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
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

      <div class="h-24 w-px bg-gradient-to-b from-transparent via-indigo to-transparent" />

      <p
        class="write-vertical-right tracking-wider uppercase"
        text="shared/60"
      >
        {{ error.title }}
      </p>
    </div>

    <p class="font-mono text-shared tracking-tight">
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

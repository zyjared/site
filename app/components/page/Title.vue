<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  accent?: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'right' | 'center'
}

const {
  title,
  subtitle,
  accent,
  align = 'left',
  size = 'md',
} = defineProps<Props>()

const sizes = {
  sm: 'text-3xl md:text-4xl',
  md: 'text-4xl md:text-6xl',
  lg: 'text-6xl md:text-8xl',
}

const aligns = {
  left: 'justify-start',
  right: 'justify-end',
  center: 'justify-center',
}
</script>

<template>
  <div class="relative pb-12 pt-8">
    <div class="relative flex flex-col gap-4" md="flex-row items-end " :class="aligns[align]">
      <slot name="before" />

      <div class="flex-1 flex-col" :class="[aligns[align], `text-${align}`]">
        <!-- accent -->
        <div v-if="accent" class="relative mb-6">
          <div class="flex items-baseline gap-6">
            <span class="text-3xl text-shared/20 font-bold font-mono">
              {{ accent }}
            </span>
            <div class="h-px flex-1 from-shared/10 to-transparent bg-gradient-to-r" />
          </div>
        </div>

        <!-- title -->
        <h1 :class="[sizes[size]]" class="relative mb-4 font-bold">
          {{ title }}
        </h1>

        <!-- subtitle -->
        <div v-if="subtitle" class="max-w-2xl text-lg text-shared">
          {{ subtitle }}
        </div>
      </div>

      <slot name="after" />

      <div class="pointer-events-none absolute -inset-4 -z-1" aria-hidden="true">
        <div class="absolute left-0 top-0 aspect-square w-12 rotate-10 rounded-lg bg-purple-500/15" />
        <div class="absolute bottom-4 right-2 aspect-video w-32 translate-x-1/2 rotate-60 rounded-lg bg-blue-500/15" />
      </div>
    </div>
  </div>
</template>

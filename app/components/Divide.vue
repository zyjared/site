<script setup lang='ts'>
const { vertical = false, right = false } = defineProps<{
  vertical?: boolean
  right?: boolean
  divideClass?: string
}>()
</script>

<template>
  <div class="gap-3" :class="vertical ? 'flex-col-center' : 'flex-center'">
    <div
      class="from-transparent via-shared/20 to-transparent"
      :class="`${vertical ? 'bg-gradient-to-b w-[1px] h-32' : 'bg-gradient-to-r h-[1px] w-32'} ${divideClass}`"
    />

    <div
      class="whitespace-nowrap text-xs text-shared/40 tracking-0.5em uppercase"
      :class="{
        'z-vertical-rl': vertical,
        'z-sideways-lr': vertical && right,
      }"
    >
      <slot>
        <p class="flex-center gap-3">
          <span class="stagger-fade inline-block">zyj</span>
          <span class="stagger-fade inline-block">jared</span>
        </p>
      </slot>
    </div>

    <div
      class="from-transparent via-shared/20 to-transparent"
      :class="`${vertical ? 'bg-gradient-to-b  w-[1px] h-32' : 'bg-gradient-to-r h-[1px] w-32'} ${divideClass}`"
    />
  </div>
</template>

<style scoped>
.z-vertical-rl {
  writing-mode: vertical-rl;
}

.z-sideways-lr {
  writing-mode: sideways-lr;
}
</style>

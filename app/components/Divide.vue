<script setup lang='ts'>
const { vertical = false, right = false } = defineProps<{
  vertical?: boolean
  right?: boolean
  divideClass?: string
}>()
</script>

<template>
  <div class="gap-3" :class="vertical ? 'flex-col-center' : 'flex-center'" aria-hidden="true">
    <div :class="`${vertical ? 'gradient-v' : 'gradient-h'} ${divideClass}`" aria-hidden="true" />

    <div
      class="whitespace-nowrap text-xs text-shared/40 tracking-0.5em uppercase"
      :class="{
        'z-vertical-rl': vertical,
        'z-sideways-lr': vertical && right,
      }"
    >
      <slot>
        <p class="flex-center gap-3">
          <span class="stagger-fade">zyj</span>
          <span class="stagger-fade">jared</span>
        </p>
      </slot>
    </div>

    <div :class="`${vertical ? 'gradient-v' : 'gradient-h'} ${divideClass}`" aria-hidden="true" />
  </div>
</template>

<style scoped>
.z-vertical-rl {
  writing-mode: vertical-rl;
}

.z-sideways-lr {
  transform: rotateZ(180deg);

  /* ios 有些问题 */
  /* writing-mode: sideways-lr; */
}

.gradient-h {
  height: 1px;
  width: 8rem;
  background-image: linear-gradient(90deg, transparent, #88888826, transparent);
}

.gradient-v {
  width: 1px;
  height: 8rem;
  background-image: linear-gradient(180deg, transparent, #88888826, transparent);
}
</style>

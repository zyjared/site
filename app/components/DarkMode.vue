<script setup lang="ts">
import { animate } from 'motion'

function bounceEase(x: number) {
  const n1 = 7.5625
  const d1 = 2.75

  if (x < 1 / d1) {
    return n1 * x * x
  }
  else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75
  }
  else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  }
  else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375
  }
}

const bounce = {
  duration: 1.2,
  ease: bounceEase,
}

const ball = useTemplateRef('ball')
const el = useTemplateRef('el')

const colorMode = useColorMode()
const isLight = computed(() => colorMode.value === 'light')

function shouldAnimate(willLight: boolean) {
  animate(ball.value!, {
    x: willLight ? 0 : '90%', // height * (aspect - 1)
  }, {
    ...bounce,
    duration: 0.6,
  })
}

function toggleColorMode() {
  colorMode.preference = isLight.value ? 'dark' : 'light'
  shouldAnimate(!isLight.value)
}

onMounted(() => {
  shouldAnimate(isLight.value)
})
</script>

<template>
  <div
    ref="el"
    class="relative aspect-1.9 h-1em flex cursor-pointer items-center rounded-full ring-1.5px ring-shared/20 transition-colors duration-300"
    :class="isLight ? 'bg-neutral-2' : 'bg-neutral-8'"
    @click="toggleColorMode"
  >
    <div
      ref="ball"
      class="absolute left-0 top-0 h-1em w-1em flex items-center justify-center rounded-full p-.135em shadow transition-colors"
      :class="isLight ? 'bg-white' : 'bg-neutral-9'"
    >
      <div v-show="isLight" i-material-symbols:light-mode-outline-rounded class="text-amber-500" />
      <div v-show="!isLight" i-material-symbols:dark-mode-outline class="text-neutral-300" />
    </div>
  </div>
</template>

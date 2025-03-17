<script setup lang="ts">
import { animate } from 'motion'

function bounceEase(x: number) {
  const n1 = 7.5625
  const d1 = 2.75

  if (x < 1 / d1)
    return n1 * x * x
  else if (x < 2 / d1)
    return n1 * (x -= 1.5 / d1) * x + 0.75
  else if (x < 2.5 / d1)
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  else
    return n1 * (x -= 2.625 / d1) * x + 0.984375
}

const bounceDown = {
  duration: 1.2,
  ease: bounceEase,
}

const easeUp = {
  duration: 0.4,
  ease: (x: number) => 1 - (1 - x) ** 3,
}

const ball = useTemplateRef('ball')

const colorMode = useColorMode()
const isLight = computed(() => colorMode.value === 'light')

function shouldAnimate(willLight: boolean) {
  animate(ball.value!, {
    y: willLight ? 0 : '100%',
  }, {
    ...(willLight ? easeUp : bounceDown),
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
    class="relative h-2em w-1em flex cursor-pointer items-center rounded-full ring-1.5px ring-shared/20 transition-colors duration-300"
    :class="isLight ? 'bg-neutral-2' : 'bg-shared/5'"
    @click="toggleColorMode"
  >
    <div
      ref="ball"
      class="absolute left-0 top-0 h-1em w-1em flex items-center justify-center rounded-full p-[0.135em] shadow transition-colors"
      :class="isLight ? 'bg-white' : 'bg-neutral-900'"
    >
      <div v-show="isLight" i-material-symbols:light-mode-outline-rounded class="text-amber-500" />
      <div v-show="!isLight" i-material-symbols:dark-mode-outline class="text-shared" />
    </div>
  </div>
</template>

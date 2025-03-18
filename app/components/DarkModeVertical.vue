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

function isLightMode() {
  return colorMode.preference === 'light'
}

function shouldAnimate(willLight: boolean) {
  animate(ball.value!, {
    y: willLight ? 0 : '100%',
  }, {
    ...(willLight ? easeUp : bounceDown),
  })
}

function toggleColorMode() {
  const isLight = isLightMode()
  colorMode.preference = isLight ? 'dark' : 'light'
  shouldAnimate(!isLight)
}

onMounted(() => {
  shouldAnimate(isLightMode())
})
</script>

<template>
  <div
    class="relative h-2em w-1em flex cursor-pointer items-center rounded-full bg-neutral-2 ring-1.5px ring-shared/20 transition-colors duration-300 dark:bg-shared/5"
    @click="toggleColorMode"
  >
    <div
      ref="ball"
      class="absolute left-0 top-0 h-1em w-1em flex items-center justify-center rounded-full bg-white p-[0.135em] shadow transition-colors dark:bg-neutral-900"
    >
      <div
        class="i-material-symbols:light-mode-outline-rounded text-amber-500"
        dark="i-material-symbols:dark-mode-outline text-shared"
      />
    </div>
  </div>
</template>

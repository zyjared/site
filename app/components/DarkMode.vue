<script setup lang="ts">
const [scope, animate] = useMotionAnimate()

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

const colorMode = useColorMode()

function isLightMode() {
  return colorMode.preference === 'light'
}

function shouldAnimate(willLight: boolean) {
  animate(scope.value!, {
    x: willLight ? 0 : '90%', // height * (aspect - 1)
  }, {
    ...bounce,
    duration: 0.6,
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
    class="relative aspect-1.9 h-1em flex cursor-pointer items-center rounded-full ring-1.5px ring-neutral/20 transition-colors duration-300 bg-ctx-text/3"
    @click="toggleColorMode"
  >
    <div
      ref="scope"
      class="absolute left-0 top-0 h-1em w-1em flex-center rounded-full p-.135em shadow transition-colors bg-ctx-bg/75"
    >
      <div
        class="i-material-symbols:light-mode-outline-rounded text-amber-500"
        dark="i-material-symbols:dark-mode-outline text-neutral"
      />
    </div>
  </div>
</template>

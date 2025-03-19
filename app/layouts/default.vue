<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')

// fixed 是 scrollbar 抖动优化

const el = useTemplateRef<HTMLDivElement>('el')
const { x: elX } = useElementBounding(el)

const headerX = ref<number | null>(null)

function upHeaderX() {
  headerX.value = elX.value
}

function shouldUpHeaderX() {
  if (headerX.value === null) {
    upHeaderX()
    return
  }

  if (Math.abs(elX.value - headerX.value) > 20) {
    upHeaderX()
  }
}

useEventListener('resize', shouldUpHeaderX)
onMounted(() => {
  upHeaderX()
  motionFade('.motion-fade-app')
})
</script>

<template>
  <div ref="el" class="relative mx-auto pl-18 pr-4 container" sm="pl-24" md="pl-32 pr-8">
    <div
      v-show="headerX !== null"
      class="fixed inset-y-0 w-14 flex flex-col pb-[env(safe-area-inset-bottom)] pr-2 pt-[env(safe-area-inset-top)]"
      :style="{ left: `${headerX}px` }"
      sm="w-20 pr-6"
      md="w-24"
    >
      <Header class="flex-1 py-8" />

      <Divide
        :class="{ '!opacity-100': !isHome }"
        vertical
        class="absolute right-0 top-1/2 z--1 opacity-0 transition-300 -translate-y-1/2"
      />
    </div>

    <main class="relative h-screen pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <slot />
    </main>

    <Teleport to="body">
      <BackgroundGradientDiv />
      <BackgroundEffect animated="random" />
    </Teleport>
  </div>
</template>

<style>
:root {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}
</style>

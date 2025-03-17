<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')

// scrollbar 抖动优化

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
onMounted(upHeaderX)
</script>

<template>
  <div ref="el" class="relative mx-auto pl-16 container" sm="pl-20" md="pl-24">
    <div v-show="headerX !== null" class="tra fixed top-0 h-screen w-16 py-8 pr-3" :style="{ left: `${headerX}px` }" sm="w-20 pr-6" md="w-24">
      <Header />
      <Divide :class="{ '!opacity-100': !isHome }" vertical class="absolute right-0 top-1/2 z--1 opacity-0 transition-300 -translate-y-1/2" />
    </div>

    <main class="h-screen w-full pl-8" md="pl-10">
      <slot />
    </main>

    <Teleport to="body">
      <BackgroundGradient />
      <BackgroundEffect />
    </Teleport>
  </div>
</template>

<style>
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

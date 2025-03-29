<script setup lang="ts">
// fixed 是 scrollbar 与 mx-auto 发生抖动的优化
// TODO: scrollbar 是否需要使用自定义的替换掉

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
})
</script>

<template>
  <div ref="el" class="relative mx-auto pl-18 pr-4 container" sm="pl-24" md="pl-32 pr-8">
    <div
      v-show="headerX !== null"
      class="fixed inset-y-0 w-14 flex flex-col pb-[calc(2rem+env(safe-area-inset-bottom))] pr-2 pt-[calc(2rem+env(safe-area-inset-top))]"
      :style="{ left: `${headerX}px` }"
      sm="w-20 pr-6"
      md="w-24"
    >
      <Header />
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

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
} */
</style>

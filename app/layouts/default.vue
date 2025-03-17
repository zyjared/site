<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="relative mx-auto min-h-screen flex gap-4 container" sm="gap-6" md="gap-12">
    <div class="sticky top-0 h-screen w-12 py-8 pr-2" sm="w-16 pr-0" md="w-24">
      <Header />
      <Divide vertical class="absolute right-0 top-1/2 translate-x-1/2 opacity-0 transition-300 -translate-y-1/2" :class="{ '!opacity-100': !isHome }" />
    </div>

    <main class="min-h-full w-full overflow-auto">
      <slot />
    </main>

    <BackgroundGradient />
    <BackgroundEffect />
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

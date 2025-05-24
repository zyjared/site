<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="relative overflow-x-clip">
    <div
      class="fixed inset-y-0 w-14 pb-[calc(env(safe-area-inset-bottom,0)+2rem)] pt-[calc(env(safe-area-inset-top,0)+2rem)] transition-all duration-500 ease-in-out"
      sm="w-20"
      md="w-24"
      :class="isHome ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'"
    >
      <Header />
    </div>

    <main
      class="relative ml-18 mr-4 transition-all duration-500"
      sm="ml-24"
      md="ml-28"
    >
      <slot />
    </main>

    <Teleport to="body">
      <BgGradientDiv />
      <BgEffect animated="random" />
    </Teleport>
  </div>
</template>

<style>
:root {
  scroll-behavior: smooth;
}
</style>

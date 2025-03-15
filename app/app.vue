<script lang="ts" setup>
import '@unocss/reset/tailwind-compat.css'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <Header v-if="!isHome" />

  <main class="mx-auto container" :class="isHome ? '' : 'px-4 pb-4 pt-20'">
    <NuxtPage />
  </main>

  <BackgroundGradient />
  <BackgroundEffect />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

<script lang="ts" setup>
import '@unocss/reset/tailwind-compat.css'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <HeaderMain v-if="!isHome" />

  <main class="container mx-auto" :class="isHome ? '' : 'px-4 pb-4 pt-20'">
    <NuxtPage />
  </main>

  <!-- <BackgroundParticles /> -->
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all .3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

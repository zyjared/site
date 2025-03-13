<script lang="ts" setup>
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <HeaderMain v-if="!isHome" />

  <main class="container mx-auto pt-20 px-4">
    <NuxtPage />
  </main>

  <!-- <BackgroundParticles /> -->
</template>

<style>
#__nuxt {
    min-height: 100vh;
}

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

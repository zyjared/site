<script setup lang="ts">

</script>

<template>
  <div class="relative">
    <div
      class="app-header fixed inset-y-0 w-14"
      sm="w-20"
      md="w-24"
    >
      <Header />
    </div>

    <main class="relative ml-18 mr-4" sm="ml-24" md="ml-28">
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

.app-header {
  padding-top: calc(2rem + env(safe-area-inset-top));
  padding-bottom: calc(2rem + env(safe-area-inset-bottom));
}

.app-main {
  padding-right: env(safe-area-inset-right);
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

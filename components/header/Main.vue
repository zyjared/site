<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header theme un-border="b b-shared/10" class="h-16 fixed inset-0">
    <div theme class="container mx-auto h-full px-4 flex items-center justify-between relative z-1">
      <HeaderLogo />

      <div md:hidden class="flex cursor-pointer" @click="toggleMenu">
        <div v-show="!isMenuOpen" class="i-line-md:menu-unfold-right" text-2xl />
        <div v-show="isMenuOpen" class="i-line-md:menu-fold-left" text-2xl />
      </div>

      <div hidden md="!flex items-center" divide="x solid shared/20" class="[&>*:not(:first-child)]:pl-6 [&>*:not(:last-child)]:pr-6">
        <HeaderNav />
        <HeaderActions />
      </div>
    </div>

    <Transition name="slide">
      <div
        v-show="isMenuOpen"
        md="!hidden"
        class="absolute left-0 top-16 w-full max-h-[calc(100vh - 4rem)] overflow-y-auto"
        un-border="b neutral-500/20"
        flex="~ col gap-4"
        p="x-2 y-3"
        theme
      >
        <HeaderNav />
        <HeaderActions class="px-2 justify-center" />
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

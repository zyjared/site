<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header theme un-border="b b-shared/10" class="fixed inset-0 h-16">
    <div theme class="relative z-1 mx-auto h-full flex items-center justify-between px-4 container">
      <Logo />

      <div md="hidden" class="flex cursor-pointer" @click="toggleMenu">
        <div v-show="!isMenuOpen" class="i-fluent:list-rtl-16-regular" text-2xl />
        <div v-show="isMenuOpen" class="i-line-md:menu-to-close-alt-transition" text-2xl />
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
        class="- 4rem)] max-h-[calc(100vh absolute left-0 top-16 w-full overflow-y-auto"
        un-border="b neutral-500/20"
        flex="~ col gap-4"
        p="x-2 y-3"
        theme
      >
        <HeaderNav />
        <HeaderActions class="justify-center gap-8 px-2" md="gap-4" />
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

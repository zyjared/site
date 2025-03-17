<script setup lang='ts'>
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <header v-auto-animate="{ duration: 300 }" class="h-full flex-col-center p-2">
    <div v-if="!isHome" key="un-home" class="flex-col-center flex-1 gap-4">
      <HeaderLogo />
      <HeaderNavbar />
    </div>

    <div key="socials" class="flex-col-center gap-12">
      <HeaderSocials />
      <DarkModeVertical class="text-xl" />
    </div>
  </header>
</template>

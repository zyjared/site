<script setup lang='ts'>
const { navbar } = useAppConfig()
const route = useRoute()

const isHome = (s: string) => s === '/'

const activeIdx = computed(() => {
  const p = route.path
  const idx = navbar.findIndex(item => p.startsWith(item.link) && !isHome(item.link))
  return idx !== -1 ? idx : navbar.findIndex(item => isHome(item.link))
})
</script>

<template>
  <nav class="mt-12 w-full flex-1">
    <div class="flex flex-col items-center gap-4">
      <NuxtLink
        v-for="(item, idx) in navbar"
        :key="idx"
        :to="item.link"
        class="h-10 w-10 flex items-center justify-center rounded-xl transition-colors"
        un-hover=""
        :class="activeIdx === idx ? 'ctx-text/50 cursor-default' : 'text-shared/50 hover:bg-shared/10 hover:ctx-text/50'"
      >
        <i :class="item.icon" class="text-xl" />
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
</style>

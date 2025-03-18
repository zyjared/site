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
        class="flex cursor-pointer items-center justify-center rounded-xl p-2 ctx-link"
        un-hover="bg-shared/10"
        :target="getBlankTarget(item.link)"
        :class="activeIdx === idx ? 'ctx-text/70' : ''"
      >
        <i :class="item.icon" class="text-xl" />
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
</style>

<script setup lang='ts'>
const { navbar } = useAppConfig()
const route = useRoute()

const currentIsHome = (s: string) => s === '/'

const activeIdx = computed(() => {
  const p = route.path
  const idx = navbar.findIndex(item => p.startsWith(item.link) && !currentIsHome(item.link))
  return idx !== -1 ? idx : navbar.findIndex(item => currentIsHome(item.link))
})
</script>

<template>
  <nav class="flex flex-col items-center gap-4 py-6">
    <NuxtLink
      v-for="(item, idx) in navbar"
      :key="idx"
      data-idx="idx"
      :to="item.link"
      class="flex cursor-pointer items-center justify-center rounded-xl p-2 ctx-link"
      un-hover="bg-shared/10"
      :target="getBlankTarget(item.link)"
      :class="activeIdx === idx ? 'ctx-text/70' : ''"
      :style="{
        transitionDelay: `${idx * 0.1}s`,
      }"
    >
      <i :class="item.icon" class="text-xl" />
    </NuxtLink>
  </nav>
</template>

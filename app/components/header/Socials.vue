<script setup lang='ts'>
const { socials } = useAppConfig()
</script>

<template>
  <div class="stagger-fade flex flex-col gap-2">
    <NuxtLink
      v-for="item in socials"
      :key="item.link"
      :to="item.link"
      external
      class="group flex items-center justify-center rounded-xl p-2 text-shared/50 transition-colors"
      un-hover="bg-shared/10 ctx-text/60"
    >
      <i :class="item.icon" class="text-xl" />
    </NuxtLink>
  </div>
</template>

<style scoped>
</style>

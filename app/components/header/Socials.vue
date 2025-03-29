<script setup lang='ts'>
const { socials } = useAppConfig()
</script>

<template>
  <div class="flex flex-col gap-2">
    <NuxtLink
      v-for="item in socials"
      :key="item.link"
      :to="item.link"
      :target="getBlankTarget(item.link)"
      class="group flex items-center justify-center rounded-xl p-2 ctx-link"
      un-hover="bg-shared/10"
    >
      <i :class="item.icon" class="text-xl" />
    </NuxtLink>
  </div>
</template>

<style scoped>
</style>

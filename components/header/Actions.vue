<script setup lang="ts">
const { github } = useAppConfig()
</script>

<template>
  <div
    flex="center gap-4"
  >
    <HeaderMode class="text-xl" />

    <NuxtLink class="text-shared text-2xl transition hover:text-shared/50" :href="github" target="_blank" rel="noopener noreferrer">
      <div i-mdi:github />
    </NuxtLink>
  </div>
</template>

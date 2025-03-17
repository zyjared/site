<script setup lang="ts">
const { nickname } = useAppConfig()
</script>

<template>
  <div class="stagger-fade">
    <NuxtLink
      to="/"
      class="group relative aspect-square w-12 flex items-center justify-center overflow-hidden rounded-xl text-shared/80 transition-colors"
      un-hover="text-shared"
    >
      <span class="block text-lg font-bold tracking-wider font-mono">
        {{ nickname }}
      </span>
    </NuxtLink>
  </div>
</template>

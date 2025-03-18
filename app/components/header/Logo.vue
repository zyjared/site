<script setup lang="ts">
const { displayName } = useAppConfig()
</script>

<template>
  <div class="stagger-fade">
    <NuxtLink
      to="/"
      class="group relative aspect-square w-12 flex items-center justify-center overflow-hidden rounded-xl ctx-link"
    >
      <span class="block text-lg font-bold tracking-wider font-mono">
        {{ displayName }}
      </span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { nickname } = useAppConfig()
</script>

<template>
  <h1>
    <nuxt-link to="/" font-bold flex="~ gap-2 items-center">
      <img src="/avatar.png" alt="avatar" h-8 rounded-full>
      {{ nickname }}
    </nuxt-link>
  </h1>
</template>

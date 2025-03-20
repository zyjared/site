<script lang="ts" setup>
import { appName } from '~/constants'
import '@unocss/reset/tailwind.css'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#38bdf8 0%,#6366f1 50%,#3b82f6 100%)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

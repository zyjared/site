<script lang="ts" setup>
import { appName } from '~/constants'
import '@unocss/reset/tailwind-compat.css'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

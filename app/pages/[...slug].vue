<script lang="ts" setup>
const route = useRoute()
const error = computed(() => {
  return {
    code: 404,
    title: 'Page not found',
    message: 'The page doesn\'t exist or has been moved.',
    path: route.path,
  }
})
</script>

<template>
  <ErrorDisplay :error="error" style="min-height: calc(100vh - 6rem)" />
</template>

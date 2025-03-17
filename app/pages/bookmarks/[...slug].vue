<script setup>
const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('bookmarks').path(route.path).first()
})
</script>

<template>
  <DocRender :value="data" />
</template>

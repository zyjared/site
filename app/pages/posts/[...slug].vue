<script setup>
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('posts').path(route.path).first()
})
</script>

<template>
  <DocRender :value="post" />
</template>

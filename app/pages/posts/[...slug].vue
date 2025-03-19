<script setup>
const route = useRoute()
const { data } = await useAsyncData(route.path, async () => {
  return queryCollection('posts').path(route.path).first()
})

if (!data.value) {
  throw createError({ statusCode: 404 })
}
</script>

<template>
  <DocRender :value="data" />
</template>

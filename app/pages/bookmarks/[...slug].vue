<script setup>
const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('bookmarks').path(route.path).first()
})

if (!data.value) {
  throw createError({ statusCode: 404 })
}
</script>

<template>
  <DocRender :value="data" />
</template>

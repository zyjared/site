<script setup lang="ts">
const { navbar } = useAppConfig()
</script>

<template>
  <ul
    v-if="navbar && navbar.length"
    flex="~ col"
    md="flex-row gap-6"
  >
    <li v-for="(item, index) in navbar" :key="index">
      <nuxt-link
        :to="item.link"
        active-class="text-brand"
        class="block p-x2 py-1"
        md="p-0 inline-block"
        hover="text-brand"
      >
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
</template>

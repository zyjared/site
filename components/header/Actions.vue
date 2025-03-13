<script setup lang="ts">
const colorMode = useColorMode()
const lightMode = computed(() => colorMode.value === 'light')

function toggleColorMode() {
  colorMode.preference = lightMode.value ? 'dark' : 'light'
}

const { github } = useAppConfig()
</script>

<template>
  <div flex="~ items-center gap-4" text="2xl shared" hover="*:cursor-pointer">
    <div class="hover:text-shared/55" @click="toggleColorMode">
      <div v-show="!lightMode" class="i-material-symbols:light-mode-outline-rounded" />
      <div v-show="lightMode" class="i-material-symbols:dark-mode-outline" />
    </div>

    <a :href="github" target="_blank" rel="noopener noreferrer" class="hover:text-shared/55">
      <div i-mdi:github />
    </a>
  </div>
</template>

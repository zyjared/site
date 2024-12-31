<script setup lang='ts'>
import Rellax from 'rellax'
import { onMounted, onUnmounted } from 'vue'
import Basic from './Basic.vue'
import Education from './Education.vue'
import Experience from './Experience.vue'
import Skills from './Skills.vue'

let rellax: Rellax.RellaxInstance
onMounted(() => {
  rellax = new Rellax('.rellax', {
    breakpoints: [576, 768, 1201],
    speed: -2,
    center: true,
    round: true,
    vertical: true,
    horizontal: false,
  })
})

onUnmounted(() => {
  rellax && rellax.destroy()
})
</script>

<template>
  <article class="resume">
    <Basic class="min-screen-h" />
    <Education class="min-screen-h" />
    <Experience class="min-screen-h" />
    <Skills class="min-screen-h" />
  </article>
</template>

<style scoped>
.min-screen-h {
  min-height: 100vh;
}

.resume :deep(h2) {
  font-weight: bold;
  font-size: 2rem;
}
</style>

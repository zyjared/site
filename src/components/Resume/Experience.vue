<script setup lang='ts'>
import RellaxDiv from './RellaxDiv.vue'
</script>

<template>
  <section class="section experience">
    <h2>工作经历</h2>
    <RellaxDiv :speed="7" :percentage="0.5">
      I’m that 7 speed of "-2" and "centered"
    </RellaxDiv>

    <RellaxDiv :speed="7" :percentage="0.5">
      I’m that 7 speed of "-2" and "centered"
    </RellaxDiv>
  </section>
</template>

<style scoped>
</style>

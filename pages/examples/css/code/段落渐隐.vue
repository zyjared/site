<template>
  <div class="container">
    <div class="content">
      <section class="content">
        <h2>段落渐隐</h2>
        <p>
          <span v-for="n in 150" :key="n">段落渐隐的段落</span>
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  --bg: var(--vp-c-bg-alt);
  background-color: var(--bg);
  padding: 0.5em 1em;
  border-radius: 10px;
}

.content {
  height: 300px;
  overflow-y: scroll;
  mask-image: linear-gradient(to bottom, transparent 0%, #000 5%, #000 50%, transparent 100%);
  mask-size: 100% 100%;
  padding-bottom: 150px;
}

.content::-webkit-scrollbar {
  width: 0px;
}
</style>

<template>
  <div class="fixed inset-0 z--1">
    <!-- 渐变背景 -->
    <div class="absolute inset-0 from-gray-50/80 via-white to-gray-50/80 bg-gradient-to-br dark:from-gray-950/80 dark:via-gray-900 dark:to-gray-950/80" />

    <!-- 网格装饰 -->
    <div class="bg-grid-gray-500/[0.1] dark:bg-grid-white/[0.02] absolute inset-0" />

    <!-- 光晕效果 -->
    <div class="absolute top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl -left-1/4 dark:bg-blue-400/10" />
    <div class="absolute bottom-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl -right-1/4 dark:bg-purple-400/10" />
  </div>
</template>

<style scoped>
.bg-grid {
  background-size: 30px 30px;
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
}
</style>

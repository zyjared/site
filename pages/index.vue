<script setup lang='ts'>
const { links, nickname } = useAppConfig()

const getTargetType = (url: string) => url.startsWith('http') ? '_blank' : '_self'
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)] flex flex-col items-center bg-gradient-to-b from-transparent to-shared/5">
    <section class="m-auto flex flex-col items-center gap-4 animate-fade-in">
      <h2 class="text-center ">
        <div class="w-24 h-24 rounded-full overflow-hidden mb-2 animate-title" style="animation-delay: .5s;">
          <img src="/avatar.png" alt="avatar" class="block w-full h-full">
        </div>
        <p class="animate-title">
          {{ nickname }}
        </p>
      </h2>

      <p class="text-shared font-mono flex items-center gap-2 ani-fade-slide">
        <span class="text-gray-400 text-sm">0b</span>
        <span class="tracking-wide space-x-1">
          <span class="text-blue-500">1000</span>
          <span class="text-indigo-400">1010</span>
          <span class="text-red-400">111</span>
        </span>
      </p>

      <div class="ani-fade-slide" style="animation-delay: .5s;">
        <HeaderActions />
      </div>

      <div class="flex justify-center gap-6 text-shared ani-fade-slide" style="animation-delay: 1s;">
        <nuxt-link
          v-for="(link, index) in links" :key="index" :to="link.link"
          class="transition duration-300 ease-in-out flex items-center gap-1"
          hover="border-brand-400 text-shared/55" :target="getTargetType(link.link)"
        >
          <span v-if="link.icon" :class="link.icon" class="inline-block  text-lg" />
          <span>
            {{ link.title }}
          </span>
        </nuxt-link>
      </div>
    </section>

    <footer class="text-center px-4 py-8 w-full" text="sm shared">
      Copyright © 2024-present zyjared
    </footer>
  </div>
</template>

<style scoped>
.animate-title {
  opacity: 0;
  animation: title-appear 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes title-appear {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.5);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.ani-fade-slide {
  opacity: 0;
  animation: fade-slide 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes fade-slide {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang='ts'>
import { stagger } from 'motion-v'

const { links, displayName, socials } = useAppConfig()

const birthday = 1111

function getBirthAriaLabel() {
  const s = `${birthday}`
  return `生日: ${s.slice(0, 2)}月${s.slice(2)}日`
}

function toBinaryGroup(num: number) {
  const b = Number(num).toString(2)
  return [b.slice(0, 4), b.slice(4, 8), b.slice(8, 12)]
}

const tags = [
  {
    text: 'Dreamer',
    icon: 'i-carbon:cloud',
    class: 'badge-indigo',
  },
  {
    text: 'Ctrl+S Spammer',
    icon: 'i-carbon:keyboard',
    class: 'badge-amber',
  },
]

// @unocss-include
const binaryColors = [
  'text-blue-400/80',
  'text-indigo-400/80',
  'text-red-400/80',
]

// motion

const [scope, animate] = useMotionAnimate()

onMounted(() => {
  animate('.motion-fade-home', {
    opacity: [0, 1],
    y: [20, 0],
  }, {
    delay: stagger(0.1, { from: 'first' }),
    duration: 0.3,
    type: 'spring',
    stiffness: 200,
  })
})
</script>

<template>
  <div ref="scope" class="flex-center">
    <div class="h-screen flex-col-center flex-1">
      <!-- 主内容 -->
      <div class="flex-col-center gap-4 py-12" md="gap-6 flex-1 pt-40 pb-8 mb-8">
        <!-- 信息 -->
        <Motion drag :drag-constraints="(scope as HTMLElement)" class="w-full flex-center flex-col gap-2" md="flex-row gap-8">
          <!-- 信息: 左侧头像 -->
          <div class="motion-fade-home">
            <div class="relative aspect-1 w-20 overflow-hidden rounded-full p-2px" sm="w-24" md="w-32">
              <div
                aria-hidden="true"
                class="ani-rotate absolute left-1/2 top-1/3 z--1 h-20 w-2/1 transform-origin-l from-transparent via-blue-6 to-transparent bg-gradient-to-t"
              />
              <div class="h-full w-full overflow-hidden b-1 rounded-full bg-neutral/5">
                <img src="/avatar.png" alt="avatar" class="block h-full w-full select-none object-cover">
              </div>
              <div aria-hidden="true" class="absolute inset-0 z-1" />
            </div>
          </div>

          <!-- 信息: 右侧 -->
          <div class="text-center space-y-4" md="text-left">
            <h2 class="motion-fade-home from-blue-5 to-purple-5 bg-gradient-to-r bg-clip-text text-3xl text-transparent font-bold space-x-2" md="text-4xl">
              {{ displayName }}
            </h2>

            <!-- 社交别名 -->
            <!-- <div class="text-sm text-neutral/50 space-x-4">
              <template v-for="(social, idx) in socials" :key="idx">
                <span v-if="social.featured" class="motion-fade-home inline-block hover:text-neutral/70">
                  {{ social.username }}
                </span>
              </template>
            </div> -->

            <!-- 个人标签 -->
            <div class="motion-fade-home flex-center flex-wrap gap-2" md="flex-start">
              <span v-for="(tag, idx) in tags" :key="idx" :class="tag.class" class="flex flex-1 items-center gap-2 text-nowrap text-xs" md="flex-0">
                <span :class="tag.icon" />
                <span>{{ tag.text }}</span>
              </span>
            </div>

            <!-- 二进制生日 -->
            <p
              class="motion-fade-home text-sm text-neutral tracking-widest font-mono space-x-2"
              role="text"
              aria-description="生日的二进制表示"
            >
              <span class="text-gray-400/60" aria-hidden="true">0b</span>
              <span
                class="space-x-1"
                :aria-label="getBirthAriaLabel()"
                :title="getBirthAriaLabel()"
                tabindex="0"
              >
                <span
                  v-for="(b, idx) in toBinaryGroup(birthday)"
                  :key="idx"
                  :class="binaryColors[idx]"
                  aria-hidden="true"
                >
                  {{ b }}
                </span>
              </span>
            </p>
          </div>
        </Motion>

        <Motion drag :drag-constraints="(scope as HTMLElement)" class="motion-fade-home z-1 w-full flex flex-col gap-6 pt-6" md="flex-row-reverse pt-0">
          <!-- socials -->
          <div class="flex-center flex-1 gap-6">
            <DarkMode />
            <NuxtLink
              v-for="item in socials"
              :key="item.link"
              :to="item.link"
              :target="getBlankTarget(item.link)"
              class="group flex items-center justify-center ctx-link"
            >
              <i :class="item.icon" class="text-xl" />
            </NuxtLink>
          </div>

          <div class="hidden h-full flex-1" md="block">
            <UiDivide class="h-full" vertical :content="false" />
          </div>
          <div class="w-full flex-1" md="hidden">
            <UiDivide class="w-full" :content="false" />
          </div>

          <!-- 导航 -->
          <div class="flex flex-wrap justify-center gap-4" md="gap-6">
            <NuxtLink
              v-for="(link, index) in links" :key="index" :to="link.link"
              :target="getBlankTarget(link.link)"
              class="group flex items-center gap-1 rounded-lg px-2 py-2 transition ctx-link"
              md="gap-2"
            >
              <i v-if="link.icon" :class="link.icon" class="" />
              <span class="text-sm">{{ link.text }}</span>
            </NuxtLink>
          </div>
        </Motion>
      </div>

      <!-- 装饰性元素 -->
      <div class="mb-6 w-full flex-col-center gap-8" md="gap-8 mb-8" aria-hidden="true">
        <p class="motion-fade-home max-w-md px-4 text-center text-sm text-neutral/30 tracking-wider font-serif italic" aria-hidden="true">
          "Always learning, forever exploring"
        </p>
        <UiDivide class="motion-fade-home" :content="false" />
      </div>

      <footer class="h-16 flex items-end justify-center pb-8">
        <p text="xs neutral/50" class="motion-fade-home">
          Copyright © 2024-present zyjared
        </p>
      </footer>
    </div>

    <!-- 装饰性元素 -->
    <div class="opacity-0" sm="opacity-100 w-fit">
      <UiDivide vertical right class="motion-fade-home h-100 w-14" sm="w-20" md="w-24 pr-0" />
    </div>
  </div>
</template>

<style scoped>
.motion-fade-home {
  opacity: 0;
}

.ani-rotate {
  animation: ani-rotate 5s linear infinite;
}

@keyframes ani-rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}
</style>

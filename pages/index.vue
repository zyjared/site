<script setup lang='ts'>
import { animate, stagger } from 'motion'

const { links, nickname, socials } = useAppConfig()

const tags = [
  {
    text: 'Frontend Developer',
    icon: 'i-carbon:code',
    class: 'badge-blue',
  },
  {
    text: 'Dreamer',
    icon: 'i-carbon:cloud',
    class: 'badge-indigo',
  },
  {
    text: 'Anime Enthusiast',
    icon: 'i-carbon:video',
    class: 'badge-green',
  },
  {
    text: 'Ctrl+S Spammer',
    icon: 'i-carbon:keyboard',
    class: 'badge-amber',
  },
]

// @unocss-include
const techIcons = [
  'i-vscode-icons:file-type-html',
  'i-vscode-icons:file-type-css',
  'i-vscode-icons:file-type-js',
  'i-vscode-icons:file-type-typescript',
  'i-vscode-icons:file-type-vue',
  'i-vscode-icons:file-type-reactts',
  'i-vscode-icons:file-type-python',
  'i-vscode-icons:file-type-java',
  'i-vscode-icons:file-type-rust',
  'i-vscode-icons:file-type-c',
]

// animation
// function toNumber(num: any) {
//   const isnan = Number.isNaN(num)
//   return isnan ? 0 : Number(num)
// }

// function getIdx(el: Element) {
//   return toNumber((el as HTMLElement).dataset.idx)
// }

function fadeInStagger() {
  animate(
    '.stagger-fade',
    {
      opacity: [0, 1],
      y: [20, 0],
    },
    {
      delay: stagger(0.1, { from: 'first' }),
      duration: 0.8,
    },
  )
}

onMounted(() => {
  fadeInStagger()
})
</script>

<template>
  <div>
    <!-- 背景效果 -->
    <div class="fixed inset-0 -z-1">
      <div
        class="absolute right-1/4 top-1/4 w-[35vw] h-[35vw] bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-[100px] mix-blend-multiply"
      />
      <div
        class="absolute left-1/4 bottom-1/4 w-[35vw] h-[35vw] bg-gradient-to-bl from-indigo-500/10 via-pink-500/5 to-transparent rounded-full blur-[100px] mix-blend-multiply"
      />
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] border border-shared/5 rounded-full opacity-30"
      />
    </div>

    <!-- 主内容网格布局 -->
    <div class="container mx-auto min-h-[calc(100vh-4rem)] grid grid-cols-12 gap-8">
      <!-- layout: 左侧装饰 -->
      <div class="col-span-1 flex-col-center gap-3">
        <div class="h-32 w-[1px] bg-gradient-to-b from-transparent via-shared/20 to-transparent" />
        <div
          class="write-vertical-right text-xs tracking-0.5em text-shared/40 whitespace-nowrap origin-center uppercase space-y-3"
        >
          <span class="inline-block stagger-fade">zyj</span>
          <span class="inline-block stagger-fade">jared</span>
        </div>
        <div class="h-32 w-[1px] bg-gradient-to-b from-transparent via-shared/20 to-transparent" />
      </div>

      <!-- layout: 主内容 -->
      <div class="col-span-10 flex-col-center min-h-full">
        <div class="flex-1 flex-col-center gap-8">
          <!-- 主内容 -->
          <div class="flex-center gap-12">
            <!-- 主内容: 左侧头像 -->
            <div class="col-span-2 justify-self-end stagger-fade">
              <div class="p-2px w-32 aspect-1 relative rounded-full overflow-hidden">
                <div
                  class="absolute z--1 left-1/2 top-1/3 h-20 w-2/1 bg-gradient-to-t from-transparent via-blue-6 to-transparent transform-origin-l ani-rotate"
                />
                <div class="w-full h-full rounded-full overflow-hidden theme-bg b-1">
                  <img src="/avatar.png" alt="avatar" class="block w-full h-full object-cover">
                </div>
              </div>
            </div>

            <!-- 主内容: 右侧信息 -->
            <div class="col-span-3 space-y-6 ">
              <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-5 to-purple-5 bg-clip-text text-transparent stagger-fade">
                {{ nickname }}
              </h2>

              <!-- 个人标签 -->
              <div class="grid grid-cols-2 gap-2 max-w-md">
                <span v-for="(tag, idx) in tags" :key="idx" :class="tag.class" class="text-xs flex items-center gap-2 stagger-fade">
                  <span :class="tag.icon" />
                  <span>{{ tag.text }}</span>
                </span>
              </div>

              <!-- 二进制装饰 -->
              <p class="text-shared font-mono tracking-widest space-x-2">
                <span class="text-gray-400/60 text-sm stagger-fade">0b</span>
                <span class="space-x-1">
                  <span class="text-blue-400/80 stagger-fade">1000</span>
                  <span class="text-indigo-400/80 stagger-fade">1010</span>
                  <span class="text-red-400/80 stagger-fade">111</span>
                </span>
              </p>
            </div>
          </div>

          <!-- 链接区域 -->
          <div class="flex flex-wrap justify-center gap-4 w-full max-w-3xl stagger-fade">
            <nuxt-link
              v-for="(link, index) in links" :key="index" :external="true" :to="link.link"
              class="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-transparent transition-all duration-300 hover:-translate-y-0.5"
              hover="bg-shared/5 border-shared/10 shadow-md"
            >
              <i
                v-if="link.icon" :class="link.icon"
                class="text-xl text-shared/70 group-hover:scale-110 duration-300"
              />
              <span class="text-sm text-shared/80">{{ link.title }}</span>
            </nuxt-link>
          </div>
        </div>

        <!-- 装饰性元素 -->
        <div class="flex-col-center gap-8 mb-8 opacity-40">
          <div class="flex items-center gap-6">
            <i v-for="(icon) in techIcons" :key="icon" :class="icon" class="stagger-fade" />
            <span key="ellipsis" class="text-xl font-mono text-shared/30 stagger-fade">...</span>
          </div>

          <!-- 分隔 -->
          <div class="w-48 h-[1px] bg-gradient-to-r from-transparent via-shared/20 to-transparent" />

          <!-- 句子 -->
          <p class="text-sm text-shared/40 font-serif italic tracking-wider max-w-md text-center px-4 stagger-fade">
            "Always learning, forever exploring"
          </p>
        </div>
      </div>

      <!-- layout: 右侧社交 -->
      <div class="col-span-1 flex-col-center gap-20">
        <HeaderMode class="text-xl stagger-fade" />
        <div class="flex flex-col gap-6 text-2xl stagger-fade">
          <NuxtLink
            v-for="(social, idx) in socials" :key="idx" :to="social.link" class="transition-transform"
            un-hover="scale-110"
          >
            <i :class="social.icon" class="block text-shared hover:text-shared/50 transition-colors" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <footer class="h-16 flex items-end justify-center pb-8">
      <p text="xs shared/40" class="stagger-fade">
        Copyright © 2024-present zyjared
      </p>
    </footer>
  </div>
</template>

<style scoped>
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

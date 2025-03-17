<script setup lang='ts'>
import { animate, stagger } from 'motion'

const { links, nickname } = useAppConfig()

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
  'i-vscode-icons:file-type-sql',
]

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
  <div class="h-full flex">
    <div class="col-span-12 h-full w-full flex-col-center" md="col-span-10">
      <div class="flex-col-center flex-1 gap-8" md="gap-6 mt-32 mb-8">
        <!-- 主内容 -->
        <div class="w-full flex-center flex-col gap-2" md="flex-row 12">
          <!-- 主内容: 左侧头像 -->
          <div class="stagger-fade">
            <div class="relative aspect-1 w-24 overflow-hidden rounded-full p-2px md:w-32">
              <div
                class="ani-rotate absolute left-1/2 top-1/3 z--1 h-20 w-2/1 transform-origin-l from-transparent via-blue-6 to-transparent bg-gradient-to-t"
              />
              <div class="h-full w-full overflow-hidden b-1 rounded-full theme-bg">
                <img src="/avatar.png" alt="avatar" class="block h-full w-full object-cover">
              </div>
            </div>
          </div>

          <!-- 主内容: 右侧信息 -->
          <div class="text-center space-y-4" md="space-y-6 text-left">
            <h2 class="stagger-fade from-blue-5 to-purple-5 bg-gradient-to-r bg-clip-text text-3xl text-transparent font-bold" md="text-4xl">
              {{ nickname }}
            </h2>

            <!-- 个人标签 -->
            <div class="grid grid-cols-1 mx-auto max-w-md gap-2" md="mx-0 grid-cols-2">
              <span v-for="(tag, idx) in tags" :key="idx" :class="tag.class" class="stagger-fade flex items-center gap-2 text-xs">
                <span :class="tag.icon" />
                <span>{{ tag.text }}</span>
              </span>
            </div>

            <!-- 二进制装饰 -->
            <p class="text-sm text-shared tracking-widest font-mono space-x-2">
              <span class="stagger-fade text-gray-400/60">0b</span>
              <span class="space-x-1">
                <span class="stagger-fade text-blue-400/80">1000</span>
                <span class="stagger-fade text-indigo-400/80">1010</span>
                <span class="stagger-fade text-red-400/80">111</span>
              </span>
            </p>
          </div>
        </div>

        <!-- 链接区域 -->
        <div class="max-w-3xl w-full flex flex-wrap justify-center gap-3 px-2" md="gap-4">
          <nuxt-link
            v-for="(link, index) in links" :key="index" :to="link.link"
            class="stagger-fade group flex items-center gap-3 border border-transparent rounded-xl px-4 py-2.5"
            hover="transition bg-shared/5 border-shared/10 shadow -translate-y-0.5"
          >
            <i
              v-if="link.icon" :class="link.icon"
              class="text-xl text-shared/70 duration-300 delay-50 group-hover:scale-120"
            />
            <span class="text-sm text-shared/80">{{ link.title }}</span>
          </nuxt-link>
        </div>
      </div>

      <!-- 装饰性元素 -->
      <div class="mb-6 flex-col-center gap-6 opacity-40" md="gap-8 mb-8">
        <div class="w-full flex-center gap-4 overflow-visible px-4" md="gap-6">
          <i v-for="(icon) in techIcons" :key="icon" :class="icon" class="stagger-fade" />
        <!-- <span key="ellipsis" class="stagger-fade text-shared/30 font-mono">...</span> -->
        </div>

        <!-- 分隔 -->
        <div class="stagger-fade h-[1px] w-48 from-transparent via-shared/20 to-transparent bg-gradient-to-r" />

        <!-- 句子 -->
        <p class="stagger-fade max-w-md px-4 text-center text-sm text-shared/40 tracking-wider font-serif italic">
          "Always learning, forever exploring"
        </p>
      </div>

      <footer class="h-16 flex items-end justify-center pb-8">
        <p text="xs shared/40" class="stagger-fade">
          Copyright © 2024-present zyjared
        </p>
      </footer>
    </div>

    <!-- 装饰性元素 -->
    <Divide vertical right divide-class="stagger-fade" class="hidden" md="!flex-col-center w-32" />
  </div>
</template>

<style scoped>
.stagger-fade {
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

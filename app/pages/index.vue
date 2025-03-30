<script setup lang='ts'>
import { stagger } from 'motion-v'

const { links, displayName } = useAppConfig()

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
  // {
  //   text: 'Frontend Developer',
  //   icon: 'i-carbon:code',
  //   class: 'badge-blue',
  // },
  {
    text: 'Dreamer',
    icon: 'i-carbon:cloud',
    class: 'badge-indigo',
  },
  // {
  //   text: 'Anime Enthusiast',
  //   icon: 'i-carbon:video',
  //   class: 'badge-green',
  // },
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

// motion

const [scope, animate] = useMotionAnimate()

onMounted(() => {
  animate('.motion-fade-home', {
    opacity: [0, 1],
    y: [20, 0],
  }, {
    delay: stagger(0.1, { from: 'first' }),
    duration: 0.45,
  })
})
</script>

<template>
  <div ref="scope" class="flex-center">
    <div class="h-screen flex-col-center flex-1">
      <!-- 主内容 -->
      <div class="flex-col-center gap-4 py-12" md="gap-6 flex-1 pt-40 pb-8 mb-8">
        <!-- 信息 -->
        <div class="w-full flex-center flex-col gap-2" md="flex-row gap-8">
          <!-- 信息: 左侧头像 -->
          <div class="motion-fade-home">
            <div class="relative aspect-1 w-20 overflow-hidden rounded-full p-2px" sm="w-24" md="w-32">
              <div
                aria-hidden="true"
                class="ani-rotate absolute left-1/2 top-1/3 z--1 h-20 w-2/1 transform-origin-l from-transparent via-blue-6 to-transparent bg-gradient-to-t"
              />
              <div class="h-full w-full overflow-hidden b-1 rounded-full bg-shared">
                <img src="/avatar.png" alt="avatar" class="block h-full w-full object-cover">
              </div>
            </div>
          </div>

          <!-- 信息: 右侧 -->
          <div class="text-center space-y-4" md="text-left">
            <h2 class="motion-fade-home from-blue-5 to-purple-5 bg-gradient-to-r bg-clip-text text-3xl text-transparent font-bold space-x-2" md="text-4xl">
              {{ displayName }}
            </h2>

            <!-- 社交别名 -->
            <!-- <div class="text-sm text-shared/50 space-x-4">
              <template v-for="(social, idx) in socials" :key="idx">
                <span v-if="social.featured" class="motion-fade-home inline-block hover:text-shared/70">
                  {{ social.username }}
                </span>
              </template>
            </div> -->

            <!-- 个人标签 -->
            <div class="flex-center flex-wrap gap-2" md="flex-start">
              <span v-for="(tag, idx) in tags" :key="idx" :class="tag.class" class="motion-fade-home flex flex-1 items-center gap-2 text-nowrap text-xs" md="flex-0">
                <span :class="tag.icon" />
                <span>{{ tag.text }}</span>
              </span>
            </div>

            <!-- 二进制生日 -->
            <p
              class="text-sm text-shared tracking-widest font-mono space-x-2"
              role="text"
              aria-description="生日的二进制表示"
            >
              <span class="motion-fade-home text-gray-400/60" aria-hidden="true">0b</span>
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
                  class="motion-fade-home"
                  aria-hidden="true"
                >
                  {{ b }}
                </span>
              </span>
            </p>
          </div>
        </div>

        <!-- 链接区域 -->
        <div class="max-w-3xl w-full flex flex-wrap justify-center gap-2" md="gap-4">
          <NuxtLink
            v-for="(link, index) in links" :key="index" :to="link.link"
            :target="getBlankTarget(link.link)"
            class="motion-fade-home group flex items-center gap-1 border border-transparent rounded-xl px-4 py-2.5 ctx-link"
            md="gap-3"
            hover="bg-shared/5 border-shared/10 shadow -translate-y-0.5 "
          >
            <i
              v-if="link.icon" :class="link.icon"
              class="text-xl transition-transform-200 group-hover:scale-110"
            />
            <span class="text-sm">{{ link.text }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- 装饰性元素 -->
      <div class="mb-6 w-full flex-col-center gap-8" md="gap-8 mb-8" aria-hidden="true">
        <div class="flex-center flex-wrap gap-4 text-center opacity-20" aria-hidden="true">
          <i v-for="(icon) in techIcons" :key="icon" :class="icon" class="motion-fade-home" />
        </div>

        <!-- 分隔 -->
        <div class="motion-fade-home h-[1px] w-48 from-transparent via-shared/15 to-transparent bg-gradient-to-r" aria-hidden="true" />

        <!-- 句子 -->
        <p class="motion-fade-home max-w-md px-4 text-center text-sm text-shared/30 tracking-wider font-serif italic" aria-hidden="true">
          "Always learning, forever exploring"
        </p>
      </div>

      <footer class="h-16 flex items-end justify-center pb-8">
        <p text="xs shared/50" class="motion-fade-home">
          Copyright © 2024-present zyjared
        </p>
      </footer>
    </div>

    <!-- 装饰性元素 -->
    <Divide vertical right class="motion-fade-home h-100 w-14" sm="w-20" md="w-24 pr-0" />
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

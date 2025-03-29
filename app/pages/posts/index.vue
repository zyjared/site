<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('posts').all()
})

const titleRef = useTemplateRef<HTMLElement>('titleRef')
const { height } = useElementSize(titleRef)
const { y } = useWindowScroll()

const progress = computed(() => {
  if (y.value > height.value || height.value === 0) {
    return 0
  }
  return 1 - y.value / height.value
})
</script>

<template>
  <div
    class="pb-60"
    md="px-10"
    lg="px-20"
  >
    <Motion ref="titleRef" class="mb-24 mt-12 min-h-24" md="flex mb-36 flex-row-reverse items-end justify-between">
      <Motion
        key="title"
        :animate="{ opacity: progress, scale: Math.max(progress, 0.2) }"
        class="origin-bl select-none text-8xl font-900 leading-[1em] ctx-text/30"
        md="origin-br"
      >
        碎片
      </Motion>

      <Motion
        key="subtitle"
        :animate="{ opacity: progress, y: 0 }"
      >
        <div class="text-shared/75 font-mono" aria-hidden="true">
          FRAGMENTS OF THOUGHTS
        </div>
        <p class="text-lg text-shared font-light tracking-wider">
          思考与记录的痕迹
        </p>
      </Motion>
    </Motion>

    <section class="relative space-y-8" md="space-y-12">
      <article
        v-for="post in posts"
        :key="post.path"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8 }"
        class="group"
      >
        <NuxtLink
          :to="post.path"
          class="group block text-shared"
        >
          <time
            v-if="post.meta.date"
            class="block text-sm tracking-wider font-mono"
          >
            {{ formatDate(post.meta.date as string) }}
          </time>

          <h2 class="mb-6 mt-4 text-2xl font-bold transition-transform duration-300 group-hover:translate-x-2 ctx-text">
            {{ post.title }}
          </h2>

          <p>
            {{ post.description }}
          </p>
        </NuxtLink>
        <Divide :content="false" class="mx-auto mt-8 w-[50%] group-last:hidden" md="mt-12" />
      </article>
    </section>
  </div>
</template>

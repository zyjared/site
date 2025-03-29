<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('posts').all()
})

const { y } = useWindowScroll()

const progress = computed(() => {
  if (y.value > 96) {
    return 0
  }
  return 1 - y.value / 96
})
</script>

<template>
  <div class="relative pb-60" md="px-10" lg="px-20">
    <section
      class="mb-28 mt-12 min-h-24 flex flex-row-reverse justify-between gap-2"
      md="mb-36"
      lg="mb-40"
    >
      <Motion
        key="title"
        class="origin-bl text-8xl font-900 ctx-text"
        :animate="{ opacity: progress, scale: Math.max(progress, 0.2) }"
      >
        碎片
      </Motion>

      <Motion
        key="sub-title"
        class="origin-bl self-end"
        :animate="{ opacity: progress }"
      >
        <div class="text-sm text-shared/75 font-mono">
          FRAGMENTS OF THOUGHTS
        </div>
        <p class="text-lg text-shared">
          痕迹
        </p>
      </Motion>
    </section>

    <section
      class="relative mx-auto max-w-4xl space-y-20"
      md="space-y-28"
    >
      <Motion
        v-for="(post) in posts"
        :key="post.path"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        class="group relative"
      >
        <NuxtLink
          :to="post.path"
          class="block"
        >
          <div class="flex items-baseline gap-8">
            <time
              v-if="post.meta.date"
              class="hidden shrink-0 text-sm text-shared tracking-wider font-mono"
              md="block"
            >
              {{ formatDate(post.meta.date as string) }}
            </time>

            <div class="relative opacity-75 transition-opacity group-hover:opacity-100">
              <h2
                class="text-2xl font-bold"
              >
                {{ post.title }}
              </h2>

              <p
                class="mt-3 text-shared"
              >
                {{ post.description }}
              </p>

              <div
                aria-hidden="true"
                class="absolute top-0 h-full w-2px origin-t scale-y-0 rounded-full from-indigo/75 to-transparent bg-gradient-to-b transition-transform duration-500 -left-4 group-hover:scale-y-100"
              />
            </div>
          </div>
        </NuxtLink>

        <!-- <div
          class="[clip-path:inset(0_50%_0_50%)] absolute inset-x-0 transition-[clip-path] duration-500 group-hover:[clip-path:inset(0_0_0_0)] -inset-y-12 -z-1"
          flex="~ col justify-between items-center"
          p="y-4"
        >
          <Divide :content="false" class="w-full" />
          <Divide :content="false" class="w-full" />
        </div> -->
      </Motion>
    </section>
  </div>
</template>

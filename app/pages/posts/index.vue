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
        class="origin-br text-8xl font-900 ctx-text"
        :animate="{ opacity: progress, scale: Math.max(progress, 0.4) }"
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
                class="absolute top-0 h-full w-[1.5px] origin-t scale-y-0 rounded-full to-transparent bg-gradient-to-b transition-transform duration-500 -left-4 group-hover:scale-y-100 from-ctx-text/75"
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

        <!-- <div
          aria-hidden="true"
          class="absolute inset-x-0 scale-x-0 from-transparent via-shared/15 to-transparent bg-gradient-to-r opacity-0 transition-all duration-500 -inset-y-4 -left-4 group-hover:scale-x-100 group-hover:opacity-100"
        /> -->
      </Motion>
    </section>
  </div>
</template>

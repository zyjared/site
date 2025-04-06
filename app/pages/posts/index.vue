<script setup lang="ts">
const route = useRoute()

// 简化日期格式化
function formatPostDate(date: string) {
  const d = new Date(date)
  return {
    year: d.getFullYear(),
    month: d.toLocaleString('zh-CN', { month: 'short' }),
    day: d.getDate().toString().padStart(2, '0'),
  }
}

const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').order('id', 'DESC').all())
const isEmpty = computed(() => !posts.value?.length)

// 文章分组
const postsByYear = computed(() => {
  if (!posts.value)
    return new Map()
  return new Map(
    Object.entries(
      posts.value.reduce((acc, post) => {
        const year = formatPostDate(post.meta.date as string).year
        if (!acc[year])
          acc[year] = []
        acc[year].push(post)
        return acc
      }, {} as Record<string, any[]>),
    ).sort(([a], [b]) => Number(b) - Number(a)),
  )
})
</script>

<template>
  <PageContainer class="min-h-screen">
    <PageTitle
      title="碎片"
      subtitle="记录 & 笔记"
      accent="FRAGMENTS"
    >
      <template #after>
        <div class="mt-12 flex items-center gap-2 text-sm text-shared/40 font-mono">
          {{ posts?.length || 0 }} 碎片
          <span class="h-3 w-[1px] bg-shared/20" />
          {{ postsByYear.size }} 年
        </div>
      </template>
    </PageTitle>

    <!-- 空状态 -->
    <div v-if="isEmpty" class="mx-auto max-w-2xl text-shared">
      <div class="relative aspect-video flex-col-center gap-6">
        <div class="text-8xl" i-carbon:pen-fountain />
        <p>
          思考中......
        </p>
      </div>
    </div>

    <!-- 文章列表 -->
    <div v-else class="space-y-20">
      <section v-for="[year, yearPosts] in postsByYear" :key="year" class="group space-y-8">
        <!-- 年份标记 -->
        <div>
          <span class="text-7xl text-shared/50 font-bold font-mono">{{ year }}</span>
        </div>

        <!-- 文章网格 -->
        <div class="grid gap-6 md:grid-cols-2">
          <NuxtLink v-for="post in yearPosts" :key="post.path" :to="post.path" class="group/item ctx-link">
            <article class="h-ful flex-col border border-shared/10 rounded-xl p-6 space-y-4 group-hover/item:b-shared/20">
              <div class="flex items-center justify-between">
                <time class="flex items-baseline gap-2 font-mono">
                  <span class="text-2xl font-bold">{{ formatPostDate(post.meta.date as string).day }}</span>
                  <span class="text-sm">{{ formatPostDate(post.meta.date as string).month }}</span>
                </time>
                <span aria-hidden="true" class="text-sm text-inherit opacity-0 transition-[opacity] group-hover/item:opacity-100" i-carbon:arrow-up-right />
              </div>

              <h3 class="text-xl font-medium ctx-text">
                {{ post.title }}
              </h3>
              <p class="line-clamp-2 h-[3em] text-sm leading-[1.5em]">
                {{ post.description }}
              </p>
            </article>
          </NuxtLink>
        </div>
      </section>
    </div>
  </PageContainer>
</template>

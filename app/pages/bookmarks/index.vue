<script setup lang="ts">
interface Bookmark {
  title: string
  link: string
  description: string
}

interface Collection {
  title: string
  icon: string
  description: string
  items: Bookmark[]
}

interface Data {
  collections: Collection[]

  title: string
  description: string
}

const { data } = await useAsyncData('bookmarks', () => {
  return queryCollection('bookmarks').path('/bookmarks/index-j').first()
})

const items = computed(() => {
  const body = data.value?.body as unknown as Data
  if (!body?.collections)
    return []
  return body.collections.flatMap((collection, pidx) =>
    collection.items.map((item, idx) => ({
      id: `${pidx}-${idx}`,
      ...item,
      collection: {
        title: collection.title,
        icon: collection.icon,
        description: collection.description,
      },
    })),
  )
})

// ---------------------------------------
// 导航
// ---------------------------------------

const curTab = ref('all')
function selectTab(item: { id: string | number, label: string }) {
  curTab.value = item.id as string
}

// 分类统计
const categoryStats = computed(() => {
  const collections = (data.value?.body as unknown as Data)?.collections
  if (!collections)
    return []

  const items = collections.map((collection, idx) => {
    return {
      id: `category-${idx}`,
      title: collection.title,
      icon: collection.icon,
      description: collection.description,
      count: collection.items?.length ?? 0,
    }
  })

  return [
    {
      id: 'all',
      title: '全部',
      icon: 'i-material-symbols:border-all-rounded',
      description: '所有书签',
      count: items.reduce((total, item) => total + item.count, 0),
    },
    ...items,
  ]
})

// ---------------------------------------
// 书签
// ---------------------------------------
const search = ref('')

const bookmarks = computed(() => {
  const s = search.value.trim().toLowerCase()
  const allItems = items.value

  if (!s && curTab.value === 'all')
    return allItems

  const selectedCategory = categoryStats.value.find(c => c.id === curTab.value)?.title

  return allItems.filter((it) => {
    const matchCategory = curTab.value === 'all' || it.collection.title === selectedCategory
    const matchSearch = !s || it.title.toLowerCase().includes(s) || it.description.toLowerCase().includes(s)
    return matchCategory && matchSearch
  })
})
</script>

<template>
  <div class="relative min-h-screen space-y-8" md="p-4">
    <div class="space-y-6">
      <div class="mb-12 mt-16 flex flex-col gap-4" sm="flex-row items-end justify-between">
        <div class="space-y-1">
          <h1 class="text-3xl font-bold">
            {{ data?.title }}
          </h1>
          <p class="text-sm text-shared/50">
            {{ data?.description }}
          </p>
        </div>

        <UiSearch
          v-model="search"
          placeholder="搜索书签..."
        />
      </div>

      <UiTabs
        v-model="curTab"
        :items="categoryStats.map(item => ({
          id: item.id,
          label: item.title,
          icon: item.icon,
          badge: item.count,
        }))"
        @select="selectTab"
      />
    </div>

    <MotionLayoutGroup>
      <Motion layout class="relative grid auto-rows-fr grid-cols-1 gap-4" sm="grid-cols-2" md="grid-cols-3" lg="grid-cols-4">
        <MotionAnimatePresence>
          <Motion
            v-for="item in bookmarks"
            :key="item.id"
            layout
            :initial="false"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.8 }"
          >
            <NuxtLink
              :target="getBlankTarget(item.link)"
              :to="item.link"
              class="group block cursor-pointer border border-shared/30 rounded-lg"
            >
              <div class="p-4 space-y-2">
                <h3 class="truncate font-medium">
                  {{ item.title }}
                </h3>
                <p class="truncate text-sm text-shared/60">
                  {{ item.description }}
                </p>
              </div>

              <div
                :to="item.link"
                class="flex items-center justify-between px-4 py-2 text-xs text-shared/50"
                b="t-1 shared/30"
              >
                <div class="flex-center gap-2">
                  <span :class="item.collection.icon" />
                  <span>{{ item.collection.title }}</span>
                </div>
                <div class="flex-center gap-2 opacity-0 transition-opacity duration-300 ctx-text group-hover:opacity-100">
                  <span>访问</span>
                  <span i-carbon:arrow-up-right />
                </div>
              </div>
            </NuxtLink>
          </Motion>
        </MotionAnimatePresence>
      </Motion>
    </MotionLayoutGroup>
  </div>
</template>

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

interface BookmarkItem extends Bookmark {
  id: string
  collection: {
    title: string
    icon: string
    description: string
  }
}

const { data } = await useAsyncData('bm-data', () => {
  return queryCollection('bm').path('/bm/data').first()
})

const items = computed(() => {
  const body = data.value?.body as unknown as Data
  if (!body?.collections)
    return []
  return body.collections.flatMap((collection, pidx) =>
    collection.items.map((item, idx) => ({
      ...item,
      id: `${pidx}-${idx}`,
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
function selectTab(item: { id: string | number, title: string }) {
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

function getBookmarks(ctx: { search: string, tab: string }): BookmarkItem[] {
  const { search, tab } = ctx
  const s = search.trim().toLowerCase()
  const allItems = items.value

  if (!s && tab === 'all')
    return allItems

  const selectedCategory = categoryStats.value.find(c => c.id === tab)?.title

  return allItems.filter((it) => {
    const matchCategory = tab === 'all' || it.collection.title === selectedCategory
    const matchSearch = !s || it.title.toLowerCase().includes(s) || it.description.toLowerCase().includes(s)
    return matchCategory && matchSearch
  })
}

const bookmarks = computed(() => getBookmarks({ search: search.value, tab: curTab.value }))
</script>

<template>
  <PageContainer class="relative min-h-screen">
    <PageTitle :title="data?.title || '书签'" :subtitle="data?.description || '常用工具和网站收藏'" accent="COLLECTIONS">
      <template #after>
        <UiSearch
          v-model="search"
          placeholder="搜索书签..."
        />
      </template>
    </PageTitle>

    <UiTabs
      v-model="curTab"
      :items="categoryStats.map(item => ({
        id: item.id,
        title: item.title,
        icon: item.icon,
        badge: item.count,
      }))"
      @select="selectTab"
    />

    <MotionLayoutGroup>
      <Motion layout class="relative grid auto-rows-fr grid-cols-1 mt-6 gap-4" sm="grid-cols-2" md="grid-cols-3" lg="grid-cols-4">
        <MotionAnimatePresence mode="popLayout">
          <Motion
            v-for="item in bookmarks"
            :key="item.id"
            layout
            :initial="false"
            :animate="{ opacity: 1, scale: 1 } "
          >
            <NuxtLink
              :target="getBlankTarget(item.link)"
              :to="item.link"
              class="group block cursor-pointer border border-neutral/10 rounded-lg hover:b-neutral/20 ctx-link"
            >
              <div class="p-4 space-y-2">
                <h3 class="truncate font-medium ctx-text">
                  {{ item.title }}
                </h3>
                <p class="truncate text-sm">
                  {{ item.description }}
                </p>
              </div>

              <div
                :to="item.link"
                class="flex items-center justify-between px-4 py-2 text-xs text-neutral/50 transition group-hover:b-neutral/20"
                b="t-1 neutral/10 "
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
  </PageContainer>
</template>

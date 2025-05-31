<script setup lang="ts">
import type { BmCollectionItem } from '@nuxt/content'

const { items, updateBm, categories, categoryId, search, updateCategoryId } = useBm()

const { data } = await useAsyncData('bm', () => {
  return queryCollectionNavigation('bm', [
    'id',
    'path',
    'title',
    'description',
    'icon',
    'order',
    'children',
    'extension',
  ])
})

const info = shallowRef({
  title: '书签',
  description: '',
})

const tree = (data.value as unknown as BmCollectionItem[])[0]

if (tree) {
  info.value = {
    title: tree.title,
    description: tree.description || '',
  }
  updateBm(tree.children as BmCollectionItem[] || [])
}

function selectTab(tab: { id: string | number }) {
  updateCategoryId(tab.id as string)
}
</script>

<template>
  <PageContainer class="relative min-h-screen">
    <PageTitle :title="info.title" :subtitle="info.description" accent="COLLECTIONS">
      <template #after>
        <UiSearch v-model="search" placeholder="搜索书签..." />
      </template>
    </PageTitle>

    <UiTabs
      v-model="categoryId" :items="categories.map(item => ({
        id: item.id,
        title: item.title,
        icon: item.icon,
        badge: item.count,
      }))" @select="selectTab"
    />

    <MotionLayoutGroup>
      <Motion
        layout class="relative grid auto-rows-fr grid-cols-1 mt-6 gap-4" sm="grid-cols-2" md="grid-cols-3"
        lg="grid-cols-4"
      >
        <MotionAnimatePresence mode="popLayout">
          <Motion
            v-for="item in items" :key="item.id" layout :initial="false"
            :animate="{ opacity: 1, scale: 1 }"
          >
            <NuxtLink
              :target="getBlankTarget(item.link)" :to="item.link"
              class="group block cursor-pointer border border-neutral/10 rounded-lg hover:b-neutral/20 ctx-link"
            >
              <div class="p-4 space-y-2">
                <h3 class="truncate font-medium ctx-text">
                  {{ item.title }}
                </h3>
                <p class="min-h-5 truncate text-sm">
                  {{ item.description }}
                </p>
              </div>

              <div
                :to="item.link"
                class="flex items-center justify-between px-4 py-2 text-xs text-neutral/50 transition group-hover:b-neutral/20"
                b="t-1 neutral/10 "
              >
                <div class="flex-center gap-2">
                  <span :class="item.icon" />
                  <span>{{ item.title }}</span>
                </div>
                <div
                  class="flex-center gap-2 opacity-0 transition-opacity duration-300 ctx-text group-hover:opacity-100"
                >
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

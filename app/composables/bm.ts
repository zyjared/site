import type { BmCollectionItem } from '@nuxt/content'
import { augmentKey, hasOwnKey, isEmpty, pick } from '#shared'

type RawItem = BmCollectionItem['children'][number]

interface RawJsonItem {
  title: string
  description: string
  link: string
  order?: number
}

interface RawMdItem extends BmCollectionItem {
}

interface RawJsonCategory extends BmCollectionItem {
  children: RawJsonItem[]
}

interface RawDirCategory extends BmCollectionItem {
  children: RawMdItem[]
}

interface BmItem {
  id: string
  title: string
  description?: string
  icon?: string
  link: string
  children?: BmItem[]
  categoryId?: string
  order?: number
}

export function useBm() {
  function getPathLevel(str: string) {
    return str.split('/').filter(Boolean).length
  }

  function maybeCategory(item: BmCollectionItem): item is RawJsonCategory | RawDirCategory {
    return !!item.path && getPathLevel(item.path) === 2
  }

  function isRawJsonItem(item: RawItem): item is RawJsonItem {
    const keys = ['title', 'link']
    return keys.every(key => hasOwnKey(item, key) && !!item[key])
  }

  function isRawMdItem(item: RawItem): item is RawMdItem {
    return hasOwnKey(item, 'extension') && item.extension === 'md'
  }

  // json 分组
  function isJsonCategory(item: RawJsonCategory | RawDirCategory): item is RawJsonCategory {
    return maybeCategory(item)
      && item.extension === 'json'
      && !!item.children?.length
  }

  // 文件夹分组
  function isDirCategory(item: RawJsonCategory | RawDirCategory): item is RawDirCategory {
    return maybeCategory(item)
      && (!item.extension || item.extension === 'yml')
      && !!item.children?.length
  }

  function transformJsonItem(item: RawJsonItem, parent: RawJsonCategory): BmItem | null {
    return isRawJsonItem(item)
      ? {
          id: item.link,
          icon: parent.icon,
          categoryId: parent.id,
          ...pick(item, ['title', 'description', 'link', 'order']),
        }
      : null
  }

  function transformMdItem(item: RawMdItem, parent: RawDirCategory): BmItem | null {
    return isRawMdItem(item)
      ? {
          categoryId: parent.id,
          link: item.path,
          icon: parent.icon,
          ...pick(item, ['id', 'title', 'description', 'order']),
        }
      : null
  }

  function sortItems(items: BmItem[]): BmItem[] {
    return items.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      if (a.order !== undefined) {
        return -1
      }
      if (b.order !== undefined) {
        return 1
      }
      return a.title.localeCompare(b.title)
    })
  }

  function transformCategory(item: RawJsonCategory | RawDirCategory): BmItem | null {
    const children = isJsonCategory(item)
      ? item.children.map(it => transformJsonItem(it, item))
      : isDirCategory(item)
        ? item.children.map(it => transformMdItem(it, item))
        : null

    if (!children)
      return null

    const data = pick(item, ['id', 'title', 'description', 'icon', 'order'])

    // .navigation.yml 的文件夹才有 id
    if (!data.id) {
      data.id = item.path
    }

    return augmentKey(
      augmentKey(data, 'link', item.path),
      'children',
      sortItems(children.filter(Boolean) as BmItem[]),
    )
  }

  function unfoldItems(items: BmItem[]) {
    return items.flatMap((it): BmItem | BmItem[] => {
      if (it.children) {
        return it.children
      }
      return []
    })
  }

  const TAG_ALL = '__all'

  // 分类
  const categoryId = ref<string>(TAG_ALL)

  // 搜索
  const search = ref('')

  // 原始数据
  const bm = shallowRef<BmItem[]>([])

  // 筛选后的数据
  const items = computed(() => {
    const its = unfoldItems(bm.value)
    if (isEmpty(search.value) && categoryId.value === TAG_ALL)
      return its

    return its.filter(it => it.categoryId === categoryId.value && it.title.includes(search.value))
  })

  // 所有分类
  const categories = computed(() => {
    const cates = bm.value.map(it => ({
      ...it,
      count: it.children?.length,
    }))

    return [{
      id: TAG_ALL,
      title: '全部',
      icon: 'i-material-symbols:border-all-rounded',
      description: '所有书签',
      count: cates.reduce((sum, it) => sum + (it.count || 0), 0),
    }, ...cates]
  })

  function updateBm(items: BmCollectionItem[]) {
    bm.value = sortItems(
      items
        .map(it => transformCategory(it as RawDirCategory | RawJsonCategory))
        .filter(Boolean) as BmItem[],
    )
  }

  function updateCategoryId(id: string) {
    categoryId.value = id
  }

  function updateSearch(query: string) {
    search.value = query
  }

  return {
    bm,
    items,
    categoryId,
    categories,
    search,
    updateBm,
    updateCategoryId,
    updateSearch,
  }
}

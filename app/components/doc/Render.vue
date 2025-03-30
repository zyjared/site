<script setup lang="ts">
import type { DocToc } from './Aside.vue'

interface DocBody {
  type: string
  value: any[]
  toc: DocToc
}

interface Document {
  id: string
  title: string
  body: DocBody
  description: string
}

interface Props {
  value: Document | null | undefined

  /**
   * 标题层级
   *
   * @default 3
   */
  level?: number
}

const { value, level = 3 } = defineProps<Props>()

const article = useTemplateRef<HTMLElement>('article')

// -----------------------------------
// 侧边栏 目录定位
// -----------------------------------

interface Heading {
  id: string | null
  top: number
  bottom: number
}
const headings = shallowRef<Heading[]>([])
const currentHeadingId = ref<string | null>(null)

function binarySearchHeading(y: number, headings: Heading[]) {
  let left = 0
  let right = headings.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const heading = headings[mid]!

    if (y >= heading.top && y < heading.bottom)
      return heading

    if (y < heading.top)
      right = mid - 1
    else
      left = mid + 1
  }

  return undefined
}

function updateCurrentHeading(id?: string) {
  const hs = headings.value
  if (hs.length === 0)
    return

  if (id !== undefined) {
    currentHeadingId.value = id
    return
  }

  const y = window.scrollY + 100

  // 边界检查
  if (y < hs[0]!.top) {
    currentHeadingId.value = null
    return
  }

  const cur = binarySearchHeading(y, hs)
  if (cur) {
    currentHeadingId.value = cur.id
  }
}

/**
 * 存储宽，不更新 x 轴的变化
 */
let lastArticleWidth: number | undefined

function getHeadingSelector(level: number) {
  const its = []
  const len = level > 6 ? 6 : level
  for (let i = 2; i <= len; i++)
    its.push(`h${i}`)
  return its.join(', ')
}

/**
 * 获得 dom 中的标题，
 * 并记录其在文档中的位置，
 * 为快速定为位做准备。
 * 完成后， 会矫正一次目录位置。
 */
function syncHeadings() {
  const articleWidth = article.value?.clientWidth
  if (articleWidth === lastArticleWidth) {
    return
  }

  lastArticleWidth = articleWidth

  nextTick(() => {
    if (!article.value)
      return

    const dom = article.value as HTMLElement
    const elements = Array.from(dom.querySelectorAll(getHeadingSelector(level))) as HTMLElement[]

    const hs: Heading[] = []
    elements.forEach((el, index) => {
      const top = (el as HTMLElement).offsetTop

      if (index !== 0) {
        hs[index - 1]!.bottom = top
      }

      const h = {
        id: el.getAttribute('id'),
        top: el.offsetTop,
        bottom: 0,
      }

      hs.push(h)
    })

    hs[hs.length - 1]!.bottom = dom.scrollHeight
    headings.value = hs

    updateCurrentHeading()
  })
}

onMounted(syncHeadings)

useEventListener('scroll', () => updateCurrentHeading(), { passive: true }) // 复杂度可以接受
useEventListener('resize', useDebounceFn(syncHeadings, 100), { passive: true })
</script>

<template>
  <div v-if="!value" class="h-screen flex-center">
    <ErrorDisplay :error="{ code: 404 }" :clean="false" />
  </div>
  <div v-else class="w-full flex gap-12" lg="gap-16">
    <article ref="article" class="flex-1" md="pl-2" lg="pl-6">
      <slot name="doc-before" />

      <slot>
        <ContentRenderer :value="value" class="max-w-none prose" dark="prose-invert" />
      </slot>

      <slot name="doc-after">
        <div class="h-52" aria-hidden="true" />
      </slot>
    </article>

    <div
      class="sticky top-0 hidden max-h-screen overflow-auto py-16"
      md="block w-32"
      lg="w-44"
    >
      <DocAside
        v-if="article"
        :toc="value.body.toc"
        :current-id="currentHeadingId"
      >
        <template #aside-before>
          <slot name="aside-before" />
        </template>
        <template #aside-after>
          <slot name="aside-after" />
        </template>
      </DocAside>
    </div>
  </div>
</template>

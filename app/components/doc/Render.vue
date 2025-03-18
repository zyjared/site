<script setup lang="ts">
interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

interface DocBody {
  type: string
  value: any[]
  toc: {
    title: string
    searchDepth: number
    depth: number
    links: TocLink[]
  }
}

interface Document {
  id: string
  title: string
  body: DocBody
  description: string
}

const { value, level = 3 } = defineProps<{
  value: Document | null | undefined
  level?: number
}>()

// 滚动监听
const article = useTemplateRef<HTMLElement>('article')
const activeId = ref<string>('')

const { y: scrollY, isScrolling } = useWindowScroll()

// 锚点定位
interface Anchor {
  id: string
  top: number
  bottom: number
}
const anchors = shallowRef<Anchor[]>([])

function toAnchor() {
  const y = scrollY.value + 100

  const current = anchors.value.find(heading => y >= heading.top && y < heading.bottom)

  if (current?.id !== activeId.value)
    activeId.value = current?.id ?? ''
}

function buildSelector(level: number) {
  const its = []
  for (let i = 2; i <= level; i++)
    its.push(`h${i}`)
  return its.join(', ')
}

function updateAnchors() {
  nextTick(() => {
    if (!article.value)
      return

    const dom = article.value as HTMLElement
    const headings = Array.from(dom.querySelectorAll(buildSelector(level)))
    const last = headings.length - 1

    anchors.value = headings.map((el, index) => {
      const top = (el as HTMLElement).offsetTop
      const bottom = index < last
        ? (headings[index + 1] as HTMLElement).offsetTop
        : dom.scrollHeight

      return {
        id: el.getAttribute('id'),
        top,
        bottom,
      } as Anchor
    })

    toAnchor()
  })
}

watchThrottled(isScrolling, (scrolling) => {
  if (scrolling)
    return

  toAnchor()
}, {
  throttle: 50,
})

function scrollToAnchor(id: string) {
  const heading = document.getElementById(id)
  if (heading) {
    heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// onMounted(updateAnchors)

useEventListener('resize', useDebounceFn(updateAnchors, 100))

// 侧边栏定位
const { right: articleRight } = useElementBounding(article)
</script>

<template>
  <div v-if="!value" class="h-full flex-col-center">
    <ErrorDisplay :error="{ code: 404, fatal: true }" />
  </div>
  <div v-else :ref="updateAnchors" class="w-full">
    <article ref="article" class="flex-1 overflow-hidden pt-8" md="pl-2 pr-46" lg="pl-6 pr-70">
      <slot name="doc-before" />

      <slot>
        <ContentRenderer :value="value" class="max-w-none prose prose" dark="prose-invert" />
      </slot>

      <slot name="doc-after">
        <div class="h-52" />
      </slot>
    </article>

    <DocAside
      v-if="article"
      :toc="value.body.toc"
      :active-id="activeId"
      class="fixed hidden hidden max-h-screen overflow-auto py-16"

      md="block w-32"
      lg="w-52"
      :style="{
        top: 0,
        left: `${articleRight}px`,
        transform: `translateX(-100%)`,
      }"
      @anchor="scrollToAnchor"
    >
      <template #aside-before>
        <slot name="aside-before" />
      </template>
      <template #aside-after>
        <slot name="aside-after" />
      </template>
    </DocAside>
  </div>
</template>

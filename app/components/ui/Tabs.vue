<script setup lang="ts">
export interface UiTabItem {
  id: string | number
  title: string
  icon?: string
  badge?: string | number
}

interface Props {
  /**
   * 标签项列表
   */
  items: UiTabItem[]
}

const { items } = defineProps<Props>()
const emit = defineEmits<{
  select: [item: UiTabItem]
}>()

const model = defineModel<UiTabItem['id']>()

function handleSelect(item: UiTabItem) {
  model.value = item.id
  emit('select', item)
}

function isSelected(item: UiTabItem) {
  return model.value === item.id
}

// --------------------------------------------
// 分页
// --------------------------------------------

const tabsRef = useTemplateRef<HTMLElement>('tabsRef')

const currentPage = ref(0)

interface Page {
  left: number
  right: number
  startEl: number
  endEl: number
}

const pages = shallowRef<Page[]>([])

function resetPages() {
  const parent = tabsRef.value
  if (!parent)
    return []
  const ps = [] as Page[]
  const w = parent.offsetWidth

  let left = 0
  let right = 0
  let startEl = 0
  let endEl = 0

  let len = 0
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i] as HTMLElement
    const newLeft = child!.offsetLeft
    const newRight = newLeft + child!.offsetWidth
    if (newRight > (len + 1) * w) {
      ps.push({ left, right, startEl, endEl })
      left = newLeft
      startEl = i
      len++
    }

    right = newRight
    endEl = i
  }

  if (ps[ps.length - 1]?.left !== left)
    ps.push({ left, right: parent.scrollWidth, startEl, endEl })

  pages.value = ps
}

// 确保最后一页有足够的空间
function resetPadding() {
  const el = tabsRef.value
  if (!el)
    return
  el.style.paddingRight = '0'
  const ps = pages.value
  const lastLeft = ps[ps.length - 1]!.left!
  const extra = lastLeft % el.offsetWidth
  if (extra > 0)
    el.style.paddingRight = `${extra}px`
}

function anchorLeft() {
  const parent = tabsRef.value
  if (!parent)
    return
  parent.scrollTo({
    left: pages.value[currentPage.value]!.left!,
    behavior: 'smooth',
  })
}

function prevPage() {
  if (currentPage.value <= 0)
    return
  currentPage.value--
  anchorLeft()
}

function nextPage() {
  if (currentPage.value >= pages.value.length - 1)
    return
  currentPage.value++
  anchorLeft()
}

// function toPage(idx: number) {
//   currentPage.value = idx
//   anchorLeft()
// }

function reset() {
  resetPages()
  resetPadding()
  currentPage.value = 0
  anchorLeft()
}

tryOnMounted(reset, false)
useEventListener('resize', reset)

// 鼠标
function handleWheel(e: WheelEvent) {
  const delta = e.deltaY
  if (delta === 0)
    return

  delta > 0 ? nextPage() : prevPage()
}
</script>

<template>
  <MotionLayoutGroup>
    <div class="group ui-tabs relative">
      <!-- js 控制 padding, 勿设置 -->
      <div
        ref="tabsRef"
        class="scrollbar-none transition-[mask-image] relative max-w-full flex flex-1 gap-2 overflow-x-auto text-nowrap"
        :class="{
          'mask-r-from': currentPage !== pages.length - 1,
        }"
        @wheel.stop.prevent="handleWheel"
      >
        <button
          v-for="(item, idx) in items"
          :key="item.id"
          class="relative flex items-center gap-2 px-3 py-1.5 text-sm"
          @click="handleSelect(item)"
        >
          <Motion
            v-if="isSelected(item)"
            layout-id="ui-active-tab"
            :transition="{ type: !(idx % (items.length - 1)) ? '' : 'spring', stiffness: 200, damping: 20 }"
            class="absolute inset-0 rounded-lg -z-1 bg-ctx-text"
          />
          <div
            class="flex items-center gap-2 transition-colors duration-300"
            :class="isSelected(item) ? 'text-ctx-bg' : 'text-neutral hover:ctx-text'"
          >
            <span v-if="item.icon" :class="item.icon" />
            <span>{{ item.title }}</span>
            <span v-if="item.badge !== undefined" class="text-xs opacity-60">({{ item.badge }})</span>
          </div>
        </button>
      </div>
    </div>
  </MotionLayoutGroup>
</template>

<style scoped>
.ui-tabs {
  --ui-tabs-mask-size: 5rem;
}

.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: all 0.3s linear;
}
.mask-r-from {
  mask-image: linear-gradient(to left, transparent, black var(--ui-tabs-mask-size));
}

/* .mask-l-from {
  mask-image: linear-gradient(to right, transparent, black var(--ui-tabs-mask-size), black 100%);
} */

/* .mask-lr-from {
  mask-image: linear-gradient(
    to right,
    transparent,
    black var(--ui-tabs-mask-size),
    black calc(100% - var(--ui-tabs-mask-size)),
    transparent 100%
  );
} */
</style>

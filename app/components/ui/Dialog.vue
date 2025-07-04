<script setup lang="ts">
export interface DialogProps {
  /**
   * 对话框标题
   */
  title?: string
  /**
   * 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * 点击遮罩层是否关闭
   */
  closeOnOverlay?: boolean
  /**
   * 对话框宽度
   */
  width?: string
  /**
   * 是否显示遮罩层
   */
  showOverlay?: boolean
  /**
   * 是否支持拖拽移动
   */
  draggable?: boolean
}

const {
  title = '',
  showClose = true,
  closeOnOverlay = true,
  width = 'max-w-md',
  showOverlay = true,
  draggable = false, // 默认关闭拖拽
} = defineProps<DialogProps>()

const emit = defineEmits<{
  close: []
}>()

// 使用 defineModel 进行双向绑定
const isOpen = defineModel<boolean>('modelValue', { default: false })

const dialogRef = ref<HTMLElement>()
const isDragging = ref(false)
const dragStartPos = ref({ x: 0, y: 0 })
const dialogStartPos = ref({ x: 0, y: 0 })
const currentPos = ref({ x: 0, y: 0 })

// 重置对话框位置
function resetPosition() {
  currentPos.value = { x: 0, y: 0 }
}

// 开始拖拽
function startDrag(event: MouseEvent) {
  if (!draggable || !dialogRef.value)
    return

  // 阻止事件冒泡和默认行为
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()

  // 设置拖拽状态
  isDragging.value = true

  // 记录鼠标起始位置
  dragStartPos.value = {
    x: event.clientX,
    y: event.clientY,
  }

  // 记录对话框起始位置
  dialogStartPos.value = {
    x: currentPos.value.x,
    y: currentPos.value.y,
  }

  // 添加全局事件监听
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)

  // 添加拖拽样式
  if (dialogRef.value) {
    dialogRef.value.style.userSelect = 'none'
  }
}

// 拖拽中
function onDrag(event: MouseEvent) {
  if (!isDragging.value || !dialogRef.value)
    return

  // 计算鼠标移动距离
  const deltaX = event.clientX - dragStartPos.value.x
  const deltaY = event.clientY - dragStartPos.value.y

  // 计算新位置
  const newX = dialogStartPos.value.x + deltaX
  const newY = dialogStartPos.value.y + deltaY

  // 限制对话框不超出视窗边界
  const dialogWidth = dialogRef.value.offsetWidth
  const dialogHeight = dialogRef.value.offsetHeight

  // 容器padding
  const containerPadding = 16 // p-4 = 16px

  // 计算边界限制
  // 对话框使用绝对定位，top: 50%, left: 50%，transform: translate(-50%, -50%)
  // 所以初始位置在容器中心，需要计算相对于中心的偏移
  const maxOffsetX = (window.innerWidth - dialogWidth) / 2 - containerPadding
  const maxOffsetY = (window.innerHeight - dialogHeight) / 2 - containerPadding

  // 应用边界限制
  const clampedX = Math.max(-maxOffsetX, Math.min(newX, maxOffsetX))
  const clampedY = Math.max(-maxOffsetY, Math.min(newY, maxOffsetY))

  currentPos.value = {
    x: clampedX,
    y: clampedY,
  }
}

// 停止拖拽
function stopDrag(_event: MouseEvent) {
  if (!isDragging.value)
    return

  // 移除全局事件监听
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)

  // 恢复样式
  if (dialogRef.value) {
    dialogRef.value.style.userSelect = ''
  }

  // 延迟重置拖拽状态，确保事件处理顺序正确
  nextTick(() => {
    isDragging.value = false
  })
}

function close() {
  // 如果正在拖拽，不要关闭对话框
  if (isDragging.value)
    return

  isOpen.value = false
  emit('close')
  resetPosition()
}

function handleOverlayClick() {
  // 如果正在拖拽，不要关闭对话框
  if (isDragging.value)
    return

  if (closeOnOverlay) {
    close()
  }
}

// 暴露方法供函数式调用使用
defineExpose({
  open: () => { isOpen.value = true },
  close,
})

// 键盘事件处理
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

// 监听对话框显示状态
watch(isOpen, (visible) => {
  if (visible) {
    resetPosition()
    nextTick(() => {
      if (import.meta.client) {
        document.addEventListener('keydown', handleKeydown)
      }
    })
  }
  else {
    if (import.meta.client) {
      document.removeEventListener('keydown', handleKeydown)
    }
  }
})

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  }
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 p-4"
          :class="draggable ? 'block' : 'flex items-center justify-center'"
          @click="handleOverlayClick"
        >
          <!-- 遮罩层 - 使用渐变效果 -->
          <div
            v-if="showOverlay"
            class="absolute inset-0 from-black/20 via-black/15 to-black/10 bg-gradient-to-br"
          />

          <!-- 对话框 -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div
              v-if="isOpen"
              ref="dialogRef"
              class="relative max-h-[90vh] w-full flex flex-col overflow-hidden rounded-xl shadow-2xl ring-1 ring-neutral/10 backdrop-blur-sm bg-ctx-bg/95"
              :class="[
                width,
                isDragging ? 'cursor-grabbing' : 'cursor-default',
              ]"
              style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);"
              :style="{
                position: draggable ? 'absolute' : 'relative',
                top: draggable ? '50%' : undefined,
                left: draggable ? '50%' : undefined,
                transform: draggable
                  ? `translate(calc(-50% + ${currentPos.x}px), calc(-50% + ${currentPos.y}px))`
                  : undefined,
              }"
              @click.stop
              @mousedown.stop
            >
              <!-- 标题栏 -->
              <div
                v-if="title || showClose"
                class="flex items-center justify-between border-b border-neutral/10 px-6 py-4"
                :class="draggable ? 'cursor-grab active:cursor-grabbing' : ''"
                @mousedown="startDrag"
                @click.stop
              >
                <h2 v-if="title" class="text-lg font-medium text-ctx-text">
                  {{ title }}
                </h2>
                <div v-else />

                <button
                  v-if="showClose"
                  class="h-8 w-8 flex-center rounded-lg text-neutral/60 transition-colors duration-200 hover:bg-neutral/10 hover:text-ctx-text"
                  @click="close"
                >
                  <span class="i-carbon:close text-lg" />
                </button>
              </div>

              <!-- 内容区域 -->
              <div class="flex-1 overflow-y-auto px-6 py-4">
                <slot />
              </div>

              <!-- 底部操作区域 -->
              <div v-if="$slots.footer" class="flex items-center justify-end gap-3 border-t border-neutral/10 px-6 py-4">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

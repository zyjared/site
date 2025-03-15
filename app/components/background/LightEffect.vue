<script setup lang="ts">
interface Props {
  /** 是否启用动画 */
  animated?: boolean
  /** 点的数量 */
  pointCount?: number
  /** 动画速度 */
  speed?: number
  /** 颜色透明度 */
  opacity?: number
  /** 每秒帧数 */
  fps?: number
}

const {
  animated = true,
  pointCount = 6,
  speed = 0.15,
  opacity = 0.3,
  fps = 30,
} = defineProps<Props>()

// 存储控制点
const points = ref<Array<{
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
  size: number
}>>([])

// Canvas 相关声明
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = computed(() => canvas.value?.getContext('2d'))
let animationId: number
let lastTime = 0
const frameInterval = computed(() => 1000 / fps)

// 更新为更加沉稳的配色
const colors = [
  'rgb(56, 189, 248)', // 天蓝色
  'rgb(34, 211, 238)', // 青色
  'rgb(45, 212, 191)', // 蓝绿色
  'rgb(74, 222, 128)', // 翠绿色
]

function getSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function setCanvasSize() {
  if (!ctx.value)
    return
  const { width, height } = getSize()
  canvas.value!.width = width
  canvas.value!.height = height
  initPoints()
}

function initPoints() {
  const { width, height } = getSize()
  points.value = []

  for (let i = 0; i < pointCount; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    points.value.push({
      x,
      y,
      targetX: x,
      targetY: y,
      color: colors[i % colors.length] as string,
      size: Math.random() * 80 + 120, // 调整大小范围
    })
  }
}

function createBackground(ctx: CanvasRenderingContext2D) {
  const { width, height } = getSize()

  ctx.clearRect(0, 0, width, height)

  // 更新点的位置
  for (const point of points.value) {
    // 降低位置更新频率
    if (Math.random() < 0.001) {
      point.targetX = Math.random() * width
      point.targetY = Math.random() * height
    }

    // 使用 speed 参数控制移动速度
    point.x += (point.targetX - point.x) * (0.015 * speed)
    point.y += (point.targetY - point.y) * (0.015 * speed)

    // 创建渐变
    const gradient = ctx.createRadialGradient(
      point.x,
      point.y,
      0,
      point.x,
      point.y,
      point.size,
    )
    gradient.addColorStop(0, `${point.color.slice(0, -1)}, ${opacity})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(
      point.x - point.size,
      point.y - point.size,
      point.size * 2,
      point.size * 2,
    )
  }
}

function animate(currentTime: number) {
  if (!lastTime)
    lastTime = currentTime

  const deltaTime = currentTime - lastTime

  if (deltaTime >= frameInterval.value) {
    createBackground(ctx.value!)
    lastTime = currentTime - (deltaTime % frameInterval.value)
  }

  animationId = requestAnimationFrame(animate)
}

// 添加窗口大小变化的防抖处理
const debouncedResize = useDebounceFn(() => {
  setCanvasSize()
  if (!animated)
    createBackground(ctx.value!)
}, 500)

onMounted(() => {
  if (!canvas.value)
    return

  setCanvasSize()

  if (animated) {
    animationId = requestAnimationFrame(animate)
    window.addEventListener('resize', debouncedResize)
  }
  else {
    createBackground(ctx.value!)
  }
})

onUnmounted(() => {
  if (animationId)
    cancelAnimationFrame(animationId)
  window.removeEventListener('resize', debouncedResize)
})
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none fixed inset-0 -z-1" />
</template>

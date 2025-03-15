<script setup lang="ts">
interface Props {
  /** 是否启用动画 */
  animated?: boolean
  /** 网格大小 */
  gridSize?: number
  /** 波动幅度 */
  waveAmplitude?: number
  /** 波动速度 */
  waveSpeed?: number
  /** 呼吸效果强度 */
  breathIntensity?: number
  /** 点的基础大小 */
  dotSize?: number
  /** 点的填充颜色 */
  dotFillColor?: string
  /** 每秒帧数 */
  fps?: number
}

const {
  animated = false,
  gridSize = 40,
  waveAmplitude = 15,
  waveSpeed = 0.5,
  breathIntensity = 0.3,
  dotSize = 1,
  dotFillColor = 'rgba(128, 128, 128, 0.5)',
  fps = 30,
} = defineProps<Props>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const ctx = computed(() => canvas.value?.getContext('2d'))
const { width, height } = useWindowSize()
let animationId: number
let lastTime = 0
const frameInterval = computed(() => 1000 / fps)

const dotRow = computed(() => Math.ceil(height.value / gridSize))
const dotCol = computed(() => Math.ceil(width.value / gridSize))
const dotTotal = computed(() => dotRow.value * dotCol.value)

function calcOffset(time: number) {
  return Math.sin(time) * waveAmplitude
}

function getPoint(num: number) {
  const row = Math.floor(num / dotCol.value)
  const col = num % dotCol.value
  return {
    x: col * gridSize + gridSize / 2,
    y: row * gridSize + gridSize / 2,
  }
}

function reset() {
  canvas.value!.width = width.value
  canvas.value!.height = height.value
}

function plotDot(ctx: CanvasRenderingContext2D, opts: Record<'num' | 'width' | 'height' | 'offset' | 'time', number>) {
  const { offset, time, width, height, num } = opts
  const point = getPoint(num)
  const distanceToCenter = Math.sqrt(
    (point.x - width / 2) ** 2 + (point.y - height / 2) ** 2,
  )
  const scale = 1 - (distanceToCenter / (width + height)) * 0.5
  const breathEffect = Math.sin(time * 1.5 + (point.x + point.y) * 0.015) * breathIntensity + 0.7

  const x = point.x + Math.sin(time + point.y * 0.008) * offset
  const y = point.y + Math.cos(time + point.x * 0.008) * offset
  const size = dotSize * scale * breathEffect

  ctx.beginPath()
  ctx.fillStyle = dotFillColor
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fill()
}

function plot(ctx: CanvasRenderingContext2D, currentTime: number) {
  const w = width.value
  const h = height.value
  const time = currentTime * waveSpeed / 1000

  ctx.clearRect(0, 0, w, h)

  ctx.fillStyle = dotFillColor
  const offset = calcOffset(time)

  let num = dotTotal.value
  while (num > 0) {
    num--
    plotDot(ctx, { num, offset, time, width: w, height: h })
  }
}

function animate(currentTime: number) {
  if (!lastTime)
    lastTime = currentTime

  const deltaTime = currentTime - lastTime
  if (deltaTime >= frameInterval.value) {
    plot(ctx.value!, currentTime)
    lastTime = currentTime - (deltaTime % frameInterval.value)
  }

  animationId = requestAnimationFrame(animate)
}

function plotStatic(ctx: CanvasRenderingContext2D) {
  const w = width.value
  const h = height.value
  const time = performance.now()
  const offset = calcOffset(time)
  const center = { x: w / 2, y: h / 2 }

  interface DotInfo {
    index: number
    distance: number
  }

  const sortedDots: DotInfo[] = Array.from({ length: dotTotal.value }, (_, i) => {
    const point = getPoint(i)
    const distance = Math.sqrt(
      (point.x - center.x) ** 2 + (point.y - center.y) ** 2,
    )
    return { index: i, distance }
  }).sort((a, b) => a.distance - b.distance)

  function renderNext() {
    if (!sortedDots.length)
      return

    let count = 3
    let cur: DotInfo | undefined
    // eslint-disable-next-line no-cond-assign
    while ((count--) && (cur = sortedDots.shift())) {
      plotDot(ctx, {
        num: cur.index,
        offset,
        time,
        width: w,
        height: h,
      })
    }

    requestAnimationFrame(renderNext)
  }

  renderNext()
}

function run() {
  if (!canvas.value)
    return

  reset()

  if (animated) {
    animationId = requestAnimationFrame(animate)
  }
  else {
    plotStatic(ctx.value!)
  }
}

useEventListener('resize', useDebounceFn(run, 300))

onMounted(run)
onUnmounted(() => {
  if (animationId)
    cancelAnimationFrame(animationId)
})
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none fixed inset-0 -z-1" />
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

const points: Point[] = []
const lines: { start: Point; end: Point; progress: number }[] = []

function createPoint(): Point {
  return {
    x: Math.random() * canvas.value!.width,
    y: Math.random() * canvas.value!.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.3 + 0.1
  }
}

function initPoints() {
  for (let i = 0; i < 15; i++) {
    points.push(createPoint())
  }
}

function connectPoints() {
  if (lines.length > 50) return
  const p1 = points[Math.floor(Math.random() * points.length)]
  const p2 = points[Math.floor(Math.random() * points.length)]
  if (p1 !== p2) {
    lines.push({ start: p1, end: p2, progress: 0 })
  }
}

function animate() {
  const length = lines.length
  if (!ctx.value || !canvas.value) return

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // 更新点的位置
  points.forEach(point => {
    point.x += point.vx
    point.y += point.vy

    if (point.x < 0 || point.x > canvas.value!.width) point.vx *= -1
    if (point.y < 0 || point.y > canvas.value!.height) point.vy *= -1
  })

  // 绘制和更新线条
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i]
    line.progress += 0.005

    if (line.progress >= 1) {
      lines.splice(i, 1)
      continue
    }

    const progress = easeInOutCubic(line.progress)
    const x = line.start.x + (line.end.x - line.start.x) * progress
    const y = line.start.y + (line.end.y - line.start.y) * progress

    ctx.value.beginPath()
    ctx.value.moveTo(line.start.x, line.start.y)
    ctx.value.lineTo(x, y)
    const opacity = (1 - Math.abs(progress - 0.5) * 2) * 0.5
    ctx.value.strokeStyle = `rgba(115, 115, 115, ${opacity})`
    ctx.value.lineWidth = 1
    ctx.value.stroke()
  }

  // 随机添加新线条
  if (Math.random() < 0.5) {
    connectPoints()
  }

  requestAnimationFrame(animate)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  initPoints()
}

onMounted(() => {
  if (!canvas.value) return
  ctx.value = canvas.value.getContext('2d')!
  resize()
  window.addEventListener('resize', resize)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="canvas" class="fixed inset-0 -z-1 pointer-events-none" />
</template>
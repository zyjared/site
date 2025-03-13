<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

interface Circle {
  x: number
  y: number
  radius: number
  opacity: number
}

const circles: Circle[] = []
const maxRadius = 1000
const maxCircles = 70

function pushRandomCircles() {
    if (Math.random() < 0.5) return
    const count = Math.floor(Math.random() * 2)
    for (let i = 0; i < count; i++) {
        circles.push({
            x: Math.random() * canvas.value!.width,
            y: Math.random() * canvas.value!.height,
            radius: 0,
            opacity: 1
        })
    }
}

function clearCircles() {
    for (let i = circles.length - 1; i >= 0; i--) {
        const circle = circles[i]
        if (circle.radius > maxRadius || circle.opacity <= 0) {
            circles.splice(i, 1)
        } else {
            circle.radius += 0.3
            circle.opacity -= 0.002
        }
    }
}

function plotCircles(ctx: CanvasRenderingContext2D) {
    for (const circle of circles) {
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(115, 115, 115, ${circle.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
    }
}

function animate() {
    
    if (!ctx.value || !canvas.value) return
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

    clearCircles()
    pushRandomCircles()
    plotCircles(ctx.value)

    if (circles.length > maxCircles) {
      return
    } 

    requestAnimationFrame(animate)
    
}

function resize() {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
}

onMounted(() => {
  if (!canvas.value) return
  ctx.value = canvas.value.getContext('2d')!
  const resize = () => {
    canvas.value!.width = window.innerWidth
    canvas.value!.height = window.innerHeight
  }
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
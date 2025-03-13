<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  shape: 'circle' | 'square' | 'triangle' | 'star'
  rotation: number
}

const maxParticles = 70
const particles: Particle[] = []
const colors = [
  '#2563eb',
  '#7c3aed',
  '#f43f5e',
  '#84cc16',
  '#f97316',
  '#e11d48',
  '#14b8a6',
  '#f59e0b',
  '#3b82f6',
  '#10b981',
]

function createParticle(): Particle {
  const shapes = ['circle', 'square', 'triangle', 'star']
  return {
    x: Math.random() * canvas.value!.width,
    y: Math.random() * canvas.value!.height,
    size: Math.random() * 30 + 10,
    speedX: (Math.random() - 0.5),
    speedY: (Math.random() - 0.5),
    opacity: Math.random() * 0.3 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)] as any,
    rotation: Math.random() * Math.PI * 2,
  }
}

function drawSquare(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.rect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
}

function drawTriangle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.beginPath()
  ctx.moveTo(0, -particle.size / 2)
  ctx.lineTo(particle.size / 2, particle.size / 2)
  ctx.lineTo(-particle.size / 2, particle.size / 2)
  ctx.closePath()
}

function drawStar(ctx: CanvasRenderingContext2D, particle: Particle) {
  const spikes = 5
  const outerRadius = particle.size / 2
  const innerRadius = particle.size / 4
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i * Math.PI) / spikes
    if (i === 0)
      ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
    else ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
  }
  ctx.closePath()
}

function drawCircle(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.beginPath()
  ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
}

function drawShape(ctx: CanvasRenderingContext2D, particle: Particle) {
  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)

  switch (particle.shape) {
    case 'square':
      drawSquare(ctx, particle)
      break
    case 'triangle':
      drawTriangle(ctx, particle)
      break
    case 'star':
      drawStar(ctx, particle)
      break
    default:
      drawCircle(ctx, particle)
      break
  }

  ctx.restore()
}

function drawParticles(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.x += particle.speedX
    particle.y += particle.speedY
    particle.rotation += 0.01 // 添加旋转动画

    if (particle.x < 0 || particle.x > canvas.width)
      particle.speedX *= -1
    if (particle.y < 0 || particle.y > canvas!.height)
      particle.speedY *= -1

    ctx.beginPath()
    ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
    drawShape(ctx, particle)
    ctx.fill()
  })
}

function animate() {
  if (!ctx.value || !canvas.value)
    return

  const ani = () => {
    drawParticles(canvas.value!, ctx.value!)
    requestAnimationFrame(ani)
  }

  ani()
}

function initParticles() {
  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle())
  }
}

function resize() {
  if (!canvas.value)
    return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  particles.length = 0
  initParticles()
}

onMounted(() => {
  if (!canvas.value)
    return
  ctx.value = canvas.value.getContext('2d')!
  resize()
  animate()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="canvas" class="fixed inset-0 -z-1 pointer-events-none" />
</template>

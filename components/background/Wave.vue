<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

onMounted(() => {
  if (!canvas.value) return
  ctx.value = canvas.value.getContext('2d')!

  const resize = () => {
    canvas.value!.width = window.innerWidth
    canvas.value!.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  let offset = 0
  const animate = () => {
    if (!ctx.value || !canvas.value) return
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

    const height = canvas.value.height
    const width = canvas.value.width

    ctx.value.beginPath()
    ctx.value.moveTo(0, height)

    // 绘制三个重叠的正弦波
    for (let i = 0; i <= width; i++) {
      const y = Math.sin(i * 0.003 + offset) * 15 +
                Math.sin(i * 0.002 + offset * 0.8) * 15 +
                Math.sin(i * 0.001 + offset * 1.2) * 10
      ctx.value.lineTo(i, height - 50 + y)
    }

    ctx.value.lineTo(width, height)
    ctx.value.fillStyle = 'rgba(115, 115, 115, 0.03)'
    ctx.value.fill()

    offset += 0.005
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <canvas ref="canvas" class="fixed inset-0 -z-1 pointer-events-none" />
</template>
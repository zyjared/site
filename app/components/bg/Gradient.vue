<script setup lang="ts">
interface Props {
  gradientStops?: { color: string, offset: number }[]
}

const {
  gradientStops = [
    { color: 'rgba(59, 130, 246, 0.01)', offset: 0 },
    { color: 'rgba(139, 92, 246, 0.02)', offset: 0.3 },
    { color: 'rgba(168, 85, 247, 0.03)', offset: 0.6 },
    { color: 'rgba(236, 72, 153, 0.03)', offset: 1 },
  ],
} = defineProps<Props>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const ctx = computed(() => canvas.value?.getContext('2d'))
const { width, height } = useWindowSize()

function plotGradient() {
  if (!ctx.value)
    return

  canvas.value!.width = width.value
  canvas.value!.height = height.value
  const c = ctx.value
  const gradient = c.createLinearGradient(0, 0, width.value, height.value)
  for (const stop of gradientStops) {
    gradient.addColorStop(stop.offset, stop.color)
  }
  c.fillStyle = gradient
  c.fillRect(0, 0, width.value, height.value)
}

onMounted(plotGradient)
useEventListener('resize', useDebounceFn(plotGradient, 300))
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none fixed inset-0 -z-1" />
</template>

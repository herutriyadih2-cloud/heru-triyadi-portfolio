<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Cahaya biru yang mengikuti kursor (desktop saja)
const dot = ref(null)
const glow = ref(null)
const enabled =
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

let mx = 0, my = 0, gx = 0, gy = 0, raf = null

const onMove = (e) => {
  mx = e.clientX
  my = e.clientY
  if (dot.value) dot.value.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
}

const loop = () => {
  gx += (mx - gx) * 0.14
  gy += (my - gy) * 0.14
  if (glow.value) glow.value.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (!enabled) return
  window.addEventListener('mousemove', onMove, { passive: true })
  loop()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <div v-if="enabled" class="cursor-layer" aria-hidden="true">
    <div ref="glow" class="cursor-glow"></div>
    <div ref="dot" class="cursor-dot"></div>
  </div>
</template>

<style scoped>
.cursor-layer {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
}
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.12), rgba(37, 99, 235, 0.06) 40%, transparent 70%);
  will-change: transform;
}
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7dd3fc;
  box-shadow: 0 0 10px 2px rgba(56, 189, 248, 0.8);
  will-change: transform;
}
</style>

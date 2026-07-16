<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Persentase progres scroll halaman (0–100)
const progress = ref(0)

const onScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight
  progress.value = height > 0 ? (scrollTop / height) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-[3px] z-[60] pointer-events-none">
    <div
      class="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-[width] duration-75 ease-out"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>

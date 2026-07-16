<script setup>
import { onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import FloatingBackground from './components/layout/FloatingBackground.vue'
import ScrollToTop from './components/layout/ScrollToTop.vue'
import ScrollProgress from './components/layout/ScrollProgress.vue'
import CursorGlow from './components/layout/CursorGlow.vue'
import { initMagnetic } from './utils/magnetic.js'

import AOS from 'aos'
import 'aos/dist/aos.css'

const route = useRoute()

onMounted(() => {
  nextTick(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-in-out-sine',
      offset: 100,
    })
    AOS.refresh()
  })
  initMagnetic()
})

// Segarkan animasi AOS setiap ganti halaman
watch(
  () => route.fullPath,
  () => {
    nextTick(() => AOS.refreshHard())
  }
)
</script>

<template>
  <div class="relative min-h-screen bg-[#0a0b0b] text-slate-100 font-sans antialiased overflow-x-hidden">

    <ScrollProgress />
    <CursorGlow />
    <FloatingBackground />

    <div class="relative z-10">
      <Navbar />

      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>

      <Footer />
    </div>

    <ScrollToTop />
  </div>
</template>

<style>
/* Transisi halus antar halaman */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>

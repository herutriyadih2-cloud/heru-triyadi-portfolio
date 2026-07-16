<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import GlobeCanvas from '../layout/GlobeCanvas.vue'
import OrbitRings from '../layout/OrbitRings.vue'

// Teks profesi yang berganti-ganti dengan efek mengetik
const roles = [
  'Frontend Developer',
  'Vue.js Enthusiast',
  'UI/UX Designer',
  'Web Performance Nerd',
]
const typed = ref('')
let roleIndex = 0
let charIndex = 0
let deleting = false
let timer = null

const tick = () => {
  const current = roles[roleIndex]
  if (!deleting) {
    typed.value = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) {
      deleting = true
      timer = setTimeout(tick, 1600) // jeda saat kata penuh
      return
    }
  } else {
    typed.value = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      deleting = false
      roleIndex = (roleIndex + 1) % roles.length
    }
  }
  timer = setTimeout(tick, deleting ? 45 : 90)
}

// Statistik ringkas — target angka + suffix untuk animasi count-up
const stats = reactive([
  { target: 2, suffix: '+', display: 0, label: 'Tahun Pengalaman' },
  { target: 15, suffix: '+', display: 0, label: 'Proyek Selesai' },
  { target: 100, suffix: '%', display: 0, label: 'Klien Puas' },
])

const statsEl = ref(null)
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Parallax lembut globe/orbit mengikuti kursor (desktop)
const px = ref(0)
const py = ref(0)
const finePointer =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !prefersReduced
const onParallax = (e) => {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  px.value = ((e.clientX - cx) / cx) * 16
  py.value = ((e.clientY - cy) / cy) * 16
}

// Animasi angka naik dari 0 ke target (easing ease-out)
const runCountUp = () => {
  if (prefersReduced) {
    stats.forEach((s) => (s.display = s.target))
    return
  }
  const duration = 1400
  const start = performance.now()
  const frame = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    stats.forEach((s) => (s.display = Math.round(s.target * eased)))
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

onMounted(() => {
  timer = setTimeout(tick, 400)

  // Jalankan count-up saat blok statistik masuk viewport
  if ('IntersectionObserver' in window && statsEl.value) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runCountUp()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(statsEl.value)
  } else {
    runCountUp()
  }

  if (finePointer) window.addEventListener('mousemove', onParallax, { passive: true })
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  window.removeEventListener('mousemove', onParallax)
})
</script>

<template>
  <section id="home" class="min-h-screen flex items-center justify-center pt-20 pb-12 px-6 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Cincin orbit + globe titik-titik berputar (canvas) -->
    <div
      class="pointer-events-none absolute left-1/2 top-[60%] w-[min(1000px,135vw)] aspect-square z-0"
      :style="{ transform: `translate(-50%,-50%) translate(${px * 0.6}px, ${py * 0.6}px)` }"
    >
      <OrbitRings />
    </div>
    <div
      class="pointer-events-none absolute left-1/2 top-[60%] w-[min(720px,100vw)] aspect-square z-0 opacity-50"
      :style="{ transform: `translate(-50%,-50%) translate(${px}px, ${py}px)` }"
    >
      <GlobeCanvas />
    </div>

    <div class="text-center max-w-4xl relative z-10">
      <div class="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 text-slate-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide animate-pulse">
        <span>✨ Terbuka untuk Project & Kolaborasi</span>
      </div>

      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 leading-tight">
        Hai, Saya <span class="text-shimmer bg-gradient-to-r from-slate-400 via-white to-slate-400 bg-[length:200%_auto] bg-clip-text text-transparent">Heru Triyadi</span>
      </h1>

      <p class="text-lg sm:text-xl text-slate-300 mb-4 font-medium tracking-wide min-h-[1.75rem]">
        <span class="typed-caret pr-1 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">{{ typed }}</span>
      </p>

      <p class="text-slate-400 max-w-xl mx-auto mb-7 leading-relaxed text-sm sm:text-base">
        Sangat menyukai dunia digital dan berdedikasi mentransformasikan ide-ide kreatif menjadi baris kode yang indah, responsif, serta interaktif guna memberikan pengalaman pengguna terbaik.
      </p>

      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a href="#projects" class="btn-neon w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 text-center">
          Lihat Layanan & Proyek
        </a>
        <a href="#contact" class="w-full sm:w-auto border border-slate-700 hover:border-blue-400 bg-slate-900/40 text-slate-300 px-8 py-3 rounded-xl font-semibold backdrop-blur-sm transition-colors text-center">
          Hubungi Saya
        </a>
      </div>

      <!-- Statistik -->
      <div ref="statsEl" class="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent tabular-nums">
            {{ stat.display }}{{ stat.suffix }}
          </div>
          <div class="text-[11px] sm:text-xs text-slate-500 mt-1 tracking-wide uppercase">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

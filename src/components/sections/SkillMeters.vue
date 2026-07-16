<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

/* Keahlian teknis (progress bar) & profesional (lingkaran persentase).
   Keduanya beranimasi saat blok masuk viewport. */

const technical = [
  { name: 'HTML5 & CSS3', pct: 95 },
  { name: 'JavaScript / TypeScript', pct: 88 },
  { name: 'Vue.js & Nuxt', pct: 92 },
  { name: 'Tailwind CSS', pct: 94 },
  { name: 'UI/UX & Figma', pct: 85 },
]

const professional = reactive([
  { name: 'Creativity', pct: 90, cur: 0 },
  { name: 'Communication', pct: 85, cur: 0 },
  { name: 'Problem Solving', pct: 88, cur: 0 },
  { name: 'Teamwork', pct: 92, cur: 0 },
])

const R = 52
const CIRC = 2 * Math.PI * R
const started = ref(false)
const rootEl = ref(null)

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Offset lingkaran: penuh (CIRC) saat belum mulai, mengecil saat animasi
const dashOffset = (p) => CIRC * (1 - (started.value ? p : 0) / 100)

const animateNumbers = () => {
  if (prefersReduced) {
    professional.forEach((s) => (s.cur = s.pct))
    return
  }
  const dur = 1500
  const t0 = performance.now()
  const frame = (now) => {
    const p = Math.min((now - t0) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    professional.forEach((s) => (s.cur = Math.round(s.pct * eased)))
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

let io = null
onMounted(() => {
  if ('IntersectionObserver' in window && rootEl.value) {
    io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          started.value = true
          animateNumbers()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(rootEl.value)
  } else {
    started.value = true
    animateNumbers()
  }
})
onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <div ref="rootEl" class="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
    <!-- Keahlian Teknis: progress bar -->
    <div>
      <h3 class="text-lg font-bold text-slate-100 mb-8 inline-block border-b-2 border-blue-400 pb-2">
        Keahlian Teknis
      </h3>
      <div class="space-y-6">
        <div v-for="skill in technical" :key="skill.name">
          <div class="flex justify-between mb-2">
            <span class="text-sm font-medium text-slate-300">{{ skill.name }}</span>
            <span class="text-sm font-semibold text-slate-300 tabular-nums">{{ skill.pct }}%</span>
          </div>
          <div class="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              class="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-[width] duration-1000 ease-out"
              :style="{ width: (started ? skill.pct : 0) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Keahlian Profesional: lingkaran persentase -->
    <div>
      <h3 class="text-lg font-bold text-slate-100 mb-8 inline-block border-b-2 border-blue-400 pb-2">
        Keahlian Profesional
      </h3>
      <div class="grid grid-cols-2 gap-8 justify-items-center">
        <div v-for="skill in professional" :key="skill.name" class="flex flex-col items-center">
          <div class="relative w-32 h-32">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" :r="R" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8" />
              <circle
                cx="60" cy="60" :r="R" fill="none" stroke="url(#goldGrad)" stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="CIRC"
                :stroke-dashoffset="dashOffset(skill.pct)"
                class="transition-[stroke-dashoffset] duration-1000 ease-out"
                style="filter: drop-shadow(0 0 6px rgba(56,189,248,0.18))"
              />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#7dd3fc" />
                  <stop offset="1" stop-color="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-extrabold text-slate-100 tabular-nums">{{ skill.cur }}%</span>
            </div>
          </div>
          <span class="mt-3 text-sm font-medium text-slate-400">{{ skill.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

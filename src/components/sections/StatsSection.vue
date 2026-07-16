<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { FolderCheck, Users, CalendarClock, Layers } from 'lucide-vue-next'

// Data statistik / pencapaian
const stats = reactive([
  { icon: FolderCheck, target: 15, suffix: '+', display: 0, label: 'Proyek Selesai' },
  { icon: Users, target: 12, suffix: '+', display: 0, label: 'Klien Puas' },
  { icon: CalendarClock, target: 2, suffix: '+', display: 0, label: 'Tahun Pengalaman' },
  { icon: Layers, target: 14, suffix: '', display: 0, label: 'Teknologi Dikuasai' },
])

// Data diagram — Proyek per Tahun (bar vertikal)
const byYear = [
  { year: '2022', val: 2 },
  { year: '2023', val: 4 },
  { year: '2024', val: 6 },
  { year: '2025', val: 3 },
]
const maxYear = Math.max(...byYear.map((d) => d.val))

// Data diagram — Distribusi Jenis Proyek (bar horizontal)
const byType = [
  { name: 'Website', val: 6 },
  { name: 'Web App', val: 4 },
  { name: 'SEO', val: 3 },
  { name: 'UI/UX Design', val: 2 },
]
const maxType = Math.max(...byType.map((d) => d.val))

const started = ref(false)
const rootEl = ref(null)
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const runCountUp = () => {
  if (prefersReduced) {
    stats.forEach((s) => (s.display = s.target))
    return
  }
  const dur = 1600
  const t0 = performance.now()
  const frame = (now) => {
    const p = Math.min((now - t0) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    stats.forEach((s) => (s.display = Math.round(s.target * eased)))
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
          runCountUp()
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(rootEl.value)
  } else {
    runCountUp()
  }
})
onBeforeUnmount(() => io && io.disconnect())
</script>

<template>
  <section id="stats" class="py-20 relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div ref="rootEl" class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-md hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/20"
        >
          <div class="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-blue-500/10 text-slate-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-300">
            <component :is="stat.icon" class="w-7 h-7" />
          </div>
          <div class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-100 via-white to-slate-300 bg-clip-text text-transparent tabular-nums">
            {{ stat.display }}{{ stat.suffix }}
          </div>
          <div class="text-[11px] sm:text-xs text-slate-400 mt-2 tracking-wide uppercase font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Diagram statistik -->
      <div class="grid md:grid-cols-2 gap-6 mt-8">
        <!-- Bar vertikal: Proyek per Tahun -->
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <h3 class="text-sm font-bold text-slate-200 mb-1">Proyek per Tahun</h3>
          <p class="text-xs text-slate-500 mb-8">Jumlah proyek yang diselesaikan tiap tahun</p>

          <div class="relative h-52 flex items-end justify-between gap-4 sm:gap-6">
            <!-- Garis bantu (grid) -->
            <div class="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
              <div v-for="n in 4" :key="n" class="border-t border-white/5"></div>
            </div>

            <div v-for="d in byYear" :key="d.year" class="relative z-10 flex-1 flex flex-col items-center justify-end h-full">
              <span class="text-xs font-bold text-slate-300 mb-2 tabular-nums">{{ started ? d.val : 0 }}</span>
              <div
                class="chart-bar w-full max-w-[46px] rounded-t-md bg-gradient-to-t from-blue-600 via-blue-400 to-blue-300 shadow-[0_0_14px_rgba(56,189,248,0.35)]"
                :style="{ height: (started ? (d.val / maxYear) * 100 : 0) + '%' }"
              ></div>
              <span class="text-[11px] text-slate-400 mt-2 font-medium">{{ d.year }}</span>
            </div>
          </div>
        </div>

        <!-- Bar horizontal: Distribusi Jenis Proyek -->
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <h3 class="text-sm font-bold text-slate-200 mb-1">Distribusi Jenis Proyek</h3>
          <p class="text-xs text-slate-500 mb-8">Berdasarkan kategori layanan</p>

          <div class="space-y-5">
            <div v-for="d in byType" :key="d.name">
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-slate-300 font-medium">{{ d.name }}</span>
                <span class="text-slate-300 font-semibold tabular-nums">{{ started ? d.val : 0 }} proyek</span>
              </div>
              <div class="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  class="chart-bar h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 shadow-[0_0_12px_rgba(56,189,248,0.18)]"
                  :style="{ width: (started ? (d.val / maxType) * 100 : 0) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart-bar {
  transition: height 1.1s cubic-bezier(0.22, 1, 0.36, 1),
    width 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
@media (prefers-reduced-motion: reduce) {
  .chart-bar {
    transition: none !important;
  }
}
</style>

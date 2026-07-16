<script setup>
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import AOS from 'aos'
import { projects as allProjects, categories } from '../data/projects.js'

const active = ref('Semua')

const filtered = computed(() =>
  active.value === 'Semua'
    ? allProjects
    : allProjects.filter((p) => p.category === active.value)
)

const onImgError = (e, project) => {
  if (project.fallback && e.target.src !== project.fallback) {
    e.target.src = project.fallback
  }
}

const setFilter = (cat) => {
  active.value = cat
}

// Refresh AOS setiap filter berubah agar item baru tetap beranimasi
watch(active, () => {
  nextTick(() => AOS.refreshHard())
})

onMounted(() => {
  window.scrollTo(0, 0)
  nextTick(() => AOS.refreshHard())
})
</script>

<template>
  <main class="min-h-screen pt-28 pb-24 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12" data-aos="fade-up">
        <RouterLink to="/" class="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-slate-200 mb-6 transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Kembali ke Beranda
        </RouterLink>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
          Galeri <span class="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Proyek</span>
        </h1>
        <div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Kumpulan lengkap karya & eksplorasi digital yang saya bangun — dari web app, website, hingga desain UI/UX.
        </p>
      </div>

      <!-- Filter kategori -->
      <div class="flex flex-wrap justify-center gap-2.5 mb-16" data-aos="fade-up" data-aos-delay="100">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="setFilter(cat)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border',
            active === cat
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-100 border-transparent shadow-[0_0_16px_rgba(37,99,235,0.15)]'
              : 'bg-white/5 text-slate-300 border-white/10 hover:border-blue-500/40 hover:text-slate-300',
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Baris proyek berselang-seling -->
      <TransitionGroup tag="div" name="gitem" class="space-y-16 sm:space-y-24">
        <div
          v-for="(project, i) in filtered"
          :key="project.id"
          class="grid md:grid-cols-2 gap-8 lg:gap-14 items-center"
        >
          <!-- Gambar (berpindah sisi sesuai indeks) -->
          <div
            :class="['gallery-shot group relative', i % 2 === 1 ? 'md:order-2' : '']"
            :data-aos="i % 2 === 1 ? 'fade-left' : 'fade-right'"
          >
            <div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10] bg-slate-900">
              <img
                :src="project.image"
                :alt="project.title"
                loading="lazy"
                @error="onImgError($event, project)"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/10 text-slate-300">
                {{ project.category }}
              </span>
              <div class="gallery-shine"></div>
            </div>
          </div>

          <!-- Teks -->
          <div :data-aos="i % 2 === 1 ? 'fade-right' : 'fade-left'" data-aos-delay="100">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">{{ project.title }}</h2>
            <p class="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">{{ project.description }}</p>

            <div class="flex flex-wrap gap-2 mb-7">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-slate-300 rounded-md text-xs font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-3">
              <a
                :href="project.demoUrl"
                class="btn-neon inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
              <a
                :href="project.githubUrl"
                class="inline-flex items-center justify-center p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white rounded-xl transition-colors"
                title="Lihat Source Code"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<style scoped>
/* Transisi saat filter berubah */
.gitem-enter-active,
.gitem-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.gitem-enter-from,
.gitem-leave-to {
  opacity: 0;
  transform: translateY(28px) scale(0.98);
}
.gitem-leave-active {
  position: absolute;
}

/* Sapuan cahaya emas pada gambar saat hover */
.gallery-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(56,189,248, 0.25) 50%,
    transparent 70%
  );
  transform: translateX(-130%);
}
.gallery-shot:hover .gallery-shine {
  transform: translateX(130%);
  transition: transform 0.9s ease;
}

@media (prefers-reduced-motion: reduce) {
  .gitem-enter-active,
  .gitem-leave-active {
    transition: none;
  }
  .gallery-shine {
    display: none;
  }
}
</style>

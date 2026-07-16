<script setup>
import { computed } from 'vue'
import { projects as allProjects } from '../../data/projects.js'

// Beranda hanya menampilkan proyek unggulan (featured)
const projects = computed(() => allProjects.filter((p) => p.featured))

// Hormati preferensi reduced-motion — matikan tilt jika perlu
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Efek 3D tilt + posisi spotlight mengikuti kursor
const onTilt = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  // Set posisi spotlight (dipakai oleh CSS ::before)
  card.style.setProperty('--mx', `${x}px`)
  card.style.setProperty('--my', `${y}px`)
  if (prefersReduced) return
  // Hitung rotasi berdasarkan jarak dari pusat kartu (maks ±6deg)
  const rx = ((y / rect.height) - 0.5) * -6
  const ry = ((x / rect.width) - 0.5) * 6
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
}

const resetTilt = (e) => {
  e.currentTarget.style.transform = ''
}

// Jika gambar lokal gagal dimuat, pakai gambar cadangan (fallback)
const onImgError = (e, project) => {
  if (project.fallback && e.target.src !== project.fallback) {
    e.target.src = project.fallback
  }
}
</script>

<template>
  <section id="projects" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Proyek Terbaru</h2>
        <div class="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Kumpulan portofolio aplikasi dan eksplorasi digital terbaik yang saya bangun menggunakan teknologi web modern.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 lg:gap-10">
        <div
          v-for="project in projects"
          :key="project.id"
          @mousemove="onTilt"
          @mouseleave="resetTilt"
          class="project-card group tilt-card relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-blue-500/40 transition-colors duration-300"
        >
          <!-- Gambar memenuhi kartu -->
          <img
            :src="project.image"
            :alt="project.title"
            loading="lazy"
            @error="onImgError($event, project)"
            class="project-img absolute inset-0 w-full h-full object-cover"
          />

          <!-- Sapuan cahaya emas saat hover -->
          <div class="shine z-[2]"></div>

          <!-- Badge Featured -->
          <div class="absolute top-4 left-4 z-[3] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-slate-300 font-medium flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Featured
          </div>

          <!-- Judul permanen di bawah (memudar saat hover) -->
          <div class="absolute inset-x-0 bottom-0 z-[3] p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:opacity-0 transition-opacity duration-300">
            <h3 class="text-lg font-bold text-white">{{ project.title }}</h3>
          </div>

          <!-- Overlay auto-reveal: muncul otomatis berulang (juga saat hover) -->
          <div class="auto-reveal absolute inset-0 z-[4] flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-slate-950/80 backdrop-blur-sm opacity-0">
            <div class="reveal-inner">
              <h3 class="text-xl font-bold text-slate-300 mb-3">{{ project.title }}</h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-5 max-w-sm mx-auto">{{ project.description }}</p>

              <div class="flex flex-wrap justify-center gap-2 mb-6">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-slate-300 rounded-md text-xs font-medium"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="flex items-center justify-center gap-3">
                <a
                  :href="project.demoUrl"
                  class="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl transition-all active:scale-95"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Live Demo
                </a>
                <a
                  :href="project.githubUrl"
                  class="flex items-center justify-center p-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white rounded-xl transition-colors"
                  title="Lihat Source Code"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tautan ke halaman Galeri lengkap -->
      <div class="text-center mt-14">
        <RouterLink
          to="/galeri"
          class="btn-neon inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 font-bold rounded-xl transition-all hover:-translate-y-0.5"
        >
          Lihat Semua Proyek
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Overlay info muncul otomatis berulang (tanpa perlu hover) */
.auto-reveal {
  animation: autoReveal 11s ease-in-out infinite;
}
.reveal-inner {
  animation: revealInner 11s ease-in-out infinite;
}
/* Bergiliran antar kartu agar tidak muncul bersamaan */
.project-card:nth-child(1) .auto-reveal,
.project-card:nth-child(1) .reveal-inner { animation-delay: 0s; }
.project-card:nth-child(2) .auto-reveal,
.project-card:nth-child(2) .reveal-inner { animation-delay: 2.75s; }
.project-card:nth-child(3) .auto-reveal,
.project-card:nth-child(3) .reveal-inner { animation-delay: 5.5s; }
.project-card:nth-child(4) .auto-reveal,
.project-card:nth-child(4) .reveal-inner { animation-delay: 8.25s; }

@keyframes autoReveal {
  0%, 8% { opacity: 0; }
  18%, 60% { opacity: 1; }
  72%, 100% { opacity: 0; }
}
@keyframes revealInner {
  0%, 8% { transform: translateY(24px); }
  18%, 60% { transform: translateY(0); }
  72%, 100% { transform: translateY(24px); }
}

/* Saat hover: tampilkan penuh & hentikan siklus otomatis */
.project-card:hover .auto-reveal {
  animation: none;
  opacity: 1;
}
.project-card:hover .reveal-inner {
  animation: none;
  transform: none;
}

/* Kartu kaca: glow emas berdenyut lembut (dijeda saat hover) */
.project-card {
  animation: cardPulse 5s ease-in-out infinite;
}
.project-card:nth-child(2n) {
  animation-delay: 1.2s;
}
.project-card:hover {
  animation-play-state: paused;
}
@keyframes cardPulse {
  0%, 100% {
    box-shadow: 0 0 0 1px rgba(37,99,235, 0.05),
      0 18px 40px -22px rgba(0, 0, 0, 0.7);
  }
  50% {
    box-shadow: 0 0 22px -4px rgba(37,99,235, 0.22),
      0 18px 40px -22px rgba(0, 0, 0, 0.7);
  }
}

/* Ken Burns: gambar perlahan zoom & bergeser terus-menerus */
.project-img {
  animation: kenburns 16s ease-in-out infinite alternate;
  transform-origin: center;
}
@keyframes kenburns {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.12) translate(-2%, -2%); }
}

/* Sapuan cahaya emas melintas saat kartu di-hover */
.shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(56,189,248, 0.28) 48%,
    rgba(209,250,229, 0.35) 50%,
    transparent 70%
  );
  transform: translateX(-130%);
}
.group:hover .shine {
  transform: translateX(130%);
  transition: transform 0.9s ease;
}

@media (prefers-reduced-motion: reduce) {
  .project-card { animation: none !important; }
  .project-img { animation: none !important; }
  .shine { display: none; }
  /* Tanpa auto-loop: tampilkan info hanya saat hover */
  .auto-reveal {
    animation: none !important;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .reveal-inner {
    animation: none !important;
    transform: none;
  }
  .project-card:hover .auto-reveal { opacity: 1; }
}
</style>
<script setup>
import { Code2, Search, Layers, AppWindow } from 'lucide-vue-next'
import SkillMeters from './SkillMeters.vue'
import DesignerCoder from './DesignerCoder.vue'

// Spotlight mengikuti kursor pada kartu layanan
const onSpot = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const services = [
  { title: 'Pembuatan Website', desc: 'Landing page & Web Company Profile responsif.', icon: Code2, color: 'text-slate-300 bg-blue-500/10' },
  { title: 'Optimasi SEO', desc: 'Meningkatkan peringkat Google & visibilitas bisnis.', icon: Search, color: 'text-slate-300 bg-blue-500/10' },
  { title: 'Web Portofolio', desc: 'Personal branding eksklusif untuk karir profesional.', icon: Layers, color: 'text-slate-300 bg-blue-500/10' },
  { title: 'Aplikasi Web', desc: 'Sistem web apps kustom dengan UI/UX modern.', icon: AppWindow, color: 'text-rose-400 bg-rose-500/10' },
]

// Mapping icon ID sesuai dokumentasi skillicons.dev
const techStack = [
  { name: 'HTML5', id: 'html' },
  { name: 'CSS3', id: 'css' },
  { name: 'JavaScript', id: 'js' },
  { name: 'TypeScript', id: 'ts' },
  { name: 'Vue.js', id: 'vue' },
  { name: 'Nuxt.js', id: 'nuxt' },
  { name: 'Tailwind CSS', id: 'tailwind' },
  { name: 'Sass', id: 'sass' },
  { name: 'Figma', id: 'figma' },
  { name: 'Git', id: 'git' },
  { name: 'GitHub', id: 'github' },
  { name: 'VS Code', id: 'vscode' },
  { name: 'NPM', id: 'npm' },
  { name: 'Vite', id: 'vite' }
]
</script>

<template>
  <section id="skills" class="py-28 relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">

      <!-- Designer vs Coder + otak AI -->
      <DesignerCoder />

      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Layanan & Jasa</h2>
        <div class="h-1.5 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <div v-for="service in services" :key="service.title" @mousemove="onSpot" class="group spotlight bg-slate-900/40 backdrop-blur-md p-7 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-black/20">
          <div :class="['relative z-[2] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300', service.color]">
            <component :is="service.icon" class="h-7 w-7" />
          </div>
          <h3 class="relative z-[2] font-bold text-xl text-slate-100 mb-3">{{ service.title }}</h3>
          <p class="relative z-[2] text-sm text-slate-400 leading-relaxed">{{ service.desc }}</p>
        </div>
      </div>

      <!-- Tingkat Keahlian: bar + lingkaran persentase -->
      <div class="mb-24">
        <div class="text-center mb-14">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Tingkat Keahlian</h2>
          <div class="h-1.5 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>
        <SkillMeters />
      </div>

      <!-- Tech Stack: marquee berjalan + glow emas -->
      <div class="bg-slate-900/60 border border-slate-800 rounded-[40px] py-10 sm:py-14 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div class="text-center mb-12 px-6">
          <h3 class="text-sm font-bold tracking-[0.3em] uppercase text-slate-300 mb-3">Tech Stack & Tools</h3>
          <p class="text-slate-300 text-lg">Teknologi yang saya gunakan untuk membangun solusi digital</p>
        </div>

        <!-- Marquee -->
        <div class="marquee relative">
          <div class="marquee-fade marquee-fade-l"></div>
          <div class="marquee-fade marquee-fade-r"></div>
          <div class="marquee-track flex gap-6 sm:gap-8 w-max px-4">
            <div
              v-for="(tech, i) in [...techStack, ...techStack]"
              :key="tech.name + i"
              class="group flex flex-col items-center gap-3 shrink-0"
            >
              <div class="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center p-3 border border-slate-700/50 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]">
                <img :src="`https://skillicons.dev/icons?i=${tech.id}`" :alt="tech.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span class="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors tracking-wide uppercase">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.marquee {
  overflow: hidden;
}
.marquee-track {
  animation: marquee 32s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
/* Gradasi memudar di tepi kiri/kanan */
.marquee-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}
.marquee-fade-l {
  left: 0;
  background: linear-gradient(to right, rgba(15, 15, 18, 0.9), transparent);
}
.marquee-fade-r {
  right: 0;
  background: linear-gradient(to left, rgba(15, 15, 18, 0.9), transparent);
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
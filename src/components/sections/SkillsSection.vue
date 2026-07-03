<script setup>
import { Code2, Search, Layers, AppWindow } from 'lucide-vue-next'

const services = [
  { title: 'Pembuatan Website', desc: 'Landing page & Web Company Profile responsif.', icon: Code2, color: 'text-indigo-400 bg-indigo-500/10' },
  { title: 'Optimasi SEO', desc: 'Meningkatkan peringkat Google & visibilitas bisnis.', icon: Search, color: 'text-amber-400 bg-amber-500/10' },
  { title: 'Web Portofolio', desc: 'Personal branding eksklusif untuk karir profesional.', icon: Layers, color: 'text-cyan-400 bg-cyan-500/10' },
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
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Layanan & Jasa</h2>
        <div class="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <div v-for="service in services" :key="service.title" class="group bg-slate-900/40 backdrop-blur-md p-7 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-black/20">
          <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300', service.color]">
            <component :is="service.icon" class="h-7 w-7" />
          </div>
          <h3 class="font-bold text-xl text-slate-100 mb-3">{{ service.title }}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">{{ service.desc }}</p>
        </div>
      </div>

      <div class="bg-slate-900/60 border border-slate-800 rounded-[40px] p-10 sm:p-16 backdrop-blur-xl shadow-2xl">
        <div class="text-center mb-12">
          <h3 class="text-sm font-bold tracking-[0.3em] uppercase text-indigo-400 mb-3">Tech Stack & Tools</h3>
          <p class="text-slate-300 text-lg">Teknologi yang saya gunakan untuk membangun solusi digital</p>
        </div>

        <div class="flex flex-wrap justify-center gap-6 sm:gap-8">
          <div v-for="tech in techStack" :key="tech.name" class="group flex flex-col items-center gap-3">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center p-3 border border-slate-700/50 group-hover:border-indigo-500 group-hover:bg-indigo-500/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <img :src="`https://skillicons.dev/icons?i=${tech.id}`" :alt="tech.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span class="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors tracking-wide uppercase">{{ tech.name }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
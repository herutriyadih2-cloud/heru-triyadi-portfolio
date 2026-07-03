<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'E-Commerce Platform Modern',
    description: 'Platform toko online komprehensif terintegrasi dengan sistem inventaris real-time, payment gateway, manajemen produk otomatis, serta optimasi SEO tingkat tinggi.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    tags: ['Vue 3', 'Tailwind CSS', 'Vite', 'Pinia'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'SaaS Dashboard Analytics',
    description: 'Sistem aplikasi visualisasi metrik data bisnis interaktif guna memonitor grafik penjualan, perilaku konversi konsumen, dan performa web secara live.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    tags: ['Vue 3', 'Chart.js', 'Nuxt.js', 'Tailwind'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'AI Smart Property Platform',
    description: 'Aplikasi pencarian properti dan rumah masa kini dengan rekomendasi berbasis AI, fitur peta interaktif, integrasi filter detail, serta mode gelap bawaan.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
    tags: ['Nuxt 3', 'Tailwind CSS', 'Algolia', 'VueUse'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'UI/UX Design System Case Study',
    description: 'Transformasi dari desain komponen Figma ke bentuk kode komponen Vue yang reusable, konsisten, aksesibel (A11y), dan mendukung kustomisasi tema.',
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=600&auto=format&fit=crop',
    tags: ['Figma', 'Vue 3', 'Tailwind', 'Storybook'],
    demoUrl: '#',
    githubUrl: '#'
  }
])
</script>

<template>
  <section id="projects" class="py-24 bg-slate-950">
    <div class="max-w-6xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Proyek Terbaru</h2>
        <div class="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          Kumpulan portofolio aplikasi dan eksplorasi digital terbaik yang saya bangun menggunakan teknologi web modern.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 lg:gap-10">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700/80 transition-all duration-300 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div class="relative overflow-hidden aspect-video bg-slate-950">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-100"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              
              <div class="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-xs text-indigo-300 font-medium flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                Featured Project
              </div>
            </div>

            <div class="p-6 sm:p-8">
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors duration-200">
                {{ project.title }}
              </h3>
              <p class="text-slate-400 text-sm leading-relaxed mt-3">
                {{ project.description }}
              </p>
            </div>
          </div>

          <div class="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 mt-auto">
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in project.tags" 
                :key="tag"
                class="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md text-xs font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-4 pt-4 border-t border-slate-800/60">
              <a 
                :href="project.demoUrl" 
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-98"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Live Demo
              </a>
              <a 
                :href="project.githubUrl" 
                class="flex items-center justify-center p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white rounded-xl transition-colors"
                title="Lihat Source Code"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
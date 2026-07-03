<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang', href: '#about' },
  { name: 'Keahlian', href: '#skills' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Kontak', href: '#contact' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800/80 z-50 shadow-lg">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a href="#" class="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
            HeruTriyadi<span class="text-indigo-400">.Dev</span>
          </a>
        </div>
        
        <div class="hidden md:block">
          <div class="flex space-x-8 text-sm font-medium">
            <a v-for="link in navLinks" :key="link.name" :href="link.href" class="text-slate-300 hover:text-indigo-400 transition-colors">
              {{ link.name }}
            </a>
          </div>
        </div>

        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="text-slate-300 hover:text-white focus:outline-none">
            <Menu v-if="!isMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-[#0f172a] border-b border-slate-800 px-6 py-4 space-y-3">
      <a v-for="link in navLinks" :key="link.name" :href="link.href" @click="isMenuOpen = false" class="block text-base font-medium text-slate-300 hover:text-indigo-400 transition-colors">
        {{ link.name }}
      </a>
    </div>
  </nav>
</template>
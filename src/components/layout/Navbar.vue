<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, Download } from 'lucide-vue-next'

const route = useRoute()
const isMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')

const isHome = computed(() => route.name === 'home')

const navLinks = [
  { name: 'Beranda', hash: '#home', id: 'home' },
  { name: 'Tentang', hash: '#about', id: 'about' },
  { name: 'Keahlian', hash: '#skills', id: 'skills' },
  { name: 'Proyek', hash: '#projects', id: 'projects' },
  { name: 'Kontak', hash: '#contact', id: 'contact' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 20
  if (!isHome.value) return
  const offset = window.scrollY + 120
  let current = 'home'
  for (const link of navLinks) {
    const el = document.getElementById(link.id)
    if (el && el.offsetTop <= offset) current = link.id
  }
  activeSection.value = current
}

// Aktif hanya jika di beranda & section-nya sedang dilihat
const isActive = (id) => isHome.value && activeSection.value === id

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 w-full backdrop-blur-md border-b z-50 transition-all duration-300',
      scrolled
        ? 'bg-[#0a0b0b]/90 border-white/10 shadow-lg shadow-black/30'
        : 'bg-[#0a0b0b]/50 border-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div :class="['flex items-center justify-between transition-all duration-300', scrolled ? 'h-14' : 'h-16']">
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-bold text-slate-100 tracking-tight">
            HeruTriyadi<span class="text-slate-300">.Dev</span>
          </RouterLink>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <div class="flex space-x-8 text-sm font-medium">
            <RouterLink
              v-for="link in navLinks"
              :key="link.name"
              :to="{ path: '/', hash: link.hash }"
              :class="['relative transition-colors', isActive(link.id) ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400']"
            >
              {{ link.name }}
              <span
                class="absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                :class="isActive(link.id) ? 'w-full' : 'w-0'"
              ></span>
            </RouterLink>

            <!-- Link ke halaman lain -->
            <RouterLink
              to="/galeri"
              class="relative transition-colors"
              :class="route.name === 'galeri' ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400'"
            >
              Galeri
              <span
                class="absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                :class="route.name === 'galeri' ? 'w-full' : 'w-0'"
              ></span>
            </RouterLink>
            <RouterLink
              to="/games"
              class="relative transition-colors"
              :class="route.name === 'games' ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400'"
            >
              Games
              <span
                class="absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                :class="route.name === 'games' ? 'w-full' : 'w-0'"
              ></span>
            </RouterLink>
          </div>

          <a
            href="/CV-Heru-Triyadi.pdf"
            download
            class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold px-4 py-2 rounded-lg shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
          >
            <Download class="h-4 w-4" />
            <span>CV</span>
          </a>
        </div>

        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="text-slate-300 hover:text-white focus:outline-none">
            <Menu v-if="!isMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-[#0a0b0b] border-b border-white/10 px-6 py-4 space-y-3">
      <RouterLink
        v-for="link in navLinks"
        :key="link.name"
        :to="{ path: '/', hash: link.hash }"
        @click="isMenuOpen = false"
        :class="['block text-base font-medium transition-colors', isActive(link.id) ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400']"
      >
        {{ link.name }}
      </RouterLink>
      <RouterLink
        to="/galeri"
        @click="isMenuOpen = false"
        :class="['block text-base font-medium transition-colors', route.name === 'galeri' ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400']"
      >
        Galeri
      </RouterLink>
      <RouterLink
        to="/games"
        @click="isMenuOpen = false"
        :class="['block text-base font-medium transition-colors', route.name === 'games' ? 'text-blue-400' : 'text-slate-300 hover:text-blue-400']"
      >
        Games
      </RouterLink>
      <a
        href="/CV-Heru-Triyadi.pdf"
        download
        @click="isMenuOpen = false"
        class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-slate-100 text-sm font-bold px-4 py-2 rounded-lg mt-2"
      >
        <Download class="h-4 w-4" />
        <span>Download CV</span>
      </a>
    </div>
  </nav>
</template>

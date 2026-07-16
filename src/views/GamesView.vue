<script setup>
import { ref, onMounted } from 'vue'
import { Gamepad2, Grid3x3, Zap, Brain, Hand, Hash } from 'lucide-vue-next'
import TicTacToe from '../components/games/TicTacToe.vue'
import ReactionGame from '../components/games/ReactionGame.vue'
import SnakeGame from '../components/games/SnakeGame.vue'
import MemoryGame from '../components/games/MemoryGame.vue'
import RockPaper from '../components/games/RockPaper.vue'
import GuessNumber from '../components/games/GuessNumber.vue'

const games = [
  { key: 'snake', name: 'Snake', icon: Gamepad2, comp: SnakeGame, desc: 'Video game arcade klasik — makan sebanyak mungkin tanpa menabrak!' },
  { key: 'ttt', name: 'Tic-Tac-Toe', icon: Grid3x3, comp: TicTacToe, desc: 'Lawan komputer dalam permainan klasik X & O.' },
  { key: 'memory', name: 'Memory Match', icon: Brain, comp: MemoryGame, desc: 'Balik kartu & temukan semua pasangan secepat mungkin.' },
  { key: 'rps', name: 'Batu-Gunting-Kertas', icon: Hand, comp: RockPaper, desc: 'Adu keberuntungan melawan komputer.' },
  { key: 'reaksi', name: 'Tes Reaksi', icon: Zap, comp: ReactionGame, desc: 'Seberapa cepat reaksimu? Klik saat kotak berubah emas.' },
  { key: 'guess', name: 'Tebak Angka', icon: Hash, comp: GuessNumber, desc: 'Tebak angka rahasia 1–100 dengan petunjuk tinggi/rendah.' },
]
const active = ref('snake')

onMounted(() => window.scrollTo(0, 0))
</script>

<template>
  <main class="min-h-screen pt-28 pb-24 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10" data-aos="fade-up">
        <RouterLink to="/" class="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-slate-200 mb-6 transition-colors">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Kembali ke Beranda
        </RouterLink>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight inline-flex items-center gap-3 justify-center">
          <Gamepad2 class="w-9 h-9 text-slate-300" />
          <span>Game <span class="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Zone</span></span>
        </h1>
        <div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-400 mt-4 max-w-lg mx-auto text-sm sm:text-base">
          Rehat sejenak — mainkan game kecil interaktif ini langsung di browser. 🎮
        </p>
      </div>

      <!-- Tab pemilih game -->
      <div class="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="100">
        <button
          v-for="g in games"
          :key="g.key"
          @click="active = g.key"
          :class="[
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300',
            active === g.key
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-100 border-transparent shadow-[0_0_16px_rgba(37,99,235,0.15)]'
              : 'bg-white/5 text-slate-300 border-white/10 hover:border-blue-500/40 hover:text-slate-300',
          ]"
        >
          <component :is="g.icon" class="w-4 h-4" />
          {{ g.name }}
        </button>
      </div>

      <!-- Panel game -->
      <div class="bg-slate-900/25 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl" data-aos="zoom-in">
        <template v-for="g in games" :key="g.key">
          <div v-if="active === g.key">
            <p class="text-center text-slate-500 text-sm mb-8">{{ g.desc }}</p>
            <component :is="g.comp" />
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

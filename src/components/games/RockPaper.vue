<script setup>
import { ref } from 'vue'

const choices = [
  { key: 'batu', label: 'Batu', emoji: '✊' },
  { key: 'gunting', label: 'Gunting', emoji: '✌️' },
  { key: 'kertas', label: 'Kertas', emoji: '✋' },
]
// Apa yang dikalahkan tiap pilihan
const beats = { batu: 'gunting', gunting: 'kertas', kertas: 'batu' }

const player = ref(null)
const cpu = ref(null)
const result = ref('')
const score = ref({ win: 0, lose: 0, draw: 0 })

const emojiOf = (k) => choices.find((c) => c.key === k)?.emoji || '❔'

const play = (choice) => {
  const c = choices[Math.floor(Math.random() * 3)].key
  player.value = choice
  cpu.value = c
  if (choice === c) {
    result.value = 'Seri! 🤝'
    score.value.draw++
  } else if (beats[choice] === c) {
    result.value = 'Kamu menang! 🎉'
    score.value.win++
  } else {
    result.value = 'Komputer menang! 🤖'
    score.value.lose++
  }
}
</script>

<template>
  <div class="max-w-md mx-auto text-center">
    <!-- Arena -->
    <div class="flex items-center justify-center gap-6 mb-6">
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-center text-4xl">
          {{ player ? emojiOf(player) : '❔' }}
        </div>
        <span class="text-xs text-slate-400 mt-2">Kamu</span>
      </div>
      <span class="text-slate-300 font-extrabold text-xl">VS</span>
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-center text-4xl">
          {{ cpu ? emojiOf(cpu) : '❔' }}
        </div>
        <span class="text-xs text-slate-400 mt-2">Komputer</span>
      </div>
    </div>

    <p class="font-bold text-lg mb-6 min-h-[1.75rem] text-slate-300">{{ result }}</p>

    <div class="flex justify-center gap-3 mb-6">
      <button
        v-for="c in choices"
        :key="c.key"
        @click="play(c.key)"
        class="flex flex-col items-center gap-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all active:scale-95"
      >
        <span class="text-2xl">{{ c.emoji }}</span>
        <span class="text-xs font-semibold text-slate-300">{{ c.label }}</span>
      </button>
    </div>

    <div class="flex items-center justify-center gap-5 text-sm">
      <span class="text-slate-300 font-semibold">Menang: {{ score.win }}</span>
      <span class="text-slate-500">Seri: {{ score.draw }}</span>
      <span class="text-slate-400">Kalah: {{ score.lose }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const board = ref(Array(9).fill(''))
const status = ref('Giliran kamu (X)')
const locked = ref(false)
const winLine = ref([])
const score = reactive({ win: 0, lose: 0, draw: 0 })

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

const winnerInfo = (b) => {
  for (const line of LINES) {
    const [a, c, d] = line
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], line }
  }
  return null
}

const emptyCells = (b) => b.map((v, i) => (v ? null : i)).filter((v) => v !== null)

// AI sederhana: menang > blok > tengah > pojok > acak
const aiMove = (b) => {
  for (const i of emptyCells(b)) {
    const t = [...b]; t[i] = 'O'
    if (winnerInfo(t)?.player === 'O') return i
  }
  for (const i of emptyCells(b)) {
    const t = [...b]; t[i] = 'X'
    if (winnerInfo(t)?.player === 'X') return i
  }
  if (!b[4]) return 4
  const corners = [0, 2, 6, 8].filter((i) => !b[i])
  if (corners.length) return corners[0]
  const rest = emptyCells(b)
  return rest[0]
}

const finish = (info) => {
  if (info) {
    winLine.value = info.line
    if (info.player === 'X') { status.value = '🎉 Kamu menang!'; score.win++ }
    else { status.value = '🤖 Komputer menang!'; score.lose++ }
    locked.value = true
    return true
  }
  if (emptyCells(board.value).length === 0) {
    status.value = '🤝 Seri!'; score.draw++; locked.value = true
    return true
  }
  return false
}

const play = (i) => {
  if (locked.value || board.value[i]) return
  board.value[i] = 'X'
  if (finish(winnerInfo(board.value))) return
  locked.value = true
  status.value = 'Komputer berpikir...'
  setTimeout(() => {
    const m = aiMove(board.value)
    if (m !== undefined) board.value[m] = 'O'
    if (!finish(winnerInfo(board.value))) {
      status.value = 'Giliran kamu (X)'
      locked.value = false
    }
  }, 420)
}

const reset = () => {
  board.value = Array(9).fill('')
  winLine.value = []
  locked.value = false
  status.value = 'Giliran kamu (X)'
}
</script>

<template>
  <div class="max-w-sm mx-auto text-center">
    <p class="text-slate-300 font-medium mb-5 min-h-[1.5rem]">{{ status }}</p>

    <div class="grid grid-cols-3 gap-2.5 mb-6">
      <button
        v-for="(cell, i) in board"
        :key="i"
        @click="play(i)"
        :disabled="!!cell || locked"
        :class="[
          'aspect-square rounded-xl text-4xl font-extrabold flex items-center justify-center border transition-all duration-200',
          winLine.includes(i) ? 'bg-blue-500/20 border-blue-400' : 'bg-slate-900/40 border-white/10 hover:border-blue-500/40 hover:bg-slate-900/60',
          cell === 'X' ? 'text-slate-300' : 'text-slate-300',
          !cell && !locked ? 'cursor-pointer' : 'cursor-default',
        ]"
      >
        <span v-if="cell" class="mark">{{ cell }}</span>
      </button>
    </div>

    <div class="flex items-center justify-center gap-4 mb-6 text-sm">
      <span class="text-slate-300 font-semibold">Menang: {{ score.win }}</span>
      <span class="text-slate-500">Seri: {{ score.draw }}</span>
      <span class="text-slate-400">Kalah: {{ score.lose }}</span>
    </div>

    <button
      @click="reset"
      class="btn-neon inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl transition-all"
    >
      Main Lagi
    </button>
  </div>
</template>

<style scoped>
.mark {
  display: inline-block;
  animation: pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes pop {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .mark { animation: none; }
}
</style>

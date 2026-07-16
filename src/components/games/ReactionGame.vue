<script setup>
import { ref, onBeforeUnmount } from 'vue'

// state: 'idle' | 'waiting' | 'go' | 'result' | 'early'
const state = ref('idle')
const result = ref(0)
const best = ref(null)
let timer = null
let startTime = 0

const start = () => {
  state.value = 'waiting'
  const delay = 1200 + Math.floor(Math.random() * 2600)
  timer = setTimeout(() => {
    state.value = 'go'
    startTime = performance.now()
  }, delay)
}

const click = () => {
  if (state.value === 'idle' || state.value === 'result' || state.value === 'early') {
    start()
  } else if (state.value === 'waiting') {
    clearTimeout(timer)
    state.value = 'early'
  } else if (state.value === 'go') {
    result.value = Math.round(performance.now() - startTime)
    if (best.value === null || result.value < best.value) best.value = result.value
    state.value = 'result'
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="max-w-md mx-auto text-center">
    <button
      @click="click"
      :class="[
        'w-full aspect-[16/9] rounded-2xl border flex flex-col items-center justify-center select-none transition-colors duration-150 px-6',
        state === 'go'
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300 text-slate-100'
          : state === 'waiting'
          ? 'bg-slate-900/60 border-white/10 text-slate-300'
          : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-blue-500/40',
      ]"
    >
      <template v-if="state === 'idle'">
        <span class="text-2xl font-extrabold mb-1">⚡ Tes Reaksi</span>
        <span class="text-sm opacity-70">Klik untuk mulai</span>
      </template>
      <template v-else-if="state === 'waiting'">
        <span class="text-xl font-bold text-slate-300 mb-1">Tunggu…</span>
        <span class="text-sm opacity-70">Klik saat kotak berubah emas</span>
      </template>
      <template v-else-if="state === 'go'">
        <span class="text-3xl font-extrabold pulse">KLIK SEKARANG!</span>
      </template>
      <template v-else-if="state === 'early'">
        <span class="text-xl font-bold text-rose-400 mb-1">Terlalu cepat! 😅</span>
        <span class="text-sm opacity-70">Klik untuk coba lagi</span>
      </template>
      <template v-else>
        <span class="text-4xl font-extrabold text-slate-300 mb-1 tabular-nums">{{ result }} ms</span>
        <span class="text-sm opacity-70">Klik untuk coba lagi</span>
      </template>
    </button>

    <p v-if="best !== null" class="mt-5 text-sm text-slate-400">
      Rekor terbaik: <span class="text-slate-300 font-bold tabular-nums">{{ best }} ms</span>
    </p>
  </div>
</template>

<style scoped>
.pulse {
  animation: p 0.5s ease-in-out infinite;
}
@keyframes p {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}
@media (prefers-reduced-motion: reduce) {
  .pulse { animation: none; }
}
</style>

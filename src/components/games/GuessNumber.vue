<script setup>
import { ref, onMounted } from 'vue'

const target = ref(0)
const guess = ref('')
const hint = ref('Tebak angka 1–100')
const attempts = ref(0)
const done = ref(false)
const history = ref([])

const reset = () => {
  target.value = Math.floor(Math.random() * 100) + 1
  guess.value = ''
  hint.value = 'Tebak angka 1–100'
  attempts.value = 0
  done.value = false
  history.value = []
}

const submit = () => {
  const n = parseInt(guess.value, 10)
  if (isNaN(n) || n < 1 || n > 100 || done.value) return
  attempts.value++
  history.value.unshift(n)
  if (n === target.value) {
    hint.value = `🎉 Benar! Angkanya ${target.value} (${attempts.value} tebakan)`
    done.value = true
  } else if (n < target.value) {
    hint.value = '⬆️ Lebih tinggi!'
  } else {
    hint.value = '⬇️ Lebih rendah!'
  }
  guess.value = ''
}

onMounted(reset)
</script>

<template>
  <div class="max-w-xs mx-auto text-center">
    <p class="text-lg font-bold mb-1" :class="done ? 'text-slate-300' : 'text-slate-200'">{{ hint }}</p>
    <p class="text-xs text-slate-500 mb-6">Percobaan: {{ attempts }}</p>

    <form @submit.prevent="submit" class="flex gap-2 mb-5">
      <input
        v-model="guess"
        type="number"
        min="1"
        max="100"
        :disabled="done"
        placeholder="1 - 100"
        class="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-center text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
      />
      <button
        type="submit"
        :disabled="done"
        class="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl transition-all disabled:opacity-50"
      >
        Tebak
      </button>
    </form>

    <div v-if="history.length" class="flex flex-wrap justify-center gap-1.5 mb-5">
      <span
        v-for="(h, i) in history"
        :key="i"
        class="px-2 py-0.5 rounded-md text-xs font-medium tabular-nums"
        :class="h === target ? 'bg-blue-500/20 text-slate-300 border border-blue-400/40' : 'bg-white/5 text-slate-400 border border-white/10'"
      >
        {{ h }}
      </span>
    </div>

    <button
      @click="reset"
      class="btn-neon inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl transition-all"
    >
      Main Baru
    </button>
  </div>
</template>

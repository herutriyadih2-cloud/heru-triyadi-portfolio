<script setup>
import { ref, onMounted } from 'vue'

const EMOJIS = ['🚀', '🤖', '💡', '🎨', '⚡', '🔥', '🌟', '🎮']

const cards = ref([])
const flipped = ref([]) // index kartu yang sedang terbuka
const matched = ref([]) // index kartu yang sudah cocok
const moves = ref(0)
const won = ref(false)
let lock = false

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const reset = () => {
  const deck = shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({ id: i, emoji }))
  cards.value = deck
  flipped.value = []
  matched.value = []
  moves.value = 0
  won.value = false
  lock = false
}

const flip = (i) => {
  if (lock || flipped.value.includes(i) || matched.value.includes(i)) return
  flipped.value.push(i)

  if (flipped.value.length === 2) {
    moves.value++
    const [a, b] = flipped.value
    if (cards.value[a].emoji === cards.value[b].emoji) {
      matched.value.push(a, b)
      flipped.value = []
      if (matched.value.length === cards.value.length) won.value = true
    } else {
      lock = true
      setTimeout(() => {
        flipped.value = []
        lock = false
      }, 750)
    }
  }
}

const isOpen = (i) => flipped.value.includes(i) || matched.value.includes(i)

onMounted(reset)
</script>

<template>
  <div class="max-w-sm mx-auto text-center">
    <div class="flex items-center justify-center gap-6 mb-5 text-sm">
      <span class="text-slate-300 font-bold">Langkah: {{ moves }}</span>
      <span class="text-slate-500">Cocok: {{ matched.length / 2 }}/{{ EMOJIS.length }}</span>
    </div>

    <p v-if="won" class="text-slate-300 font-bold mb-4">🎉 Selesai dalam {{ moves }} langkah!</p>

    <div class="grid grid-cols-4 gap-2.5 mb-6">
      <button
        v-for="(card, i) in cards"
        :key="card.id"
        @click="flip(i)"
        class="card aspect-square rounded-xl text-2xl sm:text-3xl flex items-center justify-center border transition-all duration-300"
        :class="isOpen(i)
          ? 'bg-blue-500/15 border-blue-400/50 [transform:rotateY(0deg)]'
          : 'bg-slate-900/50 border-white/10 hover:border-blue-500/30'"
      >
        <span v-if="isOpen(i)">{{ card.emoji }}</span>
        <span v-else class="text-slate-300/40 text-xl">?</span>
      </button>
    </div>

    <button
      @click="reset"
      class="btn-neon inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl transition-all"
    >
      Acak Ulang
    </button>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s, background 0.3s, border-color 0.3s;
}
.card:active {
  transform: scale(0.95);
}
</style>

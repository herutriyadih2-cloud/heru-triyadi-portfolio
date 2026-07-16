<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const GRID = 17
const CELL = 20
const SIZE = GRID * CELL

const canvasEl = ref(null)
const score = ref(0)
const best = ref(0)
const running = ref(false)
const gameOver = ref(false)
let ctx = null
let loop = null

let snake = [{ x: 8, y: 8 }]
let dir = { x: 1, y: 0 }
let nextDir = { x: 1, y: 0 }
let food = { x: 12, y: 8 }

const rndCell = () => ({
  x: Math.floor(Math.random() * GRID),
  y: Math.floor(Math.random() * GRID),
})

const placeFood = () => {
  let p
  do {
    p = rndCell()
  } while (snake.some((s) => s.x === p.x && s.y === p.y))
  food = p
}

const reset = () => {
  snake = [{ x: 8, y: 8 }]
  dir = { x: 1, y: 0 }
  nextDir = { x: 1, y: 0 }
  score.value = 0
  gameOver.value = false
  placeFood()
  draw()
}

const start = () => {
  if (running.value) return
  if (gameOver.value) reset()
  running.value = true
  loop = setInterval(tick, 110)
}

const stop = () => {
  running.value = false
  clearInterval(loop)
}

const tick = () => {
  dir = nextDir
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

  // Tabrak dinding atau badan sendiri
  if (
    head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
    snake.some((s) => s.x === head.x && s.y === head.y)
  ) {
    stop()
    gameOver.value = true
    if (score.value > best.value) best.value = score.value
    draw()
    return
  }

  snake.unshift(head)
  if (head.x === food.x && head.y === food.y) {
    score.value++
    placeFood()
  } else {
    snake.pop()
  }
  draw()
}

const draw = () => {
  ctx.fillStyle = '#0a0b0b'
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Grid tipis
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'
  for (let i = 1; i < GRID; i++) {
    ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke()
  }

  // Makanan
  ctx.fillStyle = '#22d3ee'
  ctx.shadowColor = 'rgba(56,189,248,0.8)'
  ctx.shadowBlur = 12
  ctx.beginPath()
  ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  // Ular
  snake.forEach((s, i) => {
    const t = i / snake.length
    ctx.fillStyle = i === 0 ? '#a5f3fc' : `rgba(${55 + t * 10 | 0},${150 - t * 55 | 0},${235 - t * 55 | 0},1)`
    const pad = 2
    ctx.fillRect(s.x * CELL + pad, s.y * CELL + pad, CELL - pad * 2, CELL - pad * 2)
  })
}

const setDir = (x, y) => {
  // Cegah balik arah 180°
  if (x === -dir.x && y === -dir.y) return
  nextDir = { x, y }
  if (!running.value && !gameOver.value) start()
}

const onKey = (e) => {
  const k = e.key.toLowerCase()
  if (['arrowup', 'w'].includes(k)) { setDir(0, -1); e.preventDefault() }
  else if (['arrowdown', 's'].includes(k)) { setDir(0, 1); e.preventDefault() }
  else if (['arrowleft', 'a'].includes(k)) { setDir(-1, 0); e.preventDefault() }
  else if (['arrowright', 'd'].includes(k)) { setDir(1, 0); e.preventDefault() }
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  placeFood()
  draw()
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  clearInterval(loop)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="max-w-sm mx-auto text-center">
    <div class="flex items-center justify-center gap-6 mb-4 text-sm">
      <span class="text-slate-300 font-bold">Skor: {{ score }}</span>
      <span class="text-slate-500">Rekor: {{ best }}</span>
    </div>

    <div class="relative inline-block">
      <canvas
        ref="canvasEl"
        :width="SIZE"
        :height="SIZE"
        class="rounded-xl border border-white/10 w-full max-w-[340px] bg-[#0a0b0b]"
      ></canvas>

      <!-- Overlay start / game over -->
      <div
        v-if="!running"
        class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm"
      >
        <p v-if="gameOver" class="text-rose-400 font-bold mb-1">Game Over!</p>
        <p class="text-slate-200 font-semibold mb-3">{{ gameOver ? `Skor: ${score}` : '🐍 Snake' }}</p>
        <button
          @click="start"
          class="btn-neon px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 text-sm font-bold rounded-xl"
        >
          {{ gameOver ? 'Main Lagi' : 'Mulai' }}
        </button>
      </div>
    </div>

    <p class="text-xs text-slate-500 mt-4">Gunakan tombol panah / WASD, atau tombol di bawah.</p>

    <!-- Kontrol layar (mobile) -->
    <div class="mt-4 inline-grid grid-cols-3 gap-2 select-none">
      <span></span>
      <button @click="setDir(0, -1)" class="dpad">▲</button>
      <span></span>
      <button @click="setDir(-1, 0)" class="dpad">◀</button>
      <button @click="setDir(0, 1)" class="dpad">▼</button>
      <button @click="setDir(1, 0)" class="dpad">▶</button>
    </div>
  </div>
</template>

<style scoped>
.dpad {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  font-size: 1.1rem;
  transition: all 0.15s;
}
.dpad:hover {
  background: rgba(56,189,248, 0.15);
  border-color: rgba(56,189,248,0.18);
}
.dpad:active {
  transform: scale(0.92);
}
</style>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

/* ============================================================
   GALAXY BACKGROUND — canvas 2D murni.
   Spiral bintang emas berputar perlahan + inti bercahaya,
   ditambah bintang latar yang berkelip. Ringan & self-contained.
   ============================================================ */

const canvasEl = ref(null)
let ctx = null
let raf = null
let W = 0, H = 0, DPR = 1
let rot = 0
let t = 0

let spiral = []   // bintang di lengan galaksi
let field = []    // bintang latar tersebar
let meteors = []  // meteor jatuh

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// PRNG deterministik agar hasil konsisten (tanpa Math.random di init berulang)
let seed = 1337
const rand = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

// Palet bintang: putih perak → biru neon
const palette = [
  [232, 236, 245],
  [210, 228, 252],
  [56,189,248],
  [80,150,235],
]

function build() {
  const maxR = Math.hypot(W, H) * 0.52
  const ARMS = 3
  const TWIST = 3.4

  spiral = []
  const N = Math.min(1100, Math.floor((W * H) / 2600))
  for (let i = 0; i < N; i++) {
    const rr = Math.pow(rand(), 0.5)          // lebih padat di tengah
    const r = rr * maxR
    const arm = i % ARMS
    const scatter = (rand() - 0.5) * (0.5 + rr * 0.9)
    const baseAngle = arm * ((Math.PI * 2) / ARMS) + rr * TWIST * Math.PI + scatter
    const c = palette[(rand() * palette.length) | 0]
    spiral.push({
      r,
      a: baseAngle,
      size: 0.5 + rand() * 1.6 + (1 - rr) * 1.2,
      c,
      base: 0.35 + rand() * 0.6,
      tw: 0.5 + rand() * 2,
      ph: rand() * Math.PI * 2,
    })
  }

  field = []
  const M = Math.min(260, Math.floor((W * H) / 12000))
  for (let i = 0; i < M; i++) {
    field.push({
      x: rand() * W,
      y: rand() * H,
      size: rand() * 1.3 + 0.3,
      base: 0.2 + rand() * 0.5,
      tw: 0.5 + rand() * 2.5,
      ph: rand() * Math.PI * 2,
    })
  }
}

function resize() {
  const el = canvasEl.value
  if (!el) return
  DPR = Math.min(window.devicePixelRatio || 1, 2)
  W = window.innerWidth
  H = window.innerHeight
  el.width = W * DPR
  el.height = H * DPR
  el.style.width = W + 'px'
  el.style.height = H + 'px'
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  seed = 1337
  build()
}

function draw() {
  // Latar near-black kebiruan
  ctx.fillStyle = '#06080e'
  ctx.fillRect(0, 0, W, H)

  const cx = W * 0.5
  const cy = H * 0.46
  const tilt = -0.35
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt)
  const flat = 0.55 // pipihkan sumbu-y agar terasa piringan galaksi

  // Nebula lembut (redup)
  const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(W, H) * 0.5)
  neb.addColorStop(0, 'rgba(20,40,90, 0.08)')
  neb.addColorStop(0.35, 'rgba(12,25,60, 0.04)')
  neb.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = neb
  ctx.fillRect(0, 0, W, H)

  // Inti galaksi bercahaya (redup)
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.15)
  core.addColorStop(0, 'rgba(200,225,255, 0.28)')
  core.addColorStop(0.4, 'rgba(80,150,235, 0.10)')
  core.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = core
  ctx.beginPath()
  ctx.arc(cx, cy, Math.min(W, H) * 0.15, 0, Math.PI * 2)
  ctx.fill()

  // Bintang latar berkelip
  for (let i = 0; i < field.length; i++) {
    const s = field[i]
    const a = s.base * 0.75 * (0.6 + 0.4 * Math.sin(t * s.tw + s.ph))
    ctx.fillStyle = `rgba(224,238,255,${a})`
    ctx.fillRect(s.x, s.y, s.size, s.size)
  }

  // Bintang spiral (berputar mengelilingi inti)
  for (let i = 0; i < spiral.length; i++) {
    const s = spiral[i]
    const ang = s.a + rot
    let dx = Math.cos(ang) * s.r
    let dy = Math.sin(ang) * s.r * flat
    // Miringkan piringan
    const x = cx + dx * cosT - dy * sinT
    const y = cy + dx * sinT + dy * cosT
    const a = s.base * 0.68 * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph))
    ctx.fillStyle = `rgba(${s.c[0]},${s.c[1]},${s.c[2]},${a})`
    ctx.fillRect(x - s.size / 2, y - s.size / 2, s.size, s.size)
  }

  // Meteor jatuh (dengan ekor gradasi biru)
  for (let i = 0; i < meteors.length; i++) {
    const m = meteors[i]
    const mag = Math.hypot(m.vx, m.vy) || 1
    const ex = m.x - (m.vx / mag) * m.len
    const ey = m.y - (m.vy / mag) * m.len
    const g = ctx.createLinearGradient(m.x, m.y, ex, ey)
    g.addColorStop(0, `rgba(224,242,254,${0.9 * m.life})`)
    g.addColorStop(0.35, `rgba(56,189,248,${0.5 * m.life})`)
    g.addColorStop(1, 'rgba(56,189,248,0)')
    ctx.strokeStyle = g
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(m.x, m.y)
    ctx.lineTo(ex, ey)
    ctx.stroke()
    // Kepala meteor
    ctx.fillStyle = `rgba(255,255,255,${0.9 * m.life})`
    ctx.beginPath()
    ctx.arc(m.x, m.y, 1.7, 0, Math.PI * 2)
    ctx.fill()
  }
}

function spawnMeteor() {
  const fromLeft = Math.random() < 0.5
  const speed = 7 + Math.random() * 7
  meteors.push({
    x: Math.random() * W,
    y: -20 - Math.random() * H * 0.15,
    vx: (fromLeft ? 1 : -1) * speed * 0.85,
    vy: speed * 0.6,
    len: 120 + Math.random() * 160,
    life: 1,
  })
}

function updateMeteors() {
  if (Math.random() < 0.02 && meteors.length < 3) spawnMeteor()
  for (const m of meteors) {
    m.x += m.vx
    m.y += m.vy
    if (m.y > H * 0.65) m.life -= 0.02
  }
  meteors = meteors.filter((m) => m.life > 0 && m.y < H + 40 && m.x > -60 && m.x < W + 60)
}

function loop() {
  if (!prefersReduced) {
    rot += 0.00035
    t += 0.016
    updateMeteors()
  }
  draw()
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize, { passive: true })
  if (prefersReduced) draw()
  else loop()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <canvas ref="canvasEl" class="block"></canvas>
    <!-- Vignette lembut agar konten lebih fokus -->
    <div class="vignette"></div>
  </div>
</template>

<style scoped>
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.6) 100%);
}
</style>

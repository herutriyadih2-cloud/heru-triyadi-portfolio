<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* ============================================================
   DOTTED WORLD GLOBE — canvas 2D murni (tanpa library).
   Titik-titik membentuk benua, sphere berputar perlahan,
   dengan atmosfer/glow ungu. Ringan & self-contained.
   ============================================================ */

const canvasEl = ref(null)
let ctx = null
let raf = null
let ro = null

// Ukuran & state animasi
let W = 0, H = 0, DPR = 1, R = 0
let angle = 0
const TILT = -0.42 // kemiringan sumbu (utara sedikit menghadap kita)

// Titik dunia (unit vector) — dihitung sekali di onMounted
let points = []

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* --- Peta benua kasar (bounding boxes lat/lng) --- */
const LAND = [
  // North America
  [48, 70, -125, -62], [30, 49, -122, -75], [14, 30, -110, -86],
  // Greenland
  [60, 82, -48, -18],
  // South America
  [-5, 12, -80, -50], [-35, -5, -72, -40], [-55, -35, -73, -64],
  // Europe
  [40, 66, -9, 38], [36, 44, -9, 28], [50, 59, -8, 2],
  // Africa
  [12, 35, -16, 38], [-12, 12, 8, 42], [-35, -12, 12, 37], [-25, -12, 43, 50],
  // Middle East
  [15, 40, 35, 60],
  // Asia
  [40, 72, 40, 175], [20, 45, 45, 122], [8, 30, 68, 90], [5, 25, 95, 122],
  [31, 45, 130, 146],
  // Australia & islands
  [-38, -12, 114, 153], [-10, 8, 96, 140], [-47, -34, 166, 178],
]

function isLand(lat, lng) {
  for (const [la0, la1, lo0, lo1] of LAND) {
    if (lat >= la0 && lat <= la1 && lng >= lo0 && lng <= lo1) return true
  }
  return false
}

/* --- Bangun titik daratan via Fibonacci sphere --- */
function buildPoints() {
  points = []
  const N = 9000
  const GA = Math.PI * (3 - Math.sqrt(5)) // golden angle
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = i * GA
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    const lat = Math.asin(y) * (180 / Math.PI)
    const lng = Math.atan2(z, x) * (180 / Math.PI)
    if (isLand(lat, lng)) points.push({ x, y, z })
  }
}

function resize() {
  const el = canvasEl.value
  if (!el) return
  const rect = el.parentElement.getBoundingClientRect()
  DPR = Math.min(window.devicePixelRatio || 1, 2)
  W = rect.width
  H = rect.height
  el.width = W * DPR
  el.height = H * DPR
  el.style.width = W + 'px'
  el.style.height = H + 'px'
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
  R = Math.min(W, H) * 0.44
}

function draw() {
  ctx.clearRect(0, 0, W, H)
  const cx = W / 2
  const cy = H / 2

  // Atmosfer / glow emas di belakang bola (redup)
  const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.35)
  glow.addColorStop(0, 'rgba(37,99,235,0.10)')
  glow.addColorStop(0.55, 'rgba(30,58,138,0.05)')
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2)
  ctx.fill()

  // Piringan bola gelap (near-black kehijauan) agar titik "menempel" di permukaan
  const disk = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R)
  disk.addColorStop(0, 'rgba(16,20,30,0.55)')
  disk.addColorStop(1, 'rgba(6,9,16,0.7)')
  ctx.fillStyle = disk
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.fill()

  const cosA = Math.cos(angle), sinA = Math.sin(angle)
  const cosT = Math.cos(TILT), sinT = Math.sin(TILT)

  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    // Rotasi sumbu Y
    let x = p.x * cosA + p.z * sinA
    let z = -p.x * sinA + p.z * cosA
    let y = p.y
    // Kemiringan sumbu X
    const y2 = y * cosT - z * sinT
    const z2 = y * sinT + z * cosT
    if (z2 < 0) continue // hanya hemisfer depan

    const depth = (z2 + 1) / 2 // 0..1
    const sx = cx + x * R
    const sy = cy - y2 * R
    const s = Math.max(0.6, R * 0.0075 * (0.5 + depth))
    const a = 0.08 + 0.6 * depth
    // Warna: biru neon di depan, makin gelap ke tepi
    ctx.fillStyle = `rgba(${55 + depth * 45 | 0},${140 + depth * 75 | 0},${225 + depth * 25 | 0},${a})`
    ctx.fillRect(sx - s / 2, sy - s / 2, s, s)
  }
}

function loop() {
  if (!prefersReduced) angle += 0.0016
  draw()
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  buildPoints()
  resize()
  ro = new ResizeObserver(resize)
  ro.observe(canvasEl.value.parentElement)
  if (prefersReduced) {
    draw() // globe statis
  } else {
    loop()
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (ro) ro.disconnect()
})
</script>

<template>
  <canvas ref="canvasEl" class="block w-full h-full"></canvas>
</template>

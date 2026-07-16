<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

/* ============================================================
   TERMINAL INTERAKTIF
   Boot ala neofetch → lalu pengunjung bisa mengetik perintah.
   ============================================================ */

// Banner ASCII "HERU"
const banner = [
  ' _   _  _____  ____   _   _ ',
  '| | | || ____||  _ \\ | | | |',
  '| |_| ||  _|  | |_) || | | |',
  '|  _  || |___ |  _ < | |_| |',
  '|_| |_||_____||_| \\_\\ \\___/ ',
]

// Baris boot yang tampil bertahap
const bootScript = [
  { cls: 'cmd', text: 'whoami' },
  ...banner.map((b) => ({ cls: 'banner', text: b })),
  { cls: 'text-slate-400', text: '» herutriyadih2-cloud • Frontend Developer' },
  { cls: 'blank', text: '' },
  { cls: 'cmd', text: 'neofetch' },
  { cls: 'info', label: 'user', value: 'herutriyadih2-cloud' },
  { cls: 'info', label: 'role', value: 'Frontend Developer & UI/UX Designer' },
  { cls: 'info', label: 'location', value: 'Pontianak, Kalimantan Barat' },
  { cls: 'info', label: 'stack', value: 'Vue • Nuxt • Tailwind • Vite' },
  { cls: 'status', label: 'status', value: 'Available for hire' },
  { cls: 'blank', text: '' },
  { cls: 'text-slate-300', text: "Ketik 'help' lalu Enter untuk melihat perintah yang tersedia." },
  { cls: 'blank', text: '' },
]

// Baris yang sudah tampil di layar
const lines = ref([])
const ready = ref(false) // input aktif setelah boot selesai
const input = ref('')
const inputEl = ref(null)
const bodyEl = ref(null)
const rootEl = ref(null)

let timer = null
let started = false

const scrollToBottom = () => {
  nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
  })
}

const push = (arr) => {
  lines.value.push(...arr)
  scrollToBottom()
}

// --- Boot bertahap ---
const bootStep = (i) => {
  if (i >= bootScript.length) {
    ready.value = true
    scrollToBottom()
    return
  }
  lines.value.push(bootScript[i])
  scrollToBottom()
  const delay = bootScript[i].cls === 'banner' ? 70 : 150
  timer = setTimeout(() => bootStep(i + 1), delay)
}

const start = () => {
  if (started) return
  started = true
  timer = setTimeout(() => bootStep(0), 300)
}

/* ============================================================
   REGISTRY PERINTAH
   Tiap perintah mengembalikan array baris { cls, text }.
   ============================================================ */
const socials = [
  { k: 'GitHub', v: 'https://github.com/herutriyadih2-cloud' },
  { k: 'Instagram', v: 'https://instagram.com/betukuk09_' },
  { k: 'WhatsApp', v: 'https://wa.me/6285650871521' },
  { k: 'Email', v: 'mailto:herutriyadih2@gmail.com' },
]

const out = (text, cls = 'text-slate-300') => ({ cls, text })

const commands = {
  help: () => [
    out('Perintah yang tersedia:', 'text-cyan-400'),
    out('  help       — tampilkan daftar perintah ini'),
    out('  about      — tentang saya'),
    out('  whoami     — identitas singkat'),
    out('  skills     — tech stack yang saya kuasai'),
    out('  projects   — daftar proyek unggulan'),
    out('  contact    — cara menghubungi saya'),
    out('  social     — tautan media sosial'),
    out('  cv         — unduh CV (buka PDF)'),
    out('  neofetch   — info sistem'),
    out('  date       — tanggal & waktu sekarang'),
    out('  echo [x]   — cetak kembali teks x'),
    out('  robot      — 🤖'),
    out('  clear      — bersihkan layar'),
  ],
  about: () => [
    out('Heru Triyadi — Frontend Developer & UI/UX Designer.', 'text-slate-100'),
    out('Fokus pada ekosistem Vue.js, antarmuka modern, dan web yang cepat.'),
    out('Mengubah ide kreatif menjadi kode yang indah, responsif, dan interaktif.'),
  ],
  whoami: () => [out('herutriyadih2-cloud', 'text-green-400')],
  skills: () => [
    out('Tech Stack:', 'text-cyan-400'),
    out('  Vue 3 · Nuxt 3 · JavaScript · TypeScript', 'text-blue-300'),
    out('  Tailwind CSS · Sass · HTML5 · CSS3', 'text-blue-300'),
    out('  Vite · Git · Figma · VS Code', 'text-blue-300'),
  ],
  stack: () => commands.skills(),
  projects: () => [
    out('Proyek Unggulan:', 'text-cyan-400'),
    out('  1. E-Commerce Platform Modern    [Vue 3, Pinia, Vite]'),
    out('  2. SaaS Dashboard Analytics      [Vue 3, Chart.js, Nuxt]'),
    out('  3. AI Smart Property Platform    [Nuxt 3, Algolia]'),
    out('  4. UI/UX Design System           [Figma, Storybook]'),
    out("Tip: scroll ke bagian 'Proyek' untuk detail lengkap.", 'text-slate-500'),
  ],
  contact: () => {
    return [
      out('Mari terhubung! 👋', 'text-cyan-400'),
      out('  WhatsApp : wa.me/6285650871521', 'text-green-400'),
      out('  Email    : herutriyadih2@gmail.com', 'text-blue-400'),
      out("Menjalankan 'social' untuk semua tautan..."),
    ]
  },
  social: () => {
    return socials.map((s) => out(`  ${s.k.padEnd(10)}: ${s.v}`, 'text-blue-400'))
  },
  cv: () => {
    window.open('/CV-Heru-Triyadi.pdf', '_blank')
    return [out('Membuka CV-Heru-Triyadi.pdf ...', 'text-green-400')]
  },
  resume: () => commands.cv(),
  neofetch: () => [
    { cls: 'info', label: 'user', value: 'herutriyadih2-cloud' },
    { cls: 'info', label: 'role', value: 'Frontend Developer & UI/UX Designer' },
    { cls: 'info', label: 'location', value: 'Pontianak, Kalimantan Barat' },
    { cls: 'info', label: 'stack', value: 'Vue • Nuxt • Tailwind • Vite' },
    { cls: 'status', label: 'status', value: 'Available for hire' },
  ],
  date: () => [out(new Date().toString(), 'text-slate-200')],
  echo: (args) => [out(args.join(' ') || '')],
  robot: () => [
    { cls: 'banner', text: '   [•_•]   ' },
    { cls: 'banner', text: '  <|   |>  ' },
    { cls: 'banner', text: '   /   \\   ' },
    out('Beep boop! Selamat datang di dunia robot. 🤖', 'text-green-400'),
  ],
  sudo: () => [
    out('sudo: izin ditolak 😏 — kamu bukan root di sini.', 'text-rose-400'),
  ],
  hello: () => [out('Halo! 👋 Senang bertemu. Ketik "help" untuk mulai.', 'text-green-400')],
  hi: () => commands.hello(),
  ls: () => [
    out('home  about  skills  projects  contact', 'text-cyan-400'),
  ],
  clear: () => 'CLEAR',
}

const runCommand = () => {
  const raw = input.value.trim()
  // Echo perintah yang diketik
  lines.value.push({ cls: 'cmd', text: raw })
  input.value = ''

  if (raw) {
    history.push(raw)
    historyIdx = history.length
  }

  const [name, ...args] = raw.split(/\s+/)
  const key = (name || '').toLowerCase()

  if (!key) {
    scrollToBottom()
    return
  }

  const fn = commands[key]
  if (!fn) {
    push([
      out(`command not found: ${key}`, 'text-rose-400'),
      out("Ketik 'help' untuk daftar perintah.", 'text-slate-500'),
    ])
    return
  }

  const result = fn(args)
  if (result === 'CLEAR') {
    lines.value = []
    scrollToBottom()
    return
  }
  push(result)
}

// Riwayat perintah (ArrowUp / ArrowDown)
const history = []
let historyIdx = 0
const onKeydown = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (historyIdx > 0) {
      historyIdx--
      input.value = history[historyIdx] || ''
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIdx < history.length - 1) {
      historyIdx++
      input.value = history[historyIdx] || ''
    } else {
      historyIdx = history.length
      input.value = ''
    }
  }
}

const focusInput = () => {
  if (ready.value && inputEl.value) inputEl.value.focus()
}

const copyClone = () => {
  const text = 'git clone https://github.com/herutriyadih2-cloud'
  if (navigator.clipboard) navigator.clipboard.writeText(text)
}

onMounted(() => {
  if ('IntersectionObserver' in window && rootEl.value) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(rootEl.value)
  } else {
    start()
  }
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="terminal" class="py-16 px-6">
    <div ref="rootEl" class="max-w-3xl mx-auto">
      <div
        class="rounded-2xl overflow-hidden border border-slate-800 bg-[#0a0b0b] shadow-2xl shadow-blue-950/40 ring-1 ring-white/5"
      >
        <!-- Title bar -->
        <div class="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
          <span class="w-3 h-3 rounded-full bg-red-500/90"></span>
          <span class="w-3 h-3 rounded-full bg-yellow-400/90"></span>
          <span class="w-3 h-3 rounded-full bg-green-500/90"></span>
          <span class="ml-3 text-xs text-slate-500 font-mono truncate">
            heru@portfolio: ~/github
          </span>
          <button
            @click="copyClone"
            class="ml-auto text-[11px] text-slate-500 hover:text-slate-300 font-mono transition-colors"
            title="Salin perintah git clone"
          >
            copy&nbsp;clone
          </button>
        </div>

        <!-- Body (klik untuk fokus ke input) -->
        <div
          ref="bodyEl"
          @click="focusInput"
          class="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed h-[380px] overflow-y-auto terminal-body cursor-text"
        >
          <div v-for="(line, i) in lines" :key="i" class="whitespace-pre-wrap break-words">
            <!-- Command yang diketik -->
            <span v-if="line.cls === 'cmd'">
              <span class="text-green-400">heru@dev</span><span class="text-slate-500">:</span><span class="text-cyan-400">~$</span>
              <span class="text-slate-100"> {{ line.text }}</span>
            </span>

            <!-- Banner ASCII -->
            <span
              v-else-if="line.cls === 'banner'"
              class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold"
              >{{ line.text }}</span
            >

            <!-- Info key:value -->
            <span v-else-if="line.cls === 'info'">
              <span class="text-cyan-400">{{ line.label.padEnd(9) }}</span>
              <span class="text-slate-500">: </span>
              <span class="text-slate-200">{{ line.value }}</span>
            </span>

            <!-- Status dengan titik hijau -->
            <span v-else-if="line.cls === 'status'">
              <span class="text-cyan-400">{{ line.label.padEnd(9) }}</span>
              <span class="text-slate-500">: </span>
              <span class="text-green-400">{{ line.value }}</span>
              <span class="inline-block w-2 h-2 rounded-full bg-green-400 ml-1 animate-pulse align-middle"></span>
            </span>

            <!-- Baris kosong -->
            <span v-else-if="line.cls === 'blank'">&nbsp;</span>

            <!-- Output biasa (berwarna sesuai cls) -->
            <span v-else :class="line.cls">{{ line.text }}</span>
          </div>

          <!-- Baris input aktif -->
          <div v-if="ready" class="flex items-center">
            <span class="text-green-400">heru@dev</span><span class="text-slate-500">:</span><span class="text-cyan-400">~$</span>
            <input
              ref="inputEl"
              v-model="input"
              @keyup.enter="runCommand"
              @keydown="onKeydown"
              type="text"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              aria-label="Terminal input"
              class="flex-1 ml-2 bg-transparent border-none outline-none text-slate-200 caret-blue-400 font-mono"
            />
          </div>
        </div>
      </div>

      <p class="text-center text-xs text-slate-600 mt-3 font-mono">
        💡 Terminal interaktif — coba ketik <span class="text-slate-300">help</span>,
        <span class="text-slate-300">projects</span>, atau
        <span class="text-slate-300">contact</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
.terminal-body::-webkit-scrollbar {
  width: 6px;
}
.terminal-body::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 3px;
}
</style>

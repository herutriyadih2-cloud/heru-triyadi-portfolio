<script setup>
import { ref, reactive, computed } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)
const touched = reactive({ name: false, email: false, message: false })

const MAX_MESSAGE = 500

// Satu sumber kebenaran untuk nomor WhatsApp (format internasional tanpa +)
const PHONE_NUMBER = '6285650871521'

// --- Validasi ---
const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const errors = computed(() => ({
  name: !name.value.trim() ? 'Nama wajib diisi.' : '',
  email: !email.value.trim()
    ? 'Email wajib diisi.'
    : !emailValid.value
    ? 'Format email tidak valid.'
    : '',
  message: !message.value.trim() ? 'Pesan tidak boleh kosong.' : '',
}))
const isValid = computed(
  () => !errors.value.name && !errors.value.email && !errors.value.message
)

const handleSendMessage = () => {
  touched.name = touched.email = touched.message = true
  if (!isValid.value) return

  sending.value = true

  const rawText =
    `Halo Heru Dev,\n\n` +
    `Saya tertarik dengan jasa/portfolio Anda. Berikut detail pesan saya:\n\n` +
    `*Nama:* ${name.value}\n` +
    `*Email:* ${email.value}\n` +
    `*Pesan:* ${message.value}`

  const whatsappUrl =
    `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(rawText)}`

  window.open(whatsappUrl, '_blank')

  // Tampilkan konfirmasi, lalu reset
  sent.value = true
  name.value = ''
  email.value = ''
  message.value = ''
  touched.name = touched.email = touched.message = false
  sending.value = false

  setTimeout(() => (sent.value = false), 5000)
}
</script>

<template>
  <section id="contact" class="py-24 bg-slate-900/20 border-t border-slate-800/60">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Hubungi Saya</h2>
        <div class="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-400 mt-4 text-sm sm:text-base">
          Punya ide proyek menarik atau butuh jasa pembuatan website? Mari diskusikan bersama!
        </p>
      </div>

      <div class="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto">
        <!-- Banner sukses -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          leave-active-class="transition duration-200"
          leave-to-class="opacity-0"
        >
          <div v-if="sent" class="mb-6 flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 text-slate-300 rounded-xl px-4 py-3 text-sm">
            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Pesan disiapkan! WhatsApp terbuka di tab baru — tinggal tekan kirim. 🚀</span>
          </div>
        </Transition>

        <form @submit.prevent="handleSendMessage" novalidate class="space-y-6">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nama Lengkap</label>
            <input
              v-model="name"
              @blur="touched.name = true"
              type="text"
              placeholder="Masukkan nama Anda..."
              :class="[
                'w-full bg-black/40 border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm',
                touched.name && errors.name ? 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
              ]"
            />
            <p v-if="touched.name && errors.name" class="text-rose-400 text-xs mt-1.5">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Alamat Email</label>
            <input
              v-model="email"
              @blur="touched.email = true"
              type="email"
              placeholder="nama@email.com"
              :class="[
                'w-full bg-black/40 border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm',
                touched.email && errors.email ? 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
              ]"
            />
            <p v-if="touched.email && errors.email" class="text-rose-400 text-xs mt-1.5">{{ errors.email }}</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400">Isi Pesan / Rencana Proyek</label>
              <span class="text-[11px] tabular-nums" :class="message.length > MAX_MESSAGE ? 'text-rose-400' : 'text-slate-600'">{{ message.length }}/{{ MAX_MESSAGE }}</span>
            </div>
            <textarea
              v-model="message"
              @blur="touched.message = true"
              rows="4"
              :maxlength="MAX_MESSAGE"
              placeholder="Gambarkan secara singkat website atau sistem yang ingin Anda bangun..."
              :class="[
                'w-full bg-black/40 border rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm resize-none',
                touched.message && errors.message ? 'border-rose-500/70 focus:border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
              ]"
            ></textarea>
            <p v-if="touched.message && errors.message" class="text-rose-400 text-xs mt-1.5">{{ errors.message }}</p>
          </div>

          <button
            type="submit"
            :disabled="!isValid || sending"
            class="btn-neon w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-slate-100 font-bold rounded-xl transition-all active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Kirim ke WhatsApp
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
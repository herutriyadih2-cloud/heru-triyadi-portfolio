<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const handleSendMessage = () => {
  // 1. Tentukan nomor WhatsApp Mas Heru (Ganti dengan nomor aslimu, format wajib 62...)
  const phoneNumber = "6289512345678" 
  
  // 2. Susun template teks pesan otomatis agar terlihat profesional
  const textMessage = `Halo Heru Dev,%0A%0ASaya tertarik dengan jasa/portfolio Anda. Berikut detail pesan saya:%0A%0A*Nama:* ${name.value}%0A*Email:* ${email.value}%0A*Pesan:* ${message.value}`
  
  // 3. Gabungkan menjadi URL WhatsApp Gateway resmi
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${6285650871521}&text=${textMessage}`
  
  // 4. Buka tab baru menuju WhatsApp chat
  window.open(whatsappUrl, '_blank')
  
  // 5. Reset form setelah dikirim
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section id="contact" class="py-24 bg-slate-900/20 border-t border-slate-800/60">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Hubungi Saya</h2>
        <div class="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
        <p class="text-slate-400 mt-4 text-sm sm:text-base">
          Punya ide proyek menarik atau butuh jasa pembuatan website? Mari diskusikan bersama!
        </p>
      </div>

      <div class="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto">
        <form @submit.prevent="handleSendMessage" class="space-y-6">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nama Lengkap</label>
            <input 
              v-model="name"
              type="text" 
              required
              placeholder="Masukkan nama Anda..." 
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Alamat Email</label>
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="nama@email.com" 
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Isi Pesan / Rencana Proyek</label>
            <textarea 
              v-model="message"
              rows="4" 
              required
              placeholder="Gambarkan secara singkat website atau sistem yang ingin Anda bangun..." 
              class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.99]"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Kirim ke WhatsApp
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
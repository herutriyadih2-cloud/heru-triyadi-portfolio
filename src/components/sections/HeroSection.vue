<template>
  <section id="home" class="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="text-center max-w-3xl relative z-10">
      <div class="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide animate-pulse">
        <span>✨ Terbuka untuk Project & Kolaborasi</span>
      </div>
      
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
        Hai, Saya <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Heru Triyadi</span>
      </h1>
      
      <p class="text-xl sm:text-2xl text-slate-300 mb-6 font-medium tracking-wide">
        Frontend Developer | Vue.js Enthusiast | UI/UX Designer
      </p>
      
      <p class="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">
        Sangat menyukai dunia digital dan berdedikasi mentransformasikan ide-ide kreatif menjadi baris kode yang indah, responsif, serta interaktif guna memberikan pengalaman pengguna terbaik.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a href="#projects" class="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-1 text-center">
          Lihat Layanan & Proyek
        </a>
        <a href="#contact" class="w-full sm:w-auto border border-slate-700 hover:border-indigo-400 bg-slate-900/40 text-slate-300 px-8 py-3.5 rounded-xl font-semibold backdrop-blur-sm transition-colors text-center">
          Hubungi Saya
        </a>
      </div>
    </div>
  </section>
</template>
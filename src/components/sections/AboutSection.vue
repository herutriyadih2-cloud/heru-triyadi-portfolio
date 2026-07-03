<template>
  <section id="about" class="py-24 bg-slate-900/40 border-y border-slate-800/60">
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Tentang Saya</h2>
        <div class="h-1 w-12 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div class="grid md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-4 flex justify-center">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
            <div class="relative w-48 h-48 sm:w-56 sm:h-56 bg-slate-950 rounded-full overflow-hidden p-1">
              <img 
                src="https://images.weserv.nl/?url=github.com/herutriyadih2-cloud.png" 
                alt="Heru Triyadi" 
                class="w-full h-full object-cover rounded-full filter contrast-105"
              />
            </div>
          </div>
        </div>

        <div class="md:col-span-8 space-y-5 text-slate-300 leading-relaxed">
          <p class="font-medium text-xl text-indigo-300 flex items-center gap-2">
            Hi there! 👋 I'm Heru Triyadi
          </p>
          <p>
            Saya adalah seorang <strong class="text-white font-semibold">Frontend Developer</strong> dengan fokus kuat pada ekosistem <strong class="text-emerald-400 font-semibold">Vue.js</strong> dan <strong class="text-cyan-400 font-semibold">UI/UX Design</strong>. Saya sangat menyukai dunia digital dan senang mentransformasikan id intuitif ke dalam kode aplikasi nyata yang memberikan pengalaman pengguna terbaik.
          </p>
          <div class="pt-2 space-y-2 text-sm text-slate-400">
            <div class="flex items-center gap-2">🌱 <span class="text-slate-300">Currently exploring:</span> Advanced Vue Ecosystem & Modern UI</div>
            <div class="flex items-center gap-2">🤝 <span class="text-slate-300">Open for:</span> Jasa Web, SEO, & Aplikasi Baru</div>
          </div>
        </div>
      </div>

      <div class="mt-16 bg-[#1e293b]/50 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl backdrop-blur-sm max-w-3xl mx-auto">
        <h3 class="text-base font-bold uppercase tracking-wider mb-4 text-indigo-400">Informasi & Domisili</h3>
        <div class="grid sm:grid-cols-3 gap-6 text-sm">
          <div class="border-b sm:border-b-0 sm:border-r border-slate-800/80 pb-4 sm:pb-0 sm:pr-4">
            <span class="text-slate-500 block mb-1">Tempat, Tgl Lahir:</span>
            <span class="font-semibold text-slate-200">Pontianak, 22 Sep 2002</span>
          </div>
          <div class="border-b sm:border-b-0 sm:border-r border-slate-800/80 pb-4 sm:pb-0 sm:pr-4">
            <span class="text-slate-500 block mb-1">Lokasi Sekarang:</span>
            <span class="font-semibold text-slate-200">Pontianak, Kalimantan Barat</span>
          </div>
          <div>
            <span class="text-slate-500 block mb-1">Status Ketersediaan:</span>
            <span class="font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Available untuk Project
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
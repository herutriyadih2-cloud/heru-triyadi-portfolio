<script setup>
import { BrainCircuit, PenTool, Code2 } from 'lucide-vue-next'

const designer = ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Adobe XD', 'UI/UX']
const coder = ['Vue 3', 'Nuxt', 'TypeScript', 'Tailwind', 'Node.js', 'Git']
</script>

<template>
  <div class="mb-28">
    <div class="text-center mb-4" data-aos="fade-up">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Keahlian <span class="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">Saya</span> 💪
      </h2>
    </div>

    <!-- Otak AI menyala di tengah -->
    <div class="flex justify-center my-8" data-aos="zoom-in">
      <div class="relative w-40 h-40 flex items-center justify-center">
        <span class="brain-ring"></span>
        <span class="brain-ring brain-ring-2"></span>
        <BrainCircuit class="brain relative z-10 w-24 h-24 text-slate-300" />
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
      <!-- Designer -->
      <div
        class="group relative bg-slate-900/25 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-colors duration-300 text-center md:text-right"
        data-aos="fade-right"
      >
        <div class="flex items-center gap-3 justify-center md:justify-end mb-4">
          <h3 class="text-2xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Designer</h3>
          <div class="w-11 h-11 rounded-2xl bg-blue-500/10 text-slate-300 flex items-center justify-center group-hover:scale-110 transition-transform">
            <PenTool class="w-6 h-6" />
          </div>
        </div>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          Menguasai HTML, CSS, JavaScript, serta tools desain seperti Figma & Adobe XD. Kekuatan saya adalah memadukan estetika dengan fungsi untuk menghasilkan pengalaman pengguna yang mulus.
        </p>
        <div class="flex flex-wrap gap-2 justify-center md:justify-end">
          <span v-for="s in designer" :key="s" class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-slate-300 rounded-md text-xs font-medium">{{ s }}</span>
        </div>
      </div>

      <!-- Coder -->
      <div
        class="group relative bg-slate-900/25 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-colors duration-300 text-center md:text-left"
        data-aos="fade-left"
      >
        <div class="flex items-center gap-3 justify-center md:justify-start mb-4">
          <div class="w-11 h-11 rounded-2xl bg-blue-500/10 text-slate-300 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code2 class="w-6 h-6" />
          </div>
          <h3 class="text-2xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">Coder</h3>
        </div>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          Terampil dalam HTML, CSS, JavaScript, dan framework modern seperti Vue & Nuxt. Membangun aplikasi yang solid, cepat, dan skalabel dengan kode yang bersih.
        </p>
        <div class="flex flex-wrap gap-2 justify-center md:justify-start">
          <span v-for="s in coder" :key="s" class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-slate-300 rounded-md text-xs font-medium">{{ s }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Otak AI: berpendar berdenyut */
.brain {
  animation: brainGlow 2.6s ease-in-out infinite;
}
@keyframes brainGlow {
  0%, 100% {
    filter: drop-shadow(0 0 6px rgba(56,189,248,0.18));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(56,189,248,0.3));
    transform: scale(1.06);
  }
}

/* Cincin radar yang memancar dari otak */
.brain-ring {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 80px;
  height: 80px;
  border: 2px solid rgba(37,99,235, 0.4);
  border-radius: 50%;
  animation: brainPulse 2.8s ease-out infinite;
}
.brain-ring-2 {
  animation-delay: 1.4s;
}
@keyframes brainPulse {
  0% { transform: scale(0.6); opacity: 0.8; }
  100% { transform: scale(2.1); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .brain, .brain-ring { animation: none !important; }
  .brain-ring { opacity: 0.25; }
}
</style>

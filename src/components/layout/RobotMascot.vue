<script setup>
// Robot mascot orisinal (SVG + CSS). Ukuran diatur lewat prop `size`.
defineProps({
  size: { type: Number, default: 200 },
})
</script>

<template>
  <div class="robot-wrap" :style="{ width: size + 'px' }" aria-hidden="true">
    <!-- Bayangan lembut di bawah robot -->
    <div class="robot-shadow"></div>

    <svg
      class="robot"
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e0f2fe" />
          <stop offset="0.35" stop-color="#7dd3fc" />
          <stop offset="0.7" stop-color="#2563eb" />
          <stop offset="1" stop-color="#2563eb" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="botBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#211d16" />
          <stop offset="1" stop-color="#0c0a06" />
        </linearGradient>
        <linearGradient id="botFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0c0a06" />
          <stop offset="1" stop-color="#1a150c" />
        </linearGradient>
        <linearGradient id="botAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#7dd3fc" />
          <stop offset="1" stop-color="#22d3ee" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#a5f3fc" />
          <stop offset="1" stop-color="#2563eb" />
        </radialGradient>
      </defs>

      <!-- Antena -->
      <line x1="100" y1="34" x2="100" y2="14" stroke="url(#botAccent)" stroke-width="3" stroke-linecap="round" />
      <circle class="antenna-dot" cx="100" cy="10" r="6" fill="#7dd3fc" />

      <!-- Telinga / headphone kiri-kanan -->
      <rect x="24" y="70" width="14" height="42" rx="7" fill="url(#botAccent)" />
      <rect x="162" y="70" width="14" height="42" rx="7" fill="url(#botAccent)" />

      <!-- Kepala -->
      <rect x="38" y="34" width="124" height="104" rx="26" fill="url(#botBody)" stroke="#3a3320" stroke-width="2" />
      <!-- Layar wajah -->
      <rect x="52" y="50" width="96" height="72" rx="18" fill="url(#botFace)" stroke="#2a2418" stroke-width="2" />

      <!-- Mata (berkedip) -->
      <g class="eyes">
        <circle cx="80" cy="82" r="10" fill="url(#eyeGlow)" />
        <circle cx="120" cy="82" r="10" fill="url(#eyeGlow)" />
      </g>
      <!-- Senyum -->
      <path d="M84 104 Q100 116 116 104" stroke="#7dd3fc" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />

      <!-- Leher -->
      <rect x="90" y="138" width="20" height="12" fill="#3a3320" />

      <!-- Badan -->
      <rect x="56" y="150" width="88" height="56" rx="18" fill="url(#botBody)" stroke="#3a3320" stroke-width="2" />
      <!-- Panel dada -->
      <rect x="80" y="164" width="40" height="26" rx="6" fill="#0c0a06" stroke="#2a2418" stroke-width="1.5" />
      <circle class="chest-core" cx="100" cy="177" r="7" fill="url(#botAccent)" />

      <!-- Lengan -->
      <rect class="arm arm-left" x="40" y="156" width="12" height="34" rx="6" fill="url(#botAccent)" />
      <rect class="arm arm-right" x="148" y="156" width="12" height="34" rx="6" fill="url(#botAccent)" />

      <!-- ROKET: nozzle + semburan api -->
      <path d="M84 204 L116 204 L110 220 L90 220 Z" fill="#3a3320" stroke="#2a2418" stroke-width="1.5" />

      <!-- Percikan api -->
      <circle class="spark spark1" cx="94" cy="222" r="2.5" fill="#7dd3fc" />
      <circle class="spark spark2" cx="106" cy="222" r="2" fill="#a5f3fc" />
      <circle class="spark spark3" cx="100" cy="222" r="3" fill="#2563eb" />

      <!-- Api luar & dalam (berkobar) -->
      <g class="flame">
        <path d="M88 219 C 88 240, 94 250, 100 266 C 106 250, 112 240, 112 219 Z" fill="url(#flameGrad)" />
      </g>
      <g class="flame flame-inner">
        <path d="M93 219 C 93 234, 97 243, 100 254 C 103 243, 107 234, 107 219 Z" fill="#e0f2fe" opacity="0.9" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.robot-wrap {
  position: relative;
  margin: 0 auto;
}
.robot {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 12px 30px rgba(34,211,238,0.22));
  animation: float 5s ease-in-out infinite;
}

/* Melayang ala roket: naik-turun + sedikit goyang */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-1.5deg); }
  50% { transform: translateY(-16px) rotate(1.5deg); }
}

/* Kobaran api roket */
.flame {
  transform-origin: 100px 219px;
  animation: flame 0.26s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(56,189,248,0.3));
}
.flame-inner {
  animation-duration: 0.18s;
}
@keyframes flame {
  0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.95; }
  50% { transform: scaleY(1.3) scaleX(0.88); opacity: 1; }
}

/* Percikan api yang menyembur ke bawah */
.spark {
  animation: spark 0.9s linear infinite;
}
.spark2 { animation-duration: 0.7s; animation-delay: 0.15s; }
.spark3 { animation-duration: 1.1s; animation-delay: 0.3s; }
@keyframes spark {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(48px); opacity: 0; }
}

/* Mata berkedip berkala */
.eyes {
  transform-origin: center 82px;
  animation: blink 4.5s infinite;
}
@keyframes blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

/* Antena berpendar */
.antenna-dot {
  transform-origin: 100px 10px;
  animation: pulseDot 1.8s ease-in-out infinite;
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px #7dd3fc); }
  50% { opacity: 0.5; filter: drop-shadow(0 0 10px #7dd3fc); }
}

/* Inti dada berdenyut */
.chest-core {
  transform-origin: 100px 177px;
  animation: pulseDot 2.4s ease-in-out infinite;
}

/* Lengan melambai halus */
.arm-left { transform-origin: 46px 156px; animation: wave 3.5s ease-in-out infinite; }
.arm-right { transform-origin: 154px 156px; animation: wave 3.5s ease-in-out infinite reverse; }
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(8deg); }
}

.robot-shadow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 55%;
  height: 16px;
  background: radial-gradient(ellipse, rgba(34,211,238,0.3), transparent 70%);
  border-radius: 50%;
  animation: shadowPulse 5s ease-in-out infinite;
}
@keyframes shadowPulse {
  0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
  50% { transform: translateX(-50%) scale(0.82); opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .robot, .eyes, .antenna-dot, .chest-core, .arm, .robot-shadow, .flame, .spark {
    animation: none !important;
  }
}
</style>

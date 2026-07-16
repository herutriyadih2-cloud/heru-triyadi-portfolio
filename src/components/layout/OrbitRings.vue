<script setup>
// Cincin orbit konsentris + titik yang mengelilingi (nuansa "eclipse/tata surya")
const rings = [
  { size: 46, dur: 26, dir: 'normal' },
  { size: 64, dur: 38, dir: 'reverse' },
  { size: 82, dur: 52, dir: 'normal' },
  { size: 100, dur: 68, dir: 'reverse' },
]
</script>

<template>
  <div class="orbit-field" aria-hidden="true">
    <div
      v-for="(r, i) in rings"
      :key="i"
      class="orbit"
      :style="{
        width: r.size + '%',
        height: r.size + '%',
        animationDuration: r.dur + 's',
        animationDirection: r.dir,
      }"
    >
      <span class="orbit-dot"></span>
    </div>
  </div>
</template>

<style scoped>
.orbit-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px dashed rgba(37,99,235, 0.10);
  border-radius: 50%;
  animation-name: spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.orbit-dot {
  position: absolute;
  top: -3px;
  left: 50%;
  width: 7px;
  height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 8px 1px rgba(37,99,235, 0.5);
}
@keyframes spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .orbit { animation: none !important; }
}
</style>

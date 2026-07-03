<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>
</template>

<style scoped>
.stars, .stars2, .stars3 {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: block;
  background: transparent;
}

.stars {
  background: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px);
  background-size: 550px 550px;
  animation: moveStars 30s linear infinite;
}

.stars2 {
  background: radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px);
  background-size: 350px 350px;
  animation: moveStars 45s linear infinite;
}

.stars3 {
  background: radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px);
  background-size: 450px 450px;
  animation: moveStars 60s linear infinite;
}

@keyframes moveStars {
  from { transform: translateY(0); }
  to { transform: translateY(-550px); }
}
</style>
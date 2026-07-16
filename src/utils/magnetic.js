// Efek "magnetik": tombol ber-class .btn-neon sedikit tertarik ke arah kursor.
// Pakai event delegation di document, jadi otomatis berlaku untuk tombol
// yang muncul belakangan (mis. saat pindah halaman).
export function initMagnetic() {
  if (typeof window === 'undefined') return
  if (!window.matchMedia('(pointer: fine)').matches) return

  const strength = 0.25
  let current = null

  window.addEventListener(
    'mousemove',
    (e) => {
      const btn = e.target.closest ? e.target.closest('.btn-neon') : null
      if (btn) {
        const r = btn.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
        current = btn
      } else if (current) {
        current.style.transform = ''
        current = null
      }
    },
    { passive: true }
  )
}

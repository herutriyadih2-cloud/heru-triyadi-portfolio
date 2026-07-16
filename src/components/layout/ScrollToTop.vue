<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > 400
}
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="opacity-0 translate-y-4"
    leave-active-class="transition duration-200"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-show="visible"
      @click="toTop"
      aria-label="Kembali ke atas"
      class="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-1 hover:shadow-blue-500/50 transition-all"
    >
      <ArrowUp class="h-5 w-5" />
    </button>
  </Transition>
</template>

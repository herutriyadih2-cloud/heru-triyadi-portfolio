<script setup>
import { onMounted, nextTick } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import Footer from './components/layout/Footer.vue'
import FloatingBackground from './components/layout/FloatingBackground.vue'

import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  nextTick(() => {
    AOS.init({
      duration: 1200,      // Kita tambah durasi agar transisinya lebih pelan (1.2 detik)
      once: false,         // Set false agar animasi tetap jalan saat di-scroll bolak-balik
      easing: 'ease-in-out-sine', // Ini adalah tipe easing paling lembut untuk slide
      offset: 100          // Jarak trigger agar animasi muncul lebih awal
    })
    AOS.refresh()
  })
})
</script>

<template>
  <div class="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
    
    <FloatingBackground />

    <div class="relative z-10">
      <Navbar />
      
      <main>
        <HeroSection data-aos="fade-up" />
        <AboutSection data-aos="fade-up" data-aos-delay="100" />
        <SkillsSection data-aos="fade-up" data-aos-delay="100" />
        <ProjectsSection data-aos="fade-up" data-aos-delay="100" />
        <ContactSection data-aos="fade-up" data-aos-delay="100" />
      </main>

      <Footer />
    </div>
  </div>
</template>
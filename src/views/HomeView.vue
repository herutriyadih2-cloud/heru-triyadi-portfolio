<script setup>
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import TerminalPanel from '../components/sections/TerminalPanel.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
</script>

<template>
  <main>
    <HeroSection data-aos="fade-up" />
    <AboutSection data-aos="fade-up" data-aos-delay="100" />
    <StatsSection data-aos="fade-up" data-aos-delay="100" />
    <TerminalPanel data-aos="fade-up" data-aos-delay="100" />
    <SkillsSection data-aos="fade-up" data-aos-delay="100" />
    <ProjectsSection data-aos="fade-up" data-aos-delay="100" />
    <ContactSection data-aos="fade-up" data-aos-delay="100" />
  </main>
</template>

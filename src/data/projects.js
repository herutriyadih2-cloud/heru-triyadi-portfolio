// Sumber data proyek bersama — dipakai Beranda (featured) & halaman Galeri.
export const categories = ['Semua', 'Web App', 'Website', 'UI/UX', 'AI']

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform Modern',
    description:
      'Platform toko online komprehensif terintegrasi dengan sistem inventaris real-time, payment gateway, manajemen produk otomatis, serta optimasi SEO tingkat tinggi.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue 3', 'Tailwind CSS', 'Vite', 'Pinia'],
    category: 'Web App',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'SaaS Dashboard Analytics',
    description:
      'Sistem aplikasi visualisasi metrik data bisnis interaktif guna memonitor grafik penjualan, perilaku konversi konsumen, dan performa web secara live.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue 3', 'Chart.js', 'Nuxt.js', 'Tailwind'],
    category: 'Web App',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'AI Smart Property Platform',
    description:
      'Aplikasi pencarian properti dan rumah masa kini dengan rekomendasi berbasis AI, fitur peta interaktif, integrasi filter detail, serta mode gelap bawaan.',
    image: '/projects/ai-robot.webp',
    fallback: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    tags: ['Nuxt 3', 'Tailwind CSS', 'Algolia', 'VueUse'],
    category: 'AI',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'UI/UX Design System Case Study',
    description:
      'Transformasi dari desain komponen Figma ke bentuk kode komponen Vue yang reusable, konsisten, aksesibel (A11y), dan mendukung kustomisasi tema.',
    image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=800&auto=format&fit=crop',
    tags: ['Figma', 'Vue 3', 'Tailwind', 'Storybook'],
    category: 'UI/UX',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 5,
    title: 'Company Profile Website',
    description:
      'Website profil perusahaan modern yang cepat & responsif dengan animasi halus, section layanan, portofolio, dan formulir kontak terintegrasi WhatsApp.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue 3', 'Tailwind', 'AOS', 'Vite'],
    category: 'Website',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Landing Page Produk Digital',
    description:
      'Landing page konversi tinggi untuk peluncuran produk digital: hero interaktif, testimoni, tabel harga, dan animasi scroll yang menarik perhatian.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue 3', 'Tailwind', 'GSAP'],
    category: 'Website',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 7,
    title: 'Blog & Content Platform',
    description:
      'Platform blog dengan editor konten, kategori, pencarian real-time, mode gelap, serta optimasi SEO dan performa Lighthouse tinggi.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    tags: ['Nuxt 3', 'Tailwind', 'Markdown'],
    category: 'Web App',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 8,
    title: 'Mobile App Landing & Prototype',
    description:
      'Desain & prototipe aplikasi mobile lengkap di Figma, kemudian diwujudkan menjadi landing page interaktif dengan mockup animasi.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    tags: ['Figma', 'Vue 3', 'Tailwind'],
    category: 'UI/UX',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
  },
]

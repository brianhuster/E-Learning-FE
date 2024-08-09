const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],
  ssr: false,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_colors.scss" as *;',
        },
      },
    },
  },

  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@vite-pwa/nuxt',
  ],

  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
    ],
  },

  pinia: { storesDirs: ['./stores/**'] },

  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Ôn thi Bách Khoa',
      short_name: 'BKLearning',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/images/logo1.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '  /images/logo2.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/images/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      mockEnable: process.env.MOCK_ENABLE,
    },
  },

  compatibilityDate: '2024-07-25',
})
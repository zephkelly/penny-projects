export default defineNuxtConfig({
  scss: ['~/assets/global.scss'],
  buildModules: ['@nuxtjs/sass'],
  modules: ['nuxt-gtag'],
  gtag: {
    id: 'G-9X0EKVWFPG',
  },
});
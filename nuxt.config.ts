export default defineNuxtConfig({
  scss: ['~/assets/global.scss'],
  buildModules: ['@nuxtjs/sass'],
  head: {
    htmlAttrs: {
      lang: 'en'
    }
  }
})
export default defineNuxtConfig({
  scss: ['~/assets/global.scss'],
  buildModules: ['@nuxtjs/sass'],
  head: {
    meta: [
      { hid: 'og-image', property: 'og:image', content: 'https://pennyprojects.org/images/og-image.png' },
    ],
    htmlAttrs: {
      lang: 'en'
    },
  }
})
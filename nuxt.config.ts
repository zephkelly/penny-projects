export default defineNuxtConfig({
  scss: ['~/assets/global.scss'],
  buildModules: ['@nuxtjs/sass'],
  modules: ['nuxt-gtag'],
  gtag: {
    id: 'G-9X0EKVWFPG',
  },
  app: {
    head: {
        meta: [
      { charset: 'utf-8' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.pennyprojects.org/images/og-image.png',
      },
    ],
    }
  }
});
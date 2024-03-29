// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //@ts-ignore
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
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.pennyprojects.org',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Penny Projects',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Penny Projects - a community of people that help fund projects in developing countries.',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
      ],
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/mixins.scss" as *;',
        },
      },
    },
  }
})

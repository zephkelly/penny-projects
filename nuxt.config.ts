export default defineNuxtConfig({
  scss: ['~/assets/global.scss'],
  buildModules: ['@nuxtjs/sass'],
  modules: [
    ['nuxt-mail', {
      message: {
        to: process.env.GMAIL_USER,
      },
      smtp: {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD
        },
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
      },
    }],
  ],
  head: {
    htmlAttrs: {
      lang: 'en'
    }
  }
})
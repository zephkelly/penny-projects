// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    css: ['~/assets/scss/global.scss'],

    buildModules: ['@nuxtjs/sass'],
    modules: ['nuxt-gtag', "nuxt-tiptap-editor"],

    routeRules: {
        '/new/projects': { redirect: '/new/project' },
    },

    gtag: {
        id: 'G-9X0EKVWFPG',
    },

    nitro: {
        compressPublicAssets: true,
        externals: {
            inline: ['@/utils/legibleColor']
        },
    },

    app: {
        head: {
            meta: [
                { charset: 'utf-8' },
                //@ts-ignore
                { description: 'A community of people that help fund projects in developing countries.' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
                content: 'A community of people that help fund projects in developing countries.',
                },
                {
                hid: 'og:type',
                property: 'og:type',
                content: 'website',
                },
            ],
            htmlAttrs: { lang: 'en', },
        }
    },
    imports: {
        dirs: ['composables']
    },
    typescript: {
        typeCheck: true,
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/mixins.scss" as *;',
                },
            },
        },
    },
    runtimeConfig: {
        databaseConnectionString: process.env.POSTGRES_CONNECTION_STRING
    },

    compatibilityDate: '2024-07-12',
})
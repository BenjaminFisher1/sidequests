// https://nuxt.com/docs/api/configuration/nuxt-config
import {useRuntimeConfig} from "nuxt/app";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: [
      '@nuxtjs/supabase',
      '@nuxt/image',
      '@nuxt/icon',
      '@nuxt/ui',
    ],

    css: ['~/assets/css/main.css'],

    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: undefined,
            exclude: ['/'],
            saveRedirectToCookie: false,
        }
    }
})
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/ui",
    "nuxt-auth-utils",
    "@nuxtjs/leaflet",
    "@nuxtjs/seo",
  ],

  app: {
    head: {
      titleTemplate: "%s — %siteName",
      templateParams: {
        siteName: "sidequests!",
      },
    },
  },

  site: {
    url: process.env.NUXT_SITE_URL,
    name: "sidequests!",
  },

  auth: {
    webAuthn: true,
  },

  runtimeConfig: {
    // private values only available on server
    databaseUrl: process.env.DATABASE_URL,

    public: {
      siteUrl: process.env.SITE_URL,
    },
  },

  nitro: {
    preset: "bun",
    plugins: ["plugins/migrate.ts"],
  },

  css: ["~/assets/css/main.css"],
});

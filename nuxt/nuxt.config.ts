// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  auth: {
    provider: {
      type: "authjs",
    },
  },
  runtimeConfig: {
    discord: {
      clientId: process.env.NUXT_DISCORD_CLIENT_ID,
      clientSecret: process.env.NUXT_DISCORD_CLIENT_SECRET,
    },
  },
});

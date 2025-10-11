// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/eslint"],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "double",
        semi: true,
      },
    },
  },
});

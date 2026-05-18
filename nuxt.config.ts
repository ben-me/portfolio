export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["./app/assets/css/style.css"],
  app: {
    layoutTransition: { name: "layout" },
    pageTransition: { name: "slide-left" },
  },
  typescript: {
    typeCheck: true,
  },
  postcss: {
    plugins: {
      "postcss-preset-env": {
        stage: 3,
        features: {
          "custom-media-queries": true,
          "media-query-ranges": true,
          "nesting-rules": true,
        },
      },
    },
  },
  modules: ["@nuxt/image"],
});

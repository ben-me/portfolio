export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      emailjsServiceId: "",
      emailjsContactTemplateId: "",
      emailjsPublicKey: "",
    },
  },
  css: ["./app/assets/css/style.css"],
  app: {
    layoutTransition: { name: "layout" },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["vitest/globals"],
      },
    },
  },
  postcss: {
    plugins: {
      "@csstools/postcss-global-data": {
        files: ["./app/assets/css/variables.css"],
      },
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
  modules: ["@nuxt/image", "@nuxtjs/i18n", "@pinia/nuxt", "@nuxt/test-utils/module"],
  i18n: {
    customRoutes: "config",
    pages: {
      about: {
        de: "/ueber",
        en: "/about",
      },
      projects: {
        de: "/projekte",
        en: "/projects",
      },
      contact: {
        de: "/kontakt",
        en: "/contact",
      },
      imprint: {
        de: "/impressum",
        en: "/imprint",
      },
      privacy: {
        de: "/datenschutz",
        en: "/privacy",
      },
    },
    defaultLocale: "de",
    locales: [
      { code: "de", name: "Deutsch", file: "de.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
  },
  vite: {
    optimizeDeps: {
      include: ["valibot", "valibot", "@emailjs/browser"],
    },
  },
});

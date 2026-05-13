import postcssPresetEnv from "postcss-preset-env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["./app/assets/css/style.css"],
  typescript: {
    typeCheck: true,
  },
  postcss: {
    plugins: {
      "postcss-preset-env": postcssPresetEnv({
        stage: 3,
        features: {
          "custom-media-queries": true,
          "media-query-ranges": true,
          "cascade-layers": true,
          "nesting-rules": true,
        },
      }),
    },
  },
  modules: ["@nuxt/image"],
});

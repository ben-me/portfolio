import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["./app/assets/css/style.css"],
  app: {
    layoutTransition: { name: "layout" },
  },
  typescript: {
    typeCheck: true,
  },
  hooks: {
    "pages:extend": function (pages) {
      const originals = [...pages];
      for (const page of originals) {
        pages.push({
          ...page,
          name: page.name ? `${page.name}__en` : undefined,
          path: page.path === "/" ? "/en" : `/en${page.path}`,
        });
      }
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
  modules: ["@nuxt/image"],
  vite: {
    plugins: [
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./app/paraglide/",
        strategy: ["url", "baseLocale"],
      }),
    ],
    optimizeDeps: {
      include: ["valibot"],
    },
  },
});

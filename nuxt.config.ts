// https://nuxt.com/docs/api/configuration/nuxt-config
const immutable = {
  headers: { "cache-control": "public, max-age=31536000, immutable" },
};

export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  devtools: { enabled: true },
  modules: ["lenis/nuxt", "@nuxt/image", "@nuxt/fonts", "@nuxt/eslint"],
  css: ["~/assets/styles/main.scss"],

  fonts: {
    families: [
      {
        name: "EB Garamond",
        provider: "google",
        weights: ["400 800"],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },

  routeRules: {
    "/_ipx/**": immutable,
    "/images/**": immutable,
    "/projects/**": immutable,
    "/environment_maps/**": immutable,
    "/models/**": immutable,
  },

  app: {
    head: {
      htmlAttrs: { lang: "fr", prefix: "og: http://ogp.me/ns#" },
      link: [
        { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
        { rel: "canonical", href: "https://simondaguetkargl.fr" },
      ],
    },
  },
});

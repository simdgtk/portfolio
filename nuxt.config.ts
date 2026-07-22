// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  routeRules: {
    "/_ipx/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/images/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/projects/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/environment_maps/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/draco/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/models/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  },
  devtools: { enabled: true },
  modules: ["lenis/nuxt", "@nuxt/image"],
  css: ["~/assets/styles/main.scss"],
  app: {
    head: {
      title: "Simon Daguet-Kargl | Développeur web front-end Paris et Nantes",
      htmlAttrs: {
        lang: "fr",
        prefix: "og: http://ogp.me/ns#",
      },
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "robots", content: "all" },
        { name: "target", content: "all" },
        { name: "author", content: "Simon Daguet-Kargl" },
        { name: "owner", content: "Simon Daguet-Kargl" },
        { name: "url", content: "https://simondaguetkargl.fr" },
        { name: "identifier-URL", content: "https://simondaguetkargl.fr" },
        { name: "subject", content: "web developper" },
        {
          name: "description",
          content:
            "Portfolio de Simon Daguet-Kargl, je suis un développeur front-end basé sur Paris et Nantes. Découvrez mon portfolio de développeur frontend. Étudiant à Gobelins Paris.",
        },
        // Open Graph
        {
          property: "og:title",
          content: "Simon Daguet-Kargl | Développeur front-end Paris",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:description",
          content:
            "Portfolio de Simon Daguet-Kargl, je suis un développeur front-end basé sur Paris et Nantes. Découvrez mon portfolio de développeur frontend. Étudiant à Gobelins Paris.",
        },
        { property: "og:site_name", content: "Accueil" },
        { property: "og:url", content: "https://simondaguetkargl.fr" },
        { property: "og:locale", content: "fr" },
        { property: "og:image", content: "/favicon.jpg" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://simondaguetkargl.fr" },
        {
          name: "twitter:title",
          content: "Simon Daguet-Kargl | Développeur Front-end Paris",
        },
        {
          name: "twitter:description",
          content:
            "Portfolio de Simon Daguet-Kargl, je suis un développeur front-end basé sur Paris et Nantes. Découvrez mon portfolio de développeur frontend. Étudiant à Gobelins Paris.",
        },
        { name: "twitter:image", content: "/favicon.jpg" },
        // Mobile Web App
        { name: "mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-title",
          content: "Simon Daguet-Kargl | Développeur Front-end Paris",
        },
        { name: "apple-mobile-web-app-status-bar-style", content: "#000000" },
        { name: "theme-color", content: "#000000" },
      ],
      link: [
        { rel: "icon", type: "image/jpg", href: "/favicon.jpg" },
        {
          rel: "canonical",
          href: "https://simondaguetkargl.fr",
        },
      ],
    },
  },
});

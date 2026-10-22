<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SITE_URL = "https://simondaguetkargl.fr";
const description =
  "Portfolio de Simon Daguet-Kargl, je suis un développeur front-end basé sur Paris et Nantes. Découvrez mon portfolio de développeur frontend. Étudiant à Gobelins Paris.";

useSeoMeta({
  title: "Simon Daguet-Kargl | Développeur web front-end Paris et Nantes",
  description,
  author: "Simon Daguet-Kargl",
  ogTitle: "Simon Daguet-Kargl | Développeur front-end Paris",
  ogType: "website",
  ogDescription: description,
  ogSiteName: "Simon Daguet-Kargl",
  ogUrl: `${SITE_URL}/`,
  ogLocale: "fr_FR",
  ogImage: `${SITE_URL}/favicon.jpg`,
  ogImageAlt: "Simon Daguet-Kargl, développeur front-end",
  // l'image partagée est carrée (240px) : la grande carte Twitter la recadrerait
  twitterCard: "summary",
  twitterTitle: "Simon Daguet-Kargl | Développeur Front-end Paris",
  twitterDescription: description,
  twitterImage: `${SITE_URL}/favicon.jpg`,
  mobileWebAppCapable: "yes",
  appleMobileWebAppTitle: "Simon Daguet-Kargl | Développeur Front-end Paris",
  appleMobileWebAppStatusBarStyle: "black",
  themeColor: "#1A1A1A",
});

// Données structurées : aide Google à identifier la personne derrière le site
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Simon Daguet-Kargl",
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/favicon.jpg`,
        jobTitle: "Développeur front-end",
        email: "mailto:simondaguetkargl@gmail.com",
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Gobelins Paris" },
          { "@type": "CollegeOrUniversity", name: "MMI Bordeaux" },
        ],
        knowsAbout: ["Three.js", "WebGPU", "Vue.js", "Nuxt", "React", "Blender", "GSAP"],
        sameAs: [
          "https://github.com/simdgtk/",
          "https://www.behance.net/simdgtk",
          "https://www.linkedin.com/in/simon-daguet-kargl/",
        ],
      }),
    },
  ],
});

// Les soulignés des liens apparaissent une fois la scène 3D chargée (page d'accueil)
const route = useRoute();
const modelsLoaded = useModelsLoaded();
useHead({
  link: [{ rel: "canonical", href: () => `${SITE_URL}${route.path}` }],
  bodyAttrs: {
    class: () =>
      route.name !== "index" || modelsLoaded.value ? "models-loaded" : "",
  },
});

// Lenis piloté par le ticker GSAP, ScrollTrigger synchronisé sur le scroll Lenis
const lenis = useLenis(ScrollTrigger.update);
// pas de scroll lissé si l'utilisateur a demandé de réduire les animations
const reducedMotion = ref(false);
const lenisOptions = computed(() => ({ infinite: true, smoothWheel: !reducedMotion.value }));
const update = (time: number) => lenis.value?.raf(time * 1000);

onMounted(() => {
  reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);
});
onBeforeUnmount(() => gsap.ticker.remove(update));
</script>

<template>
  <VueLenis root :auto-raf="false" :options="lenisOptions" />
  <div class="main-container">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.main-container {
  height: 100%;
}
</style>

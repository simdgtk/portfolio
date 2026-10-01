<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const description =
  "Portfolio de Simon Daguet-Kargl, je suis un développeur front-end basé sur Paris et Nantes. Découvrez mon portfolio de développeur frontend. Étudiant à Gobelins Paris.";

useSeoMeta({
  title: "Simon Daguet-Kargl | Développeur web front-end Paris et Nantes",
  description,
  author: "Simon Daguet-Kargl",
  ogTitle: "Simon Daguet-Kargl | Développeur front-end Paris",
  ogType: "website",
  ogDescription: description,
  ogSiteName: "Accueil",
  ogUrl: "https://simondaguetkargl.fr",
  ogLocale: "fr",
  ogImage: "https://simondaguetkargl.fr/favicon.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Simon Daguet-Kargl | Développeur Front-end Paris",
  twitterDescription: description,
  twitterImage: "https://simondaguetkargl.fr/favicon.jpg",
  mobileWebAppCapable: "yes",
  appleMobileWebAppTitle: "Simon Daguet-Kargl | Développeur Front-end Paris",
  appleMobileWebAppStatusBarStyle: "black",
  themeColor: "#000000",
});

// Les soulignés des liens apparaissent une fois la scène 3D chargée (page d'accueil)
const route = useRoute();
const modelsLoaded = useModelsLoaded();
useHead({
  bodyAttrs: {
    class: () =>
      route.name !== "index" || modelsLoaded.value ? "models-loaded" : "",
  },
});

// Lenis piloté par le ticker GSAP, ScrollTrigger synchronisé sur le scroll Lenis
const lenis = useLenis(ScrollTrigger.update);
const update = (time: number) => lenis.value?.raf(time * 1000);

onMounted(() => {
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);
});
onBeforeUnmount(() => gsap.ticker.remove(update));
</script>

<template>
  <VueLenis root :auto-raf="false" :options="{ infinite: true }" />
  <div class="main-container">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.main-container {
  height: 100%;
}
</style>

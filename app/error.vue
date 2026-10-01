<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const title = computed(() =>
  props.error.statusCode === 404 ? "Page non trouvée..." : "Une erreur est survenue...",
);

useSeoMeta({
  title: () => `${title.value} - Simon Daguet-Kargl`,
  robots: "noindex, nofollow",
});
</script>

<template>
  <main class="error-page">
    <GrainFixed />
    <HeaderText />
    <div class="error-page__content">
      <h1>{{ title }}</h1>
      <button type="button" class="error-page__back" @click="clearError({ redirect: '/' })">
        Retour à l'accueil
      </button>
    </div>
    <LinksList />
    <GridBackground />
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/utils" as *;

.error-page {
  width: 100%;

  &__content {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    h1 {
      position: relative;
      z-index: 10;
      margin: 0;
      font-size: max(2.5rem, 5vw);
      letter-spacing: -0.2vw;
      white-space: nowrap;

      @media screen and (max-width: 930px) {
        font-size: 8.25vw;
      }

      @media screen and (max-width: 360px) {
        font-size: 13vw;
      }
    }
  }

  &__back {
    position: relative;
    z-index: 10;
    cursor: pointer;
    font-size: toRem(16);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
}
</style>

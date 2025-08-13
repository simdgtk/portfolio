<template>
  <section class="legal">
    <div class="legal__container">
      <h1 class="legal__title">Mentions légales</h1>

      <NuxtLink to="/" class="legal__link legal__back" title="retour au portfolio">Retour au portfolio</NuxtLink>

      <div class="legal__block legal__editor">
        <h3 class="legal__subtitle">Éditeur</h3>
        <p class="legal__text">
          Simon Daguet-Kargl<br>
          mail : <a href="mailto:simondaguetkargl@gmail.com" class="legal__link"
            title="ouverture d'un service de mail">simondaguetkargl@gmail.com</a>
        </p>
      </div>

      <div class="legal__block legal__hosting">
        <h3 class="legal__subtitle">Hébergeur</h3>
        <p class="legal__text">
          Netlify, Inc.<br>
          44 Montgomery Street, Suite 300, San Francisco, CA 94104
        </p>
      </div>

      <div class="legal__block">
        <p class="legal__text">
          Dernière mise à jour : avril 2025
        </p>
      </div>
      <div class="legal__block legal__hosting">
        <h3 class="legal__subtitle">Crédits</h3>
        <p class="legal__text">
          <a href="https://medium.com/@alexandre.pujol/ascii-hover-effect-with-shader-and-post-processing-part-1-589064c33385" target="_blank" rel="noopener noreferrer">ASCII Hover effect with shader and post-processing - Alexandre PUJOL</a>
        </p>
      </div>
    </div>
  </section>

</template>
<style lang="scss" scoped>
.legal {
  // max-width: 750px;
  max-height: 100dvh;
  overflow: auto;
  margin: 0 auto;

  &__container {
    max-width: 750px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  &__title {
    font-size: 3rem;
    // font-weight: 600;
    margin-bottom: 1rem;
  }

  &__block {
    margin-bottom: 1.5rem;
  }

  &__subtitle {
    font-size: 2rem;
  }

  &__text {
    margin: 0;
  }

  &__back {
    display: inline-block;
    margin-bottom: 1rem;
  }
}
</style>

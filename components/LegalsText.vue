<template>
  <section class="legal">
    <div class="legal__container">
      <h2 class="legal__title">Mentions légales</h2>

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
          Vercel Inc.<br>
          440 N Barranca Ave #4133 Covina, CA 91723, États-Unis
        </p>
      </div>

      <div class="legal__block">
        <p class="legal__text">
          Dernière mise à jour : avril 2025
        </p>
      </div>
    </div>
  </section>

</template>
<style lang="scss" scoped>
.legal {
  // max-width: 750px;
  max-height: 100vh;
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

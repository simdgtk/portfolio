<template>
  <div class="header">
    <span class="header__text"
      >Simon Daguet-Kargl - développement web front-end / web créatif & étudiant
      à
      <a
        href="https://www.gobelins.fr/design/formations/di51-expert-creation-numerique-interactive"
        target="_blank"
        rel="noopener noreferrer"
        title="nouvelle fenêtre, site de Gobelins"
        translate="no"
        >Gobelins Paris</a
      >, ex
      <a
        href="https://www.mmibordeaux.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="nouvelle fenêtre, site de MMI Bordeaux"
        translate="no"
        >MMI Bordeaux</a
      >
    </span>
  </div>
</template>
<style lang="scss" scoped>
@use "~/assets/styles/utils" as *;

.header {
  position: absolute;
  z-index: 11;
  top: 0;
  left: 0;
  padding: 5px 10px;
  padding-right: 100px;

  &__text {
    font-size: toRem(16);
    font-style: normal;
    font-weight: 400;
  }

  a {
    @media screen and (max-width: 768px) {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;

      &::after {
        content: "";
      }
    }
  }
}
</style>

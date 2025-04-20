<template>
  <a href="https://grand-budapest.vercel.app/" target="_blank" class="project-card">
    <div class="project-card__background">
      <img class="project-card__background__image" src="@/assets/images/holographic_texture.webp" alt="" />
    </div>
    <div class="project-card__else">
      <div class="project-card__image-container">
        <img class="project-card__image" src="@/assets/images/project_budapest.webp" alt="Site Grand budapest hôtel" />
      </div>
      <div class="project-card__separator"></div>
      <div class="project-card__text">
        <h2 class="project-card__text__title">Application web avec Ruby on Rails</h2>
        <p class="project-card__text__description">
          Projet scolaire, les visiteurs du musée créent leur salle en 3D, qui s'ajoute ensuite à une fresque
          collaborative.</p>
        <div class="project-card__text__tags">
          <span class="project-card__text__tags__tag">React Three Fiber</span>
          <span class="project-card__text__tags__tag">Front / Back</span>
        </div>
      </div>
    </div>
  </a>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_utils' as *;
@use '@/assets/styles/_variables' as *;

.project-card {
  text-decoration: none;
  width: fit-content;
  height: fit-content;
  padding: 16px;
  background: #fff;
  color: $black;
  display: flex;
  gap: 1rem;
  overflow: hidden;
  position: relative;

  &__background {
    position: absolute;
    user-select: none;
    top: -10%;
    left: 0;
    width: 110%;
    height: 110%;
    z-index: 2;
    opacity: 0.39;
    overflow: hidden;
    border-radius: 16px;
  }

  &__background__image {
    user-select: none;
    pointer-events: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__else {
    z-index: 3;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  &__image-container {
    // min-width: toRem(250);
    max-width: toRem(300);
    width: fit-content;
    height: fit-content;
    aspect-ratio: 4/3;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: toRem(300);
    height: 100%;
    padding: 16px 12px;
    // gap: auto;

    &__title {
      font-weight: 500;
      font-size: toRem(20);
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 0.2rem;
      line-height: 130%;
    }

    &__description {
      font-weight: 400;
      font-size: toRem(16);
      line-height: 95.3%;
      text-align: justify;
      margin-top: 0.5rem;
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 0.5rem;

      &__tag {
        font-weight: 400;
        font-size: toRem(14);
        line-height: 95.3%;
        padding: 6px 12px;
        background: $white;
        border: 1px solid $black;
        border-radius: 9000px;
        color: $black;
        filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 1));
      }
    }

  }

  &__separator {
    width: 1px;
    height: 100%;
    margin-left: 12px;
    // background: $gray-border;
    border-left: 1px dashed $gray-border;
  }

}
</style>

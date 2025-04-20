<template>
  <div class="project-card">
    <div class="project-card__image-container">
      <img class="project-card__image" src="@/assets/images/project_budapest.webp" alt="Site Grand budapest hôtel" />
    </div>
    <div class="project-card__text">
      <h3 class="project-card__text__title">Fresque numérique collaborative</h3>
      <p class="project-card__text__description">
        React three Fiber, Front / Back
      </p>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_utils' as *;
@use '@/assets/styles/_variables' as *;

.project-card {
  width: fit-content;
  padding: 8px;
  background: url('@/assets/images/holographic_texture.webp') center / cover no-repeat;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: toRem(265);

  &__image-container {
    width: 100%;
    height: toRem(220);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    color: $black;
    padding-left: 8px;

    &__title {
      width: fit-content;
      font-size: toRem(24);
      line-height: 97%;
    }

    &__description {
      font-size: toRem(16);
      text-transform: lowercase;
    }
  }
}
</style>

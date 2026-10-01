<script setup lang="ts">
const EMAIL = "simondaguetkargl@gmail.com";

const mailLabel = ref(EMAIL);
let copyTimeout: ReturnType<typeof setTimeout> | undefined;

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    mailLabel.value = "Mail copié !";
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => (mailLabel.value = EMAIL), 2000);
  } catch (error) {
    console.error("Failed to copy email: ", error);
  }
};

onBeforeUnmount(() => clearTimeout(copyTimeout));
</script>

<template>
  <div class="links-list">
    <ul>
      <li>
        <a href="/simon_daguet_kargl_cv.pdf" target="_blank" rel="noopener" title="nouvelle fenêtre, mon CV">CV</a>
      </li>
      <li>
        <a
href="https://github.com/simdgtk/" target="_blank" rel="noopener"
          title="nouvelle fenêtre, mon Github">Github</a>
      </li>
      <li>
        <a
href="https://www.behance.net/simdgtk" target="_blank" rel="noopener"
          title="nouvelle fenêtre, mon Behance">Behance</a>
      </li>
      <li>
        <a
href="https://www.linkedin.com/in/simon-daguet-kargl/" target="_blank" rel="noopener"
          title="nouvelle fenêtre, mon Linkedin">Linkedin</a>
      </li>
      <li>
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
      </li>
      <li>
        <a href="tel:0768442459" title="ouverture d'un service téléphonique">+(33)7 68 44 24 59</a>
      </li>
      <li>
        <button type="button" class="links-list__mail" title="copier le mail" @click="copyEmail">
          {{ mailLabel }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/utils" as *;

.links-list {
  position: absolute;
  z-index: 11;
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: toRem(16);
  font-style: normal;
  font-weight: 400;
  text-align: right;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;

    li {
      margin-top: 8px;
    }
  }

  &__mail {
    text-align: right;
    width: fit-content;
    cursor: pointer;
  }
}
</style>

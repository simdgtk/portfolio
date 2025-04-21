<script setup>
import { ref, onMounted } from 'vue';

const mail = ref(null);
const copyToClipboard = () => {
  navigator.clipboard.writeText(mail.value.innerText)
    .then(() => {
      mail.value.innerText = 'Mail copié !';
      setTimeout(() => {
        mail.value.innerText = 'simondaguetkargl@gmail.com';
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy email: ', err);
    });
};
onMounted(() => {
  mail.value.addEventListener('click', copyToClipboard);
});
</script>

<template>
  <div class="links-list">
    <ul>
      <li>
        <a href="/simon_daguet_kargl_cv.pdf" target="_blank" title="nouvelle fenêtre, mon CV">CV</a>
      </li>
      <li>
        <a href="https://github.com/simdgtk/" target="_blank" rel="noopener"
          title="nouvelle fenêtre, mon Github">Github</a>
      </li>
      <li>
        <a href="https://www.behance.net/simdgtk" target="_blank" rel="noopener"
          title="nouvelle fenêtre, mon Behance">Behance</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/simon-daguet-kargl/" target="_blank" rel="noopener"
          title="nouvelle fenêtre, mon Linkedin">Linkedin</a>
      </li>
      <li>
        <NuxtLink to="/legals">Mentions légales</NuxtLink>
      </li>
      <li>
        <a href="tel:0768442459" title="ouverture d'un service téléphonique">+(33)7 68 44 24 59</a>
      </li>
      <li>
        <p class="links-list__mail" ref="mail" title="copier le mail">simondaguetkargl@gmail.com
        </p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_utils' as *;

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

      a,
      p {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;

        position: relative;
        text-decoration: none;
        color: inherit;

      }
    }
  }

  &__mail {
    text-align: right;
    width: fit-content;
    cursor: pointer;
  }
}
</style>

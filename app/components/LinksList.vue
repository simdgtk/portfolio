<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const mail = ref(null);
let copyTimeout = null;

const copyToClipboard = () => {
  navigator.clipboard.writeText(mail.value.innerText)
    .then(() => {
      mail.value.innerText = 'Mail copié !';
      if (copyTimeout) clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        if (mail.value) {
          mail.value.innerText = 'simondaguetkargl@gmail.com';
        }
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy email: ', err);
    });
};
onMounted(() => {
  if (mail.value) {
    mail.value.addEventListener('click', copyToClipboard);
  }
});

onUnmounted(() => {
  if (mail.value) {
    mail.value.removeEventListener('click', copyToClipboard);
  }
  if (copyTimeout) clearTimeout(copyTimeout);
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
        <NuxtLink to="/mentions-legales">Mentions légales</NuxtLink>
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
    }
  }

  &__mail {
    text-align: right;
    width: fit-content;
    cursor: pointer;
  }
}
</style>

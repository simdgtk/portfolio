<template>
  <a :href="link" target="_blank" class="project-card" :id="id">
    <div class="project-card__background">
      <img class="project-card__background__image" loading="lazy" src="@/assets/images/holographic_texture.webp"
        alt="" />
    </div>
    <div class="project-card__else">
      <div class="project-card__image-container">
        <img class="project-card__image" :src="image" :alt="imageAlt" loading="lazy" />
      </div>
      <div class="project-card__separator"></div>
      <div class="project-card__text">
        <h2 class="project-card__text__title">{{ title }}</h2>
        <p class="project-card__text__description">
          {{ description }}</p>
        <div class="project-card__text__tags">
          <span v-for="(tag, index) in tags" :key="index" class="project-card__text__tags__tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  link: String,
  image: String,
  imageAlt: String,
  title: String,
  description: String,
  tags: Array,
  container: Object,
  id: String,
  keynumber: Number,
})
onMounted(() => {
  setTimeout(() => {
    console.log(props.keynumber);
    const triggerElement = props.container;
    if (triggerElement) {
      console.log("triggerElement", triggerElement)
      gsap.fromTo(`#${props.id}`, {
        transform: props.keynumber % 2 ? "rotate(20deg)" : "rotate(-13deg)",
      }, {
        transform: props.keynumber % 2 ? "rotate(3deg)" : "rotate(-2deg)",
        // x: "-25%",
        // transform: "rotate(0deg)",

        // stagger: 0.1,
        scrollTrigger: {
          trigger: `#${props.id}`,
          start: "top 100%",
          end: "center 20%",
          scrub: true,
          // markers: true,
          // pin: true,
          // pinSpacing: false,
          // anticipatePin: 1,
          // invalidateOnRefresh: true,
          // onEnterBack: () => gsap.to(".project-card", { y: -100, duration: 0.5 }),
        },
        ease: "power1.inOut",
      });
    }
  }, 1000)
})

</script>
<style lang="scss" scoped>
@use '@/assets/styles/_utils' as *;
@use '@/assets/styles/_variables' as *;

.container {
  height: 100vh;
  display: flex;
  align-items: center;
}

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
  pointer-events: all;
  // cursor: url('@/assets/images/cursor.svg') 25 25, auto;
  // cursor: none;



  &::after {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeat url('@/assets/images/grain.webp');
    z-index: 20;
    opacity: 0.5;
    image-rendering: pixelated;
  }

  &__background {
    position: absolute;
    user-select: none;
    top: -10%;
    left: -10%;
    width: 110%;
    height: 110%;
    z-index: 2;
    opacity: 0.39;
    overflow: hidden;

    // grain

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

    @media screen and (max-width: 930px) {
      flex-direction: column;
    }
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
      text-decoration-thickness: 1px;
      text-underline-offset: 0.2rem;
      line-height: 130%;
    }

    &__description {
      font-weight: 400;
      font-size: toRem(16);
      line-height: 95.3%;
      text-align: left;
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

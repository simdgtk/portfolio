<script setup>
</script>

<template>
  <div class="centered-text">
    <div class="centered-text__title-container">
      <div class="centered-text__title-container__title">
        <h2 translate="no">Simon</h2>
        <h2 translate="no">Daguet-Kargl</h2>
      </div>
      <span class="centered-text__title-container__info centered-text__title-container__info--alternance">En recherche
        d’alternance à partir de septembre 2025</span>
      <img src="@/assets/images/earth.svg" alt=""
        class="centered-text__title-container__img centered-text__title-container__img--earth" width="34" height="34" />
      <span class="centered-text__title-container__info centered-text__title-container__info--wawww">Actuellement
        @<a href="https://www.wawww.studio/fr" target="_blank" title="nouvelle fenêtre, Studio WAWWW"
          translate="no">WAWWW</a>
        (stage)</span>
      <span class="centered-text__title-container__info centered-text__title-container__info--stack"
        translate="no">Blender, <br />
        Three.js, Sass,<br /> Vue.js, Nuxt, React</span>
      <span class="centered-text__title-container__info centered-text__title-container__info--main">Bordeaux,
        Nantes. Développeur front-end</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math';
@use '@/assets/styles/_utils' as *;
@use '@/assets/styles/variables.scss' as *;

.centered-text {
  z-index: 10;
  width: 100vw;
  overflow: hidden;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &__title-container {
    z-index: 10;
    position: relative;

    &__title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h2 {
        letter-spacing: -0.375vw;
        z-index: 10;
        color: white;
        margin: 0;
        font-size: 7.5vw;
        white-space: nowrap;

        @media screen and (max-width: 1500px) {
          font-size: calc(7.5vw * 1.5);
        }

        @media screen and (max-width: 930px) {
          // font-size: calc(7.5vw * 2.45);
          font-size: toRem(68);
        }

        &:last-child {
          margin-top: -3.5vw;
          z-index: 9;

          @media screen and (max-width: 1500px) {
            margin-top: calc(-3.5vw *1.5);
          }

          @media screen and (max-width: 930px) {
            // margin-top: calc(-3.5vw *2.45);
            margin-top: toRem(-32);
          }
        }
      }
    }

    &__info {
      position: absolute;
      font-weight: 400;
      font-size: clamp(1vw, 16px, 1.3vw);
      // font-size: 1.3vw;
      line-height: 97%;
      font-style: italic;

      // @media screen and (max-width: 1200px) {
      //   font-size: calc(1vw * 1.5);
      // }

      @media screen and (max-width: 1200px) {
        font-size: min(16px, calc(1vw * 2.3));
      }

      @media screen and (max-width: 930px) {
        font-size: 16px;
      }

      &--alternance {
        top: 28%;
        left: 0%;
        width: 34%;

        @media screen and (max-width: 1500px) {
          width: 29%;
        }

        @media screen and (max-width: 1200px) {
          top: 20%;
        }

        @media screen and (max-width: 930px) {
          top: -2%;
          left: 1%;
        }
      }

      &--wawww {
        top: 55%;
        left: 16%;
        z-index: 10;

        a {
          letter-spacing: -2px;
        }

        @media screen and (max-width: 1500px) {
          left: 16%;
        }

        @media screen and (max-width: 930px) {
          top: 133%;
          width: 100%;
          left: 0%;
          text-align: center;
        }
      }

      &--stack {
        // width: 20%;
        top: 39%;
        right: 3%;

        @media screen and (max-width: 1500px) {
          top: 41%;
          right: 4%;
        }

        @media screen and (max-width: 930px) {
          top: 5%;
          width: 30%;
          right: -8%;
        }
      }

      &--main {
        font-weight: 400;
        font-style: normal;
        bottom: -1%;
        left: 36%;


        @media screen and (max-width: 1500px) {
          bottom: 1%;
          left: 35%;
        }

        @media screen and (max-width: 930px) {
          left: 9%;
          bottom: -28%;
          transform: rotate(-1.71deg);
          background-color: $light-gray;
          padding: 15px 17px;
          color: $black;
        }
      }
    }

    &__img {
      position: absolute;
      user-select: none;
      pointer-events: none;
      z-index: 0;
      top: 53.6%;
      left: 55%;
      transform: rotate(-20.97deg);
      width: 1.9vw;
      height: 1.9vw;

      @media screen and (max-width: 1500px) {
        width: calc(1.9vw * 1.5);
        height: calc(1.9vw * 1.5)
      }

      @media screen and (max-width: 930px) {
        // width: calc(1.9vw * 2.3);
        // height: calc(1.9vw * 2.3)
        width: toRem(18);
        height: toRem(18);
      }
    }
  }
}
</style>

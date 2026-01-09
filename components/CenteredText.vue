<script setup>
</script>

<template>
  <div class="centered-text">
    <div class="centered-text__title-container">
      <div class="centered-text__title-container__title">
        <h1 translate="no">Simon</h1>
        <h1 translate="no">Daguet-Kargl</h1>
      </div>
      <span class="centered-text__title-container__info centered-text__title-container__info--alternance"></span>
      <svg width="34" height="34" alt="" role="presentation"
        class="centered-text__title-container__img centered-text__title-container__img--earth"
        viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.374 0.344238C14.0117 0.344238 10.725 1.34127 7.92934 3.20925C5.1337 5.07724 2.95477 7.73228 1.66808 10.8386C0.381389 13.945 0.0447327 17.3631 0.700681 20.6608C1.35663 23.9584 2.97572 26.9876 5.35321 29.365C7.73071 31.7425 10.7598 33.3616 14.0575 34.0176C17.3552 34.6735 20.7733 34.3369 23.8796 33.0502C26.986 31.7635 29.641 29.5846 31.509 26.7889C33.377 23.9933 34.374 20.7065 34.374 17.3442C34.3691 12.8371 32.5764 8.51593 29.3894 5.32889C26.2023 2.14184 21.8812 0.349188 17.374 0.344238ZM17.374 32.7479C16.2979 31.7126 13.464 28.5982 12.0581 23.4642H22.6899C21.284 28.5982 18.4501 31.7126 17.374 32.7479ZM11.7334 22.1042C11.0942 18.9631 11.0942 15.7254 11.7334 12.5842H23.0146C23.6538 15.7254 23.6538 18.9631 23.0146 22.1042H11.7334ZM17.374 1.94054C18.4501 2.97584 21.284 6.09024 22.6899 11.2242H12.0581C13.464 6.09024 16.2979 2.97584 17.374 1.94054ZM24.4137 12.5842H32.2728C33.2611 15.6806 33.2611 19.0078 32.2728 22.1042H24.4137C25.0008 18.9581 25.0008 15.7304 24.4137 12.5842ZM31.7662 11.2242H24.1162C23.2582 7.72596 21.5542 4.49192 19.1539 1.80624C21.8997 2.12525 24.5124 3.16435 26.7273 4.81826C28.9421 6.47218 30.6805 8.68214 31.7662 11.2242ZM15.5958 1.80624C13.1956 4.49192 11.4916 7.72596 10.6335 11.2242H2.98353C4.06926 8.68214 5.80763 6.47218 8.0225 4.81826C10.2374 3.16435 12.85 2.12525 15.5958 1.80624ZM2.47523 12.5842H10.3343C9.74728 15.7304 9.74728 18.9581 10.3343 22.1042H2.47523C1.48698 19.0078 1.48698 15.6806 2.47523 12.5842ZM2.98523 23.4642H10.6352C11.4933 26.9625 13.1973 30.1965 15.5975 32.8822C12.8511 32.5638 10.2378 31.5249 8.02224 29.871C5.80673 28.2171 4.06785 26.0068 2.98183 23.4642H2.98523ZM19.1556 32.8822C21.5547 30.1962 23.2575 26.9622 24.1145 23.4642H31.7645C30.6788 26.0063 28.9404 28.2163 26.7256 29.8702C24.5107 31.5241 21.898 32.5632 19.1522 32.8822H19.1556Z"
          fill="white" />
      </svg>
      <span class="centered-text__title-container__info centered-text__title-container__info--wawww">
        alternant @<a href="https://www.wawww.studio/fr" target="_blank" title="nouvelle fenêtre, Studio WAWWW"
          translate="no">WAWWW</a>
        </span>
      <span class="centered-text__title-container__info centered-text__title-container__info--stack"
        translate="no">Blender, <br />
        Three.js, Sass,<br /> Vue.js, Nuxt, React</span>
      <span class="centered-text__title-container__info centered-text__title-container__info--main">Bordeaux,
        Nantes. Développeur front-end</span>
    </div>
  </div>
</template>

<style lang="scss">
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

      h1 {
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
          font-size: toRem(68);
        }

        @media screen and (max-width: 360px) {
          font-size: 17vw;
          margin-top: 0;
        }

        &:last-child {
          margin-top: -3.5vw;
          z-index: 9;

          @media screen and (max-width: 1500px) {
            margin-top: calc(-3.5vw *1.5);
          }

          @media screen and (max-width: 930px) {
            margin-top: toRem(-32);
          }

          @media screen and (max-width: 360px) {
            margin-top: -0.5rem;
          }
        }
      }

      &--small {
        h1 {
          @media screen and (max-width: 930px) {
            font-size: toRem(52);
          }

          @media screen and (max-width: 360px) {
            font-size: 13vw;
            margin-top: 0;
          }
        }
      }
    }

    &__info {
      position: absolute;
      font-weight: 400;
      font-size: clamp(1vw, 16px, 1.3vw);
      line-height: 97%;
      font-style: italic;

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
        z-index: 10;
        left: 25%;
        
        a {
          letter-spacing: -2px;
        }
        
        @media screen and (max-width: 1500px) {
          left: 25%;
        }

        @media screen and (max-width: 930px) {
          top: 133%;
          width: 100%;
          left: 0%;
          text-align: center;
        }

        @media screen and (max-width: 360px) {
          top: 147%;
        }
      }

      &--stack {
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

        @media screen and (max-width: 360px) {
          bottom: -41%;
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
        width: toRem(18);
        height: toRem(18);
      }
    }
  }
}
</style>

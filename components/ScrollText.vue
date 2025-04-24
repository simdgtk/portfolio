<template>
  <div class="scroll-text">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
      <path
        d="M212.24,131.76a6,6,0,0,1,0,8.48l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,207.51l75.76-75.75A6,6,0,0,1,212.24,131.76Zm-88.48,8.48a6,6,0,0,0,8.48,0l80-80a6,6,0,0,0-8.48-8.48L128,127.51,52.24,51.76a6,6,0,0,0-8.48,8.48Z">
      </path>
    </svg>
    <span>Scrollez pour découvrir mes projets</span>
  </div>
</template>

<style lang="scss" scoped>
.scroll-text {
  z-index: 100000;
  mix-blend-mode: difference;
  user-select: none;
  pointer-events: none;
  position: fixed;
  // z-index: 11;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 0;

  @media screen and (max-width: 930px) {
    bottom: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

  }

  svg {
    display: none;

    @media screen and (max-width: 930px) {
      display: block;
      width: 32px;
      height: 32px;
    }
  }

  span {
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 97%;
    text-underline-offset: 3px;

    @media screen and (max-width: 930px) {
      width: 140px;
      text-align: center;
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
</style>

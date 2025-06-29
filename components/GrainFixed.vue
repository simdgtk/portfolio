<template>
  <div class="grain">
  </div>
</template>
<style scoped>
.grain {
  position: fixed;
  pointer-events: none;
  user-select: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background: repeat url('@/assets/images/grain.webp');
  z-index: 100;
  image-rendering: pixelated;

}
</style>
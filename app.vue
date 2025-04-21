<script setup>
import { onMounted } from 'vue';
import Lenis from 'lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// onMounted(() => {
//   // Initialize a new Lenis instance for smooth scrolling
//   const lenis = new Lenis();

//   // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
//   lenis.on('scroll', ScrollTrigger.update);

//   // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
//   // This ensures Lenis's smooth scroll animation updates on each GSAP tick
//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000); // Convert time from seconds to milliseconds
//   });

//   // Disable lag smoothing in GSAP to prevent any delay in scroll animations
//   gsap.ticker.lagSmoothing(0);

// })


</script>
<template>
  <div class="main-container">
    <div class="grain">
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.main-container {
  height: 100%;

}

.grain {
  position: absolute;
  pointer-events: none;
  user-select: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: repeat url('@/assets/images/grain.webp');
  z-index: 100;
  image-rendering: pixelated;

}
</style>
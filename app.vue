<script setup>
import { gsap } from 'gsap';
import { VueLenis } from 'lenis/vue'

const lenisRef = ref()

watchEffect((onInvalidate) => {
  function update(time) {
    lenisRef.value?.lenis?.raf(time * 1000)
  }
  gsap.ticker.add(update)

  onInvalidate(() => {
    gsap.ticker.remove(update)
  })
})

</script>
<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />
  <div class="main-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.main-container {
  height: 100%;

}
</style>
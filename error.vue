<script setup>
import HeaderText from '@/components/HeaderText.vue';

import { ref, onMounted, onUnmounted } from 'vue';
import LinksList from './components/LinksList.vue';

const gridRef = ref(null);
const mainRef = ref(null);
const cellSize = 50;
const cells = ref([]);
let activeTimeouts = [];

const coordo2dTo1d = (x, y, cellSize) => {
  return y * cellSize + x;
}

const clearAllTimeouts = () => {
  activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
  activeTimeouts = [];
};

const createGrid = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
  const gridHeight = Math.floor(windowHeight / cellSize) * cellSize;
  const gridElement = gridRef.value;

  for (let j = 0; j < gridHeight / cellSize + 2; j++) {
    for (let i = 0; i < gridWidth / cellSize + 2; i++) {
      const cell = document.createElement('div');
      // décalage de 8px pour pas coller au bord
      cell.style.transform = `translate(${i * cellSize - 8}px, ${j * cellSize - 8}px)`;

      cell.className = 'grid__cell';
      cell.style.position = 'absolute';
      gridElement.appendChild(cell);
      cells.value.push(cell);
    }
  }
}

let resizeHandler = () => {
  clearAllTimeouts();
  if (gridRef.value) {
    gridRef.value.innerHTML = '';
    cells.value = [];
  }
  createGrid();
}

onMounted(() => {
  createGrid();

  if ('ontouchstart' in window) {
    return;
  } else {
    mainRef.value.addEventListener('mousemove', (event) => {
      const windowWidth = window.innerWidth;
      const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
      const x = Math.floor(event.clientX / cellSize);
      const y = Math.floor(event.clientY / cellSize);
      const index = coordo2dTo1d(x, y, gridWidth / cellSize + 2);

      if (cells.value[index]) {
        cells.value[index].classList.add('grid__cell--gray');
        cells.value[index + 1].classList.add('grid__cell--gray');
        cells.value[index + gridWidth / cellSize + 2].classList.add('grid__cell--gray');

        const t1 = setTimeout(() => {
          if (cells.value[index]) {
            cells.value[index].classList.remove('grid__cell--gray');
          }
        }, 2500);
        const t2 = setTimeout(() => {
          if (cells.value[index + gridWidth / cellSize + 2]) {
            cells.value[index + gridWidth / cellSize + 2].classList.remove('grid__cell--gray');
          }
        }, 2500);
        const t3 = setTimeout(() => {
          if (cells.value[index + 1]) {
            cells.value[index + 1].classList.remove('grid__cell--gray');
          }
        }, 2500);

        activeTimeouts.push(t1, t2, t3);
      }
    });
  }
  window.addEventListener('resize', resizeHandler);
});
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
  clearAllTimeouts();

  if (gridRef.value) {
    gridRef.value.innerHTML = '';
    cells.value = [];
  }
});
</script>

<template>
  <main ref="mainRef">
    <GrainFixed />
    <HeaderText />
    <div class="center centered-text__title-container__title centered-text__title-container__title--small">
      <h1>Page non trouvée...</h1>
      <NuxtLink to="/" class="button">Retour à l'accueil</NuxtLink>
    </div>
    <LinksList />
    <div class="background-grid">
      <div class="grid" ref="gridRef">
      </div>
    </div>
  </main>
</template>
<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

$cell-size: 50px;

.center {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  width: 100%;
}

@media screen and (max-width: 930px) {
  .centered-text__title-container__title h1 {
    font-size: 8.25vw;
  }
}

.grid {
  pointer-events: all;
  z-index: -10;
  gap: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;

  &__cell {
    width: $cell-size;
    height: $cell-size;
    border: 1px solid $gray-border;
    background-color: $background-color;
    transition: background-color 0.2s ease-in-out;

    &--gray {
      background-color: $gray;
    }
  }

}
</style>

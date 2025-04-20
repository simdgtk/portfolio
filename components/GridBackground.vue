<script setup>
import { ref, onMounted } from 'vue';

const gridRef = ref(null);
const cellSize = 50;

onMounted(() => {
  if ('ontouchstart' in window) {
    console.log('Mobile device detected, skipping grid creation.');
  } else {
    console.log('Desktop device detected, creating grid.');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
    const gridHeight = Math.floor(windowHeight / cellSize) * cellSize;
    const gridElement = gridRef.value;
    const cells = [];

    const coordo2dTo1d = (x, y, cellSize) => {
      return y * cellSize + x;
    }

    for (let j = 0; j < gridHeight / cellSize + 2; j++) {
      for (let i = 0; i < gridWidth / cellSize + 2; i++) {
        const cell = document.createElement('div');
        // décalage de 8px pour pas coller au bord
        cell.style.transform = `translate(${i * cellSize - 8}px, ${j * cellSize - 8}px)`;

        cell.className = 'grid__cell';
        cell.style.position = 'absolute';
        gridElement.appendChild(cell);
        cells.push(cell);
      }
    }

    gridRef.value.addEventListener('mousemove', (event) => {
      const x = Math.floor(event.clientX / cellSize);
      const y = Math.floor(event.clientY / cellSize);
      const index = coordo2dTo1d(x, y, gridWidth / cellSize + 2);

      cells[index].classList.add('grid__cell--gray');
      cells[index + 1].classList.add('grid__cell--gray');
      cells[index + gridWidth / cellSize + 2].classList.add('grid__cell--gray');

      setTimeout(() => {
        cells[index].classList.remove('grid__cell--gray');
      }, 2500);
      setTimeout(() => {
        cells[index + gridWidth / cellSize + 2].classList.remove('grid__cell--gray');
      }, 2500);
      setTimeout(() => {
        cells[index + 1].classList.remove('grid__cell--gray');
      }, 2500);

    });
  }

});
</script>

<template>
  <div class="background-grid">
    <div class="grid" ref="gridRef">
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

$cell-size: 50px;

.grid {
  pointer-events: all;
  z-index: -10;
  gap: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &__cell {
    width: $cell-size;
    height: $cell-size;
    border: 1px solid $gray-border;
    background-color: $background-color;
    // background-color: blue !important;
    transition: background-color 0.2s ease-in-out;

    &--gray {
      background-color: $gray;
    }
  }
}
</style>

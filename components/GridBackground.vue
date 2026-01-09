<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gridRef = ref(null);
const cellSize = 50;

let mouseMoveHandler = null;
let activeTimeouts = [];
let cells = [];

onMounted(() => {
  if ('ontouchstart' in window) {
    return;
  } else {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const gridWidth = Math.floor(windowWidth / cellSize) * cellSize;
    const gridHeight = Math.floor(windowHeight / cellSize) * cellSize;
    const gridElement = gridRef.value;
    cells = [];

    const coordo2dTo1d = (x, y, cellSize) => {
      return y * cellSize + x;
    }

    for (let j = 0; j < gridHeight / cellSize + 2; j++) {
      for (let i = 0; i < gridWidth / cellSize + 2; i++) {
        const cell = document.createElement('div');
        cell.style.transform = `translate(${i * cellSize - 8}px, ${j * cellSize - 8}px)`;

        cell.className = 'grid__cell';
        cell.style.position = 'absolute';
        gridElement.appendChild(cell);
        cells.push(cell);
      }
    }

    mouseMoveHandler = (event) => {
      const x = Math.floor(event.clientX / cellSize);
      const y = Math.floor(event.clientY / cellSize);
      const index = coordo2dTo1d(x, y, gridWidth / cellSize + 2);

      cells[index].classList.add('grid__cell--gray');
      cells[index + 1].classList.add('grid__cell--gray');
      cells[index + gridWidth / cellSize + 2].classList.add('grid__cell--gray');

      const timeout1 = setTimeout(() => {
        cells[index].classList.remove('grid__cell--gray');
      }, 2500);
      const timeout2 = setTimeout(() => {
        cells[index + gridWidth / cellSize + 2].classList.remove('grid__cell--gray');
      }, 2500);
      const timeout3 = setTimeout(() => {
        cells[index + 1].classList.remove('grid__cell--gray');
      }, 2500);

      activeTimeouts.push(timeout1, timeout2, timeout3);
    };

    gridRef.value.addEventListener('mousemove', mouseMoveHandler);
  }

});

onUnmounted(() => {
  if (gridRef.value && mouseMoveHandler) {
    gridRef.value.removeEventListener('mousemove', mouseMoveHandler);
  }

  activeTimeouts.forEach(timeoutId => {
    clearTimeout(timeoutId);
  });

  if (gridRef.value) {
    while (gridRef.value.firstChild) {
      gridRef.value.removeChild(gridRef.value.firstChild);
    }
  }

  mouseMoveHandler = null;
  activeTimeouts = [];
  cells = [];
});
</script>

<template>
  <div class="background-grid">
    <div class="grid" ref="gridRef">
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  height: 100dvh;
  overflow: hidden;

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

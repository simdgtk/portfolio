<script setup lang="ts">
const props = defineProps<{
  /** Cellules masquées au départ, puis révélées en vague depuis le centre */
  animated?: boolean;
  /** Déclenche la révélation (avec `animated`) */
  revealed?: boolean;
}>();

const CELL_SIZE = 50;
// décalage de 8px pour ne pas coller au bord
const OFFSET = 8;
const HIGHLIGHT_DURATION = 2500;

const gridRef = useTemplateRef("grid");

let cells: HTMLDivElement[] = [];
let cols = 0;
const timeouts = new Set<ReturnType<typeof setTimeout>>();
let hasRevealed = false;

const clearTimeouts = () => {
  timeouts.forEach(clearTimeout);
  timeouts.clear();
};

const createGrid = () => {
  const grid = gridRef.value;
  if (!grid) return;

  grid.replaceChildren();
  cells = [];
  cols = Math.floor(window.innerWidth / CELL_SIZE) + 2;
  const rows = Math.floor(window.innerHeight / CELL_SIZE) + 2;

  const fragment = document.createDocumentFragment();
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cell = document.createElement("div");
      cell.className = "grid__cell";
      cell.style.transform = `translate(${i * CELL_SIZE - OFFSET}px, ${j * CELL_SIZE - OFFSET}px)`;
      if (props.animated && !hasRevealed) {
        const delay = Math.hypot(i - cols / 2, j - rows / 2) * 0.04;
        cell.style.transitionDelay = `${delay}s, 0s`;
      }
      fragment.appendChild(cell);
      cells.push(cell);
    }
  }
  grid.appendChild(fragment);
};

const highlight = (index: number) => {
  const cell = cells[index];
  if (!cell) return;
  cell.classList.add("grid__cell--gray");
  const timeout = setTimeout(() => {
    cell.classList.remove("grid__cell--gray");
    timeouts.delete(timeout);
  }, HIGHLIGHT_DURATION);
  timeouts.add(timeout);
};

const onMouseMove = (event: MouseEvent) => {
  const index =
    Math.floor(event.clientY / CELL_SIZE) * cols +
    Math.floor(event.clientX / CELL_SIZE);
  highlight(index);
  highlight(index + 1);
  highlight(index + cols);
};

const onResize = () => {
  clearTimeouts();
  createGrid();
};

watch(
  () => props.revealed,
  (revealed) => {
    if (!revealed) return;
    // une fois l'animation d'entrée jouée, les cellules recréées au resize n'ont plus de délai
    setTimeout(() => (hasRevealed = true), 2000);
  },
);

let hoverTarget: HTMLElement | Window | null = null;

onMounted(() => {
  createGrid();
  window.addEventListener("resize", onResize);

  if (window.matchMedia("(hover: hover)").matches) {
    hoverTarget = gridRef.value?.closest("main") ?? window;
    hoverTarget.addEventListener("mousemove", onMouseMove as EventListener);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
  hoverTarget?.removeEventListener("mousemove", onMouseMove as EventListener);
  clearTimeouts();
});
</script>

<template>
  <div class="background-grid">
    <div
      ref="grid"
      class="grid"
      :class="{ 'grid--animated': animated, 'grid--revealed': revealed }"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/variables" as *;

$cell-size: 50px;

.grid {
  pointer-events: all;
  z-index: -10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;

  :deep(.grid__cell) {
    position: absolute;
    width: $cell-size;
    height: $cell-size;
    border: 1px solid $gray-border;
    background-color: $background-color;
    transition: background-color 0.2s ease-in-out;
  }

  :deep(.grid__cell--gray) {
    background-color: $gray;
  }

  &--animated :deep(.grid__cell) {
    opacity: 0;
    transition:
      opacity 0.9s cubic-bezier(0.85, 0, 0.15, 1),
      background-color 0.2s ease-in-out;
  }

  &--revealed :deep(.grid__cell) {
    opacity: 1;
  }
}
</style>

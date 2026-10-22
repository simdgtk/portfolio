<script setup lang="ts">
const props = defineProps<{
  animated?: boolean;
  revealed?: boolean;
}>();

const CELL_SIZE = 50;
// décalage de 8px pour ne pas coller au bord
const OFFSET = 8;
const HIGHLIGHT_DURATION = 2500;
const COLOR_DURATION = 200;
const REVEAL_DURATION = 900;
const MAX_PIXEL_RATIO = 2;

const BACKGROUND: RGB = [0x1a, 0x1a, 0x1a];
const GRAY: RGB = [0x56, 0x56, 0x56];
const BORDER = "#4b4b4b";

type RGB = [number, number, number];

const cubicBezier = (x1: number, y1: number, x2: number, y2: number) => {
  const bezier = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 20; i++) {
      t = (lo + hi) / 2;
      if (bezier(t, x1, x2) < x) lo = t;
      else hi = t;
    }
    return bezier(t, y1, y2);
  };
};
const easeInOut = cubicBezier(0.42, 0, 0.58, 1);
const easeReveal = cubicBezier(0.85, 0, 0.15, 1);
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const canvasRef = useTemplateRef("canvas");

let ctx: CanvasRenderingContext2D | null = null;
let cols = 0;
let rows = 0;
let gridPath: Path2D | null = null;
let hasRevealed = false;
let revealStart: number | null = null;
let revealDelays: Float32Array = new Float32Array();

let colorFrom: Float32Array = new Float32Array();
let colorTarget: Float32Array = new Float32Array();
let colorChangedAt: Float64Array = new Float64Array();
let grayUntil: Float64Array = new Float64Array();
const activeCells = new Set<number>();

let frame = 0;

const colorLevel = (index: number, now: number) => {
  const t = easeInOut(clamp01((now - colorChangedAt[index]!) / COLOR_DURATION));
  return colorFrom[index]! + (colorTarget[index]! - colorFrom[index]!) * t;
};

const setTarget = (index: number, target: number, now: number) => {
  if (colorTarget[index] === target) return;
  colorFrom[index] = colorLevel(index, now);
  colorTarget[index] = target;
  colorChangedAt[index] = now;
};

const cellColor = (level: number) =>
  `rgb(${BACKGROUND.map((c, i) => Math.round(c + (GRAY[i]! - c) * level)).join(",")})`;

const cellX = (i: number) => i * CELL_SIZE - OFFSET;
const cellY = (j: number) => j * CELL_SIZE - OFFSET;

const draw = (now: number) => {
  frame = 0;
  const canvas = canvasRef.value;
  if (!ctx || !canvas || !gridPath) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const index of activeCells) {
    if (colorTarget[index] === 1 && now >= grayUntil[index]!) setTarget(index, 0, now);
  }

  const revealing = props.animated && !hasRevealed;
  let animating = false;

  if (revealing) {
    const elapsed = revealStart === null ? -1 : now - revealStart;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const index = j * cols + i;
        const progress = elapsed < 0 ? 0 : (elapsed - revealDelays[index]!) / REVEAL_DURATION;
        const alpha = easeReveal(clamp01(progress));
        if (progress < 1) animating = true;
        if (alpha <= 0) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = cellColor(colorLevel(index, now));
        ctx.fillRect(cellX(i), cellY(j), CELL_SIZE, CELL_SIZE);
        ctx.strokeRect(cellX(i) + 0.5, cellY(j) + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
      }
    }
    ctx.globalAlpha = 1;
    if (!animating && revealStart !== null) hasRevealed = true;
  } else {
    for (const index of activeCells) {
      const level = colorLevel(index, now);
      if (level <= 0 && colorTarget[index] === 0) {
        activeCells.delete(index);
        continue;
      }
      ctx.fillStyle = cellColor(level);
      ctx.fillRect(cellX(index % cols), cellY(Math.floor(index / cols)), CELL_SIZE, CELL_SIZE);
    }
    ctx.stroke(gridPath);
  }

  if (animating || activeCells.size > 0) requestDraw();
};

const requestDraw = () => {
  if (!frame) frame = requestAnimationFrame(draw);
};

const createGrid = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);

  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 1;

  cols = Math.floor(width / CELL_SIZE) + 2;
  rows = Math.floor(height / CELL_SIZE) + 2;
  const count = cols * rows;
  colorFrom = new Float32Array(count);
  colorTarget = new Float32Array(count);
  colorChangedAt = new Float64Array(count);
  grayUntil = new Float64Array(count);
  revealDelays = new Float32Array(count);
  activeCells.clear();

  gridPath = new Path2D();
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      gridPath.rect(cellX(i) + 0.5, cellY(j) + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
      revealDelays[j * cols + i] = Math.hypot(i - cols / 2, j - rows / 2) * 40;
    }
  }
  requestDraw();
};

const highlight = (index: number, now: number) => {
  if (index < 0 || index >= colorTarget.length) return;
  setTarget(index, 1, now);
  grayUntil[index] = now + HIGHLIGHT_DURATION;
  activeCells.add(index);
};

const onMouseMove = (event: MouseEvent) => {
  const now = performance.now();
  const index =
    Math.floor(event.clientY / CELL_SIZE) * cols + Math.floor(event.clientX / CELL_SIZE);
  highlight(index, now);
  highlight(index + 1, now);
  highlight(index + cols, now);
  requestDraw();
};

watch(
  () => props.revealed,
  (revealed) => {
    if (!revealed || revealStart !== null) return;
    revealStart = performance.now();
    requestDraw();
  },
);

let hoverTarget: HTMLElement | Window | null = null;

onMounted(() => {
  createGrid();
  if (props.revealed) revealStart = performance.now();
  window.addEventListener("resize", createGrid);

  if (window.matchMedia("(hover: hover)").matches) {
    hoverTarget = canvasRef.value?.parentElement?.parentElement ?? window;
    hoverTarget.addEventListener("mousemove", onMouseMove as EventListener);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", createGrid);
  hoverTarget?.removeEventListener("mousemove", onMouseMove as EventListener);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="background-grid" aria-hidden="true">
    <canvas ref="canvas" class="grid" />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  pointer-events: all;
  z-index: -10;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100vw;
  height: 100dvh;
}
</style>

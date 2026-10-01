<script setup lang="ts">
import {
  AmbientLight,
  Color,
  CubeTextureLoader,
  HemisphereLight,
  Mesh,
  OrthographicCamera,
  RenderPipeline,
  Scene,
  WebGPURenderer,
} from "three/webgpu";
import type { Object3D } from "three/webgpu";
import { pass } from "three/tsl";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const emit = defineEmits<{ loaded: [] }>();

const canvasRef = useTemplateRef("canvas");
const isLoaded = ref(false);

type Vec3 = [number, number, number];

interface FloatingModel {
  url: string;
  rotation: Vec3;
  /** Sens du parallax à la souris */
  parallax: 1 | -1;
  layout: (width: number, height: number) => { position: Vec3; scale: Vec3 };
}

const MODELS: FloatingModel[] = [
  {
    url: "/models/rose.glb",
    rotation: [1.43, 1.02, -0.89],
    parallax: 1,
    layout: (w, h) => ({
      position: [(-w * 0.9) / 300, (-h * 0.8) / 300, 1],
      scale:
        w > h
          ? [(w * 0.6) / 400, (w * 0.5) / 400, (w * 0.6) / 400]
          : [(h * 0.5) / 300, (h * 0.5) / 300, (h * 0.5) / 300],
    }),
  },
  {
    url: "/models/pc.glb",
    rotation: [0.34, 0.61, -0.2],
    parallax: -1,
    layout: (w, h) => ({
      position: [(w * 0.9) / 300 - 1, (h * 0.7) / 300 - 1, 1],
      scale:
        w > h
          ? [(w * 0.57) / 400, (w * 0.57) / 400, (w * 0.57) / 400]
          : [(h * 0.5) / 300, (h * 0.5) / 300, (h * 0.5) / 300],
    }),
  },
];

const MAX_PIXEL_RATIO = 1.5;
/** Unités monde par pixel CSS de la caméra orthographique */
const PX_PER_UNIT = 300;

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

let cleanup: (() => void) | undefined;
let unmounted = false;

onMounted(async () => {
  // un composant .client ne rend son template qu'après le montage
  await nextTick();
  const canvas = canvasRef.value;
  if (!canvas || unmounted) return;
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Scène
  const scene = new Scene();
  scene.add(new AmbientLight(0xffffff), new HemisphereLight(0xffffff, 0x000000, 6));

  const environment = new CubeTextureLoader().load(
    Array(6).fill("/environment_maps/px.png"),
  );
  scene.environment = environment;

  const camera = new OrthographicCamera(
    -width / PX_PER_UNIT,
    width / PX_PER_UNIT,
    height / PX_PER_UNIT,
    -height / PX_PER_UNIT,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 10);
  scene.add(camera);

  // matériau PBR « façon r175 » : voir app/utils/legacyPhysicalMaterial.ts
  const chromeMaterial = new LegacyMeshPhysicalNodeMaterial({
    color: 0xa555b9,
    roughness: 0,
    metalness: 1,
    iridescence: 1,
    iridescenceIOR: 1.4,
    iridescenceThicknessRange: [0, 1000],
    sheen: 2,
    sheenColor: new Color(0x4232ff),
  });

  // Renderer WebGPU (repli WebGL2 automatique si WebGPU n'est pas disponible)
  const renderer = new WebGPURenderer({ canvas, antialias: false, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setSize(width, height);

  // Post-processing : rendu de la scène -> effet ASCII
  const ascii = asciiEffect(pass(scene, camera).getTextureNode());
  const pipeline = new RenderPipeline(renderer, ascii.node);

  // Chargement des modèles
  // décodeur Draco (wasm) fourni et versionné avec three
  const dracoLoader = new DRACOLoader();
  const gltfLoader = new GLTFLoader().setDRACOLoader(dracoLoader);

  const objects: (Object3D | undefined)[] = [];

  // Parallax à la souris
  const parallaxTarget = { x: 0, y: 0 };
  const parallaxCurrent = { x: 0, y: 0 };
  const mouseTarget = { x: 0.5, y: 0.5 };
  const mouseCurrent = { x: 0.5, y: 0.5 };

  const layoutModels = () => {
    MODELS.forEach((config, i) => {
      const object = objects[i];
      if (!object) return;
      const { position, scale } = config.layout(width, height);
      object.position.set(...position);
      object.scale.set(...scale);
    });
  };

  const onResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    camera.left = -width / PX_PER_UNIT;
    camera.right = width / PX_PER_UNIT;
    camera.top = height / PX_PER_UNIT;
    camera.bottom = -height / PX_PER_UNIT;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.setSize(width, height);
    ascii.setSize(width, height);

    layoutModels();
    parallaxTarget.x = parallaxTarget.y = 0;
    parallaxCurrent.x = parallaxCurrent.y = 0;
  };

  const onVisibilityChange = () => {
    if (!document.hidden) onResize();
  };

  const onMouseMove = (event: MouseEvent) => {
    parallaxTarget.x = (event.clientX / width) * 2 - 1;
    parallaxTarget.y = -(event.clientY / height) * 2 + 1;
    mouseTarget.x = event.clientX / width;
    mouseTarget.y = 1 - event.clientY / height;
  };

  const animate = (time: number) => {
    mouseCurrent.x = lerp(mouseCurrent.x, mouseTarget.x, 0.09);
    mouseCurrent.y = lerp(mouseCurrent.y, mouseTarget.y, 0.09);
    ascii.setMouse(mouseCurrent.x, mouseCurrent.y);

    const oldX = parallaxCurrent.x;
    const oldY = parallaxCurrent.y;
    parallaxCurrent.x = lerp(parallaxCurrent.x, parallaxTarget.x, 0.05);
    parallaxCurrent.y = lerp(parallaxCurrent.y, parallaxTarget.y, 0.05);
    const deltaX = parallaxCurrent.x - oldX;
    const deltaY = parallaxCurrent.y - oldY;

    const t = time * 0.001 * 0.25;
    MODELS.forEach((config, i) => {
      const object = objects[i];
      if (!object) return;
      object.position.y += deltaX * 0.05 * config.parallax;
      object.position.x += deltaY * 0.05 * config.parallax;

      const [rx, ry, rz] = config.rotation;
      object.rotation.set(
        rx + Math.cos(t) / 8,
        ry + Math.sin(t) / 8,
        rz + Math.sin(t) / 20,
      );
    });

    pipeline.render();
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
  document.addEventListener("visibilitychange", onVisibilityChange);

  cleanup = () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("visibilitychange", onVisibilityChange);

    renderer.setAnimationLoop(null);
    scene.traverse((object) => {
      if (object instanceof Mesh) object.geometry.dispose();
    });
    chromeMaterial.dispose();
    environment.dispose();
    ascii.dispose();
    pipeline.dispose();
    dracoLoader.dispose();
    renderer.dispose();
  };

  try {
    const [gltfs] = await Promise.all([
      Promise.all(MODELS.map((model) => gltfLoader.loadAsync(model.url))),
      renderer.init(),
    ]);
    if (unmounted) return;

    gltfs.forEach((gltf, i) => {
      const object = gltf.scene.children[0];
      if (!object) return;
      if (object instanceof Mesh) object.material = chromeMaterial;
      objects[i] = object;
      scene.add(object);
    });
    layoutModels();

    // Compile les shaders avant le premier rendu pour éviter un saut à l'apparition
    await renderer.compileAsync(scene, camera);
    if (unmounted) return;

    renderer.setAnimationLoop(animate);
    isLoaded.value = true;
  } catch (error) {
    console.error("[FloatingModels]", error);
  } finally {
    // La page s'affiche même si la 3D échoue
    if (!unmounted) emit("loaded");
  }
});

onBeforeUnmount(() => {
  unmounted = true;
  cleanup?.();
  cleanup = undefined;
});
</script>

<template>
  <div class="floating-models">
    <canvas ref="canvas" :class="{ 'is-loaded': isLoaded }" />
  </div>
</template>

<style lang="scss" scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s 0.9s ease-out;

  &.is-loaded {
    opacity: 1;
  }
}
</style>

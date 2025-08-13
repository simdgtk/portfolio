<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


const canvasRef = ref(null);

onMounted(() => {
  // Scene setup
  const scene = new THREE.Scene();

  // Loaders
  const gltfLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderConfig({ type: 'js' });
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
  gltfLoader.setDRACOLoader(dracoLoader);
  const cubeTextureLoader = new THREE.CubeTextureLoader();

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 6);
  scene.add(ambientLight, hemisphereLight);

  // Material
  const chromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xa555b9,
    roughness: 0,
    metalness: 1,
    iridescence: 1.0,
    iridescenceIOR: 1.4,
    iridescenceThicknessRange: [0, 1000],
    sheen: 2.0,
    sheenColor: new THREE.Color(0x4232ff)
  });

  let sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
  };


  function updateModelTransforms() {
    // Rose
    if (model) {
      model.position.set((-sizes.width * 0.9) / 300, (-sizes.height * 0.8) / 300, 1);
      if (sizes.width > sizes.height) {
        model.scale.set((sizes.width * 0.6) / 400, (sizes.width * 0.5) / 400, (sizes.width * 0.6) / 400);
      } else {
        model.scale.set((sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300);
      }
    }
    // PC
    if (pc) {
      pc.position.set((sizes.width * 0.9) / 300 - 1, (sizes.height * 0.7) / 300 - 1, 1);
      if (sizes.width > sizes.height) {
        pc.scale.set((sizes.width * 0.57) / 400, (sizes.width * 0.57) / 400, (sizes.width * 0.57) / 400);
      } else {
        pc.scale.set((sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300);
      }
    }
  }

  // effet parallax
  let roseOldX = 0, roseOldY = 0;
  let pcOldX = 0, pcOldY = 0;

  //  resize
  function handleResize() {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // update camera
    camera.aspect = sizes.width / sizes.height;
    camera.left = -sizes.width / 300;
    camera.right = sizes.width / 300;
    camera.top = sizes.height / 300;
    camera.bottom = -sizes.height / 300;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    composer.setSize(sizes.width, sizes.height);

    // Mettre à jour la résolution du shader ASCII
    asciiPass.uniforms['uResolution'].value.set(sizes.width, sizes.height);

    updateModelTransforms();

    roseOldX = 0; roseOldY = 0;
    pcOldX = 0; pcOldY = 0;
  }

  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      handleResize();
    }
  });

  // Model loading
  let model = null;
  gltfLoader.load("/models/rose.glb", (gltf) => {
    model = gltf.scene.children[0];

    model.rotation.x = 1.43;
    model.rotation.y = 1.02;
    model.rotation.z = -0.89;

    updateModelTransforms();
    model.material = chromeMaterial;
    scene.add(model);

    // parallax effect
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / sizes.width) * 2 - 1;
      const y = -(event.clientY / sizes.height) * 2 + 1;

      model.position.y += (x - roseOldX) * 0.05;
      model.position.x += (y - roseOldY) * 0.05;

      roseOldX = x;
      roseOldY = y;
    });
  });

  // Model loading
  let pc = null;
  gltfLoader.load("/models/pc.glb", (gltf) => {
    pc = gltf.scene.children[0];
    pc.rotation.x = 0.34;
    pc.rotation.y = 0.61;
    pc.rotation.z = -0.20;

    updateModelTransforms();
    pc.material = chromeMaterial;
    scene.add(pc);

    // parallax effect
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / sizes.width) * 2 - 1;
      const y = -(event.clientY / sizes.height) * 2 + 1;

      pc.position.y += (x - pcOldX) * -0.05;
      pc.position.x += (y - pcOldY) * -0.05;

      pcOldX = x;
      pcOldY = y;
    });
  });

  // Camera setup
  const camera = new THREE.OrthographicCamera(
    -sizes.width / 300,
    sizes.width / 300,
    sizes.height / 300,
    -sizes.height / 300,
    0.1,
    1000
  );
  scene.add(camera);
  camera.position.set(0, 0, 10);

  const environmentMap = cubeTextureLoader.load([
    "/environment_maps/px.png",
    "/environment_maps/px.png",
    "/environment_maps/px.png",
    "/environment_maps/px.png",
    "/environment_maps/px.png",
    "/environment_maps/px.png",
  ]);
  scene.environment = environmentMap;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Post-processing setup
  let composer = new EffectComposer(renderer);

  // Base render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Shader ascii
  // basé sur le tutoriel d'Alexandre PUJOL : https://medium.com/@alexandre.pujol/ascii-hover-effect-with-shader-and-post-processing-part-1-589064c33385
  const font = "arial";
  const characters = ` ░▒▓▄Zab[/><±Σ∑$§▌ABCWXgjkstyz2359¢"',:~\\|*`;
  const fontSize = 70;
  const cellSize = 8;
  const color = "#ffffff";
  const invert = false;

  function createCharactersTexture(characters, font, fontSize) {
    const canvas = document.createElement("canvas");
    const SIZE = 1024;
    const MAX_PER_ROW = 16;
    const CELL = SIZE / MAX_PER_ROW;

    canvas.width = canvas.height = SIZE;
    const texture = new THREE.CanvasTexture(
      canvas,
      undefined,
      THREE.RepeatWrapping,
      THREE.RepeatWrapping,
      THREE.NearestFilter,
      THREE.NearestFilter
    );
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, SIZE, SIZE);
    context.font = `${fontSize}px ${font}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const x = i % MAX_PER_ROW;
      const y = Math.floor(i / MAX_PER_ROW);
      context.fillText(char, x * CELL + CELL / 2, y * CELL + CELL / 2);
    }

    texture.needsUpdate = true;
    return texture;
  }

  const asciiShader = {
    uniforms: {
      'tDiffuse': { value: null },
      'uCharacters': { value: createCharactersTexture(characters, font, fontSize) },
      'uCellSize': { value: cellSize },
      'uCharactersCount': { value: characters.length },
      'uColor': { value: new THREE.Color(color) },
      'uInvert': { value: invert },
      'uResolution': { value: new THREE.Vector2(sizes.width, sizes.height) },
      'uMouse': { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform sampler2D uCharacters;
      uniform float uCharactersCount;
      uniform float uCellSize;
      uniform bool uInvert;
      uniform vec3 uColor;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;
      
      const vec2 SIZE = vec2(16.);
      
      vec3 greyscale(vec3 color, float strength) {
          float g = dot(color, vec3(0.299, 0.587, 0.114));
          return mix(color, vec3(g), strength);
      }
      
      vec3 greyscale(vec3 color) {
          return greyscale(color, 1.0);
      }
      
      void main() {
          vec2 uv = vUv;
          vec2 cell = uResolution / uCellSize;
          vec2 grid = 1.0 / cell;
          vec2 pixelizedUV = grid * (0.5 + floor(uv / grid));
          vec4 normalTexture = texture2D(tDiffuse, vUv);
          vec4 pixelized = texture2D(tDiffuse, pixelizedUV);
          float greyscaled = greyscale(pixelized.rgb).r;
      
          if (uInvert) {
              greyscaled = 1.0 - greyscaled;
          }
      
          float uRadius = 0.15;
          float pixelSize = 0.01;
              
          // Calculate aspect ratio
          float aspectRatio = uResolution.x / uResolution.y;
          vec2 adjustedUV = vec2(vUv.x * aspectRatio, vUv.y);
          vec2 adjustedMouse = vec2(uMouse.x * aspectRatio, uMouse.y);
          
          // Pixelliser les coordonnées
          adjustedUV = floor(adjustedUV / pixelSize) * pixelSize;
          adjustedMouse = floor(adjustedMouse / pixelSize) * pixelSize;
          
          // Distance de base
          float dist = distance(adjustedUV, adjustedMouse);
          
          // Noises pour la forme organique du circle
          float noise1 = sin(adjustedUV.x * 50.0) * cos(adjustedUV.y * 30.0) * 0.02;
          float noise2 = sin(adjustedUV.x * 80.0 + adjustedUV.y * 60.0) * 0.015;
          float noise3 = cos(adjustedUV.x * 120.0) * sin(adjustedUV.y * 90.0) * 0.01;
          
          float organicNoise = noise1 + noise2 + noise3;
          
          // Contours irréguliers au circle
          float organicRadius = uRadius + organicNoise;
          
          float circle = step(dist, organicRadius);
      
          float characterIndex = floor((uCharactersCount - 1.0) * greyscaled);
          vec2 characterPosition = vec2(mod(characterIndex, SIZE.x), floor(characterIndex / SIZE.y));
          vec2 offset = vec2(characterPosition.x, -characterPosition.y) / SIZE;
          vec2 charUV = mod(uv * (cell / SIZE), 1.0 / SIZE) - vec2(0., 1.0 / SIZE) + offset;
          vec4 asciiCharacter = texture2D(uCharacters, charUV);
      
          asciiCharacter.rgb = uColor * asciiCharacter.r;
          asciiCharacter.a = pixelized.a;
          gl_FragColor = mix(normalTexture, asciiCharacter, circle);
      }
    `
  };

  const asciiPass = new ShaderPass(asciiShader);
  composer.addPass(asciiPass);

  // Fonction lerp pour l'interpolation linéaire
  const lerp = (start, end, t) => start + (end - start) * t;

  // Position actuelle et cible de la souris
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetPosition = { x: 0.5, y: 0.5 };

  window.addEventListener("mousemove", (event) => {
    targetPosition.x = event.clientX / sizes.width;
    targetPosition.y = 1.0 - (event.clientY / sizes.height); // Inverser Y pour correspondre aux UV
  });

  // Output pass (final)
  const outputPass = new OutputPass();
  composer.addPass(outputPass);


  // Animation loop
  const speed = ref(1);
  const rotationIntensity = ref(1);
  function animate() {
    mousePosition.x = lerp(mousePosition.x, targetPosition.x, 0.09); // controle du lerp
    mousePosition.y = lerp(mousePosition.y, targetPosition.y, 0.09);

    // Mettre à jour l'uniform du shader
    asciiPass.uniforms['uMouse'].value.set(mousePosition.x, mousePosition.y);

    if (model && pc) {
      const elapsedTime = Date.now() * 0.001;
      model.rotation.x = (Math.cos((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 1.43;
      model.rotation.y = (Math.sin((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 1.02;
      model.rotation.z = (Math.sin((elapsedTime / 4) * speed.value) / 20) * rotationIntensity.value - 0.89;

      pc.rotation.x = (Math.cos((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 0.34;
      pc.rotation.y = (Math.sin((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 0.61;
      pc.rotation.z = (Math.sin((elapsedTime / 4) * speed.value) / 20) * rotationIntensity.value - 0.20;
    }

    composer.render();
  }

  renderer.setAnimationLoop(animate);
});
</script>

<template>
  <div class="test">
    <canvas ref="canvasRef"></canvas>
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
}
</style>

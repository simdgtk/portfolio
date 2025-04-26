<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


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
    // sheenColor: new THREE.Color(0x9933ff), // violet
    sheenColor: new THREE.Color(0x4232ff), // violet

  });

  let sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
  };
  //  resize
  window.addEventListener("resize", () => {
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

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Model loading
  let model = null;
  gltfLoader.load("/models/rose.glb", (gltf) => {
    model = gltf.scene.children[0];
    // model.rotation = [0, Math.PI / 2, 0];
    model.rotation.x = 1.43;
    model.rotation.y = 1.02;
    model.rotation.z = -0.89;

    // positionné en bas à gauche
    // model.position.set(- sizes.width / 300, - sizes.height / 300, 1);

    // positionné en bas à gauche avec offset
    model.position.set((- sizes.width * 0.9) / 300, (- sizes.height * 0.8) / 300, 1);

    if (sizes.width > sizes.height) {
      model.scale.set((sizes.width * 0.6) / 400, (sizes.width * 0.5) / 400, (sizes.width * 0.6) / 400);
    } else {
      model.scale.set((sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300);
    }
    model.material = chromeMaterial;
    scene.add(model);

    // parallax effect
    let oldX = 0;
    let oldY = 0;
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / sizes.width) * 2 - 1;
      const y = -(event.clientY / sizes.height) * 2 + 1;

      model.position.y += (x - oldX) * 0.05;
      model.position.x += (y - oldY) * 0.05;
      // model.rotation.y += (x - oldX) * 0.9;
      // model.rotation.x += (y - oldY) * 0.9;
      // model.rotation.z += (y - oldY) * 0.9;


      oldX = x;
      oldY = y;
    })

  });

  // Model loading
  let pc = null;
  gltfLoader.load("/models/pc.glb", (gltf) => {
    pc = gltf.scene.children[0];
    // model.rotation = [0, Math.PI / 2, 0];
    pc.rotation.x = 0.34;
    pc.rotation.y = 0.61;
    pc.rotation.z = -0.20;

    // positionné en haut à droite avec offset
    pc.position.set((sizes.width * 0.9) / 300 - 1, (sizes.height * 0.7) / 300 - 1, 1);

    if (sizes.width > sizes.height) {
      pc.scale.set((sizes.width * 0.57) / 400, (sizes.width * 0.57) / 400, (sizes.width * 0.57) / 400);
    } else {
      pc.scale.set((sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300, (sizes.height * 0.5) / 300);
    }
    pc.material = chromeMaterial;
    scene.add(pc);

    // parallax effect
    let oldX = 0;
    let oldY = 0;
    window.addEventListener("mousemove", (event) => {
      const x = (event.clientX / sizes.width) * 2 - 1;
      const y = -(event.clientY / sizes.height) * 2 + 1;

      pc.position.y += (x - oldX) * - 0.05;
      pc.position.x += (y - oldY) * -0.05;
      // pc.rotation.y += (x - oldX) * -0.05;
      // pc.rotation.x += (y - oldY) * -0.05;
      // pc.rotation.z += (y - oldY) * -0.05;


      oldX = x;
      oldY = y;
    })

  });

  // Camera setup
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const camera = new THREE.OrthographicCamera(
    -sizes.width / 300,
    sizes.width / 300,
    sizes.height / 300,
    -sizes.height / 300,
    0.1,
    1000
  );
  scene.add(camera);
  camera.position.set(0, 0, 10); // Recule la caméra en augmentant la valeur de z

  // const environmentMap = cubeTextureLoader.load([
  //   "/environment_maps/px.png",
  //   "/environment_maps/nx.png",
  //   "/environment_maps/py.png",
  //   "/environment_maps/ny.png",
  //   "/environment_maps/pz.png",
  //   "/environment_maps/nz.png",
  // ]);
  // // environmentMap.encoding = THREE.sRGBEncoding;
  // // scene.background = environmentMap;
  // scene.environment = environmentMap;
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
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // Animation loop
  const offset = ref(Math.random() * 0);
  const floatingRange = ref([-0.2, 0.2]);
  const floatIntensity = ref(3);
  const speed = ref(1);
  const rotationIntensity = ref(1);
  function animate() {
    if (model && pc) {
      const elapsedTime = Date.now() * 0.001;
      model.rotation.x = (Math.cos((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 1.43;
      model.rotation.y = (Math.sin((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 1.02;
      model.rotation.z = (Math.sin((elapsedTime / 4) * speed.value) / 20) * rotationIntensity.value - 0.89;

      pc.rotation.x = (Math.cos((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 0.34;
      pc.rotation.y = (Math.sin((elapsedTime / 4) * speed.value) / 8) * rotationIntensity.value + 0.61;
      pc.rotation.z = (Math.sin((elapsedTime / 4) * speed.value) / 20) * rotationIntensity.value - 0.20;
    }
    renderer.render(scene, camera);
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

// Scène de comparaison partagée (DEBUG-TEMP). Paramètres : THREE (module), addons, mode.
export async function run({ THREE, GLTFLoader, DRACOLoader, dracoPath, mode, extra }) {
  const w = innerWidth, h = innerHeight;
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff), new THREE.HemisphereLight(0xffffff, 0x000000, 6));
  scene.environment = new THREE.CubeTextureLoader().load(Array(6).fill('/environment_maps/px.png'));
  const camera = new THREE.OrthographicCamera(-w / 300, w / 300, h / 300, -h / 300, 0.1, 1000);
  camera.position.set(0, 0, 10);
  scene.add(camera);
  const Mat = extra.Material ?? THREE.MeshPhysicalMaterial;
  const mat = new Mat({
    color: 0xa555b9, roughness: 0, metalness: 1, iridescence: 1, iridescenceIOR: 1.4,
    iridescenceThicknessRange: [0, 1000], sheen: 2, sheenColor: new THREE.Color(0x4232ff),
  });
  const draco = new DRACOLoader(); draco.setDecoderPath(dracoPath); draco.setDecoderConfig({ type: 'wasm' });
  const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
  const [rose, pc] = await Promise.all(['/models/rose.glb', '/models/pc.glb'].map((u) => loader.loadAsync(u)));
  const r = rose.scene.children[0], p = pc.scene.children[0];
  r.material = mat; p.material = mat;
  r.rotation.set(1.43 + 1 / 8, 1.02, -0.89); p.rotation.set(0.34 + 1 / 8, 0.61, -0.2);
  r.position.set((-w * 0.9) / 300, (-h * 0.8) / 300, 1);
  p.position.set((w * 0.9) / 300 - 1, (h * 0.7) / 300 - 1, 1);
  if (w > h) { r.scale.set((w * 0.6) / 400, (w * 0.5) / 400, (w * 0.6) / 400); p.scale.setScalar((w * 0.57) / 400); }
  else { r.scale.setScalar((h * 0.5) / 300); p.scale.setScalar((h * 0.5) / 300); }
  scene.add(r, p);
  const render = await extra.makeRender(scene, camera, w, h);
  let n = 0;
  const loop = async () => { await render(); if (++n < 30) requestAnimationFrame(loop); else { window.__shot = document.querySelector('canvas').toDataURL(); document.title = 'done'; } };
  loop();
  window.__dbg = { scene, mat, camera };
}

// Effet ASCII au survol, en TSL (WebGPU, avec repli WebGL2 automatique).
// Basé sur le tutoriel d'Alexandre PUJOL :
// https://medium.com/@alexandre.pujol/ascii-hover-effect-with-shader-and-post-processing-part-1-589064c33385
import { CanvasTexture, Color, NearestFilter, Vector2 } from "three/webgpu";
import type { TextureNode } from "three/webgpu";
import {
  Fn,
  cos,
  distance,
  dot,
  float,
  floor,
  fract,
  mix,
  mod,
  screenUV,
  sin,
  step,
  texture,
  uniform,
  vec2,
  vec3,
  vec4,
} from "three/tsl";

const ATLAS_SIZE = 1024;
const ATLAS_PER_ROW = 16;

interface AsciiOptions {
  characters?: string;
  font?: string;
  fontSize?: number;
  /** Taille d'une cellule ASCII, en pixels CSS */
  cellSize?: number;
  color?: string;
  /** Rayon du cercle révélé autour de la souris (en UV, corrigé du ratio) */
  radius?: number;
}

function createCharactersTexture(characters: string, font: string, fontSize: number) {
  const canvas = document.createElement("canvas");
  const cell = ATLAS_SIZE / ATLAS_PER_ROW;
  canvas.width = canvas.height = ATLAS_SIZE;

  const context = canvas.getContext("2d")!;
  context.font = `${fontSize}px ${font}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#fff";

  [...characters].forEach((char, i) => {
    const x = i % ATLAS_PER_ROW;
    const y = Math.floor(i / ATLAS_PER_ROW);
    context.fillText(char, x * cell + cell / 2, y * cell + cell / 2);
  });

  const atlas = new CanvasTexture(canvas);
  atlas.magFilter = atlas.minFilter = NearestFilter;
  atlas.generateMipmaps = false;
  // v = 0 en haut de l'atlas, comme screenUV
  atlas.flipY = false;
  return atlas;
}

export function asciiEffect(
  input: TextureNode,
  {
    characters = ` ░▒Ǿ▄Δab[/><±Σ∑$§▌ABCWXgjkstyz2359¢"',:~\\|*`,
    font = "arial",
    fontSize = 70,
    cellSize = 8,
    color = "#ffffff",
    radius = 0.15,
  }: AsciiOptions = {},
) {
  const glyphCount = [...characters].length;
  const atlas = createCharactersTexture(characters, font, fontSize);

  const uResolution = uniform(new Vector2(window.innerWidth, window.innerHeight));
  /** Position de la souris en UV, origine en bas à gauche */
  const uMouse = uniform(new Vector2(0.5, 0.5));
  const uColor = uniform(new Color(color));

  const node = Fn(() => {
    // screenUV : origine en haut à gauche
    const uv = screenUV;
    const cells = uResolution.div(cellSize);
    const pixelizedUV = floor(uv.mul(cells)).add(0.5).div(cells);

    const base = input.sample(uv);
    const pixelized = input.sample(pixelizedUV);
    const grey = dot(pixelized.rgb, vec3(0.299, 0.587, 0.114));

    // Cercle pixellisé aux contours organiques autour de la souris
    const pixelSize = 0.01;
    const aspect = uResolution.x.div(uResolution.y);
    const p = floor(vec2(uv.x.mul(aspect), uv.y.oneMinus()).div(pixelSize)).mul(pixelSize);
    const m = floor(vec2(uMouse.x.mul(aspect), uMouse.y).div(pixelSize)).mul(pixelSize);
    const organicNoise = sin(p.x.mul(50))
      .mul(cos(p.y.mul(30)))
      .mul(0.02)
      .add(sin(p.x.mul(80).add(p.y.mul(60))).mul(0.015))
      .add(cos(p.x.mul(120)).mul(sin(p.y.mul(90))).mul(0.01));
    const circle = step(distance(p, m), float(radius).add(organicNoise));

    // Caractère choisi selon la luminosité de la cellule
    const index = floor(float(glyphCount - 1).mul(grey));
    const glyphCell = vec2(mod(index, ATLAS_PER_ROW), floor(index.div(ATLAS_PER_ROW)));
    const glyphUV = glyphCell.add(fract(uv.mul(cells))).div(ATLAS_PER_ROW);
    const glyph = texture(atlas, glyphUV).r;

    const ascii = vec4(uColor.mul(glyph), pixelized.a);
    return mix(base, ascii, circle);
  })();

  return {
    node,
    setSize: (width: number, height: number) => uResolution.value.set(width, height),
    setMouse: (x: number, y: number) => uMouse.value.set(x, y),
    dispose: () => atlas.dispose(),
  };
}

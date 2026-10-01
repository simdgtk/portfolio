// MeshPhysicalNodeMaterial qui reproduit le rendu PBR de three.js r175 (version
// d'origine du site), pour garder le look « chrome irisé » malgré deux changements
// de three.js :
//
// - r182+ : nouvelle courbe IBLSheenBRDF (≈ 2x plus forte de face), suppression de la
//   compensation d'énergie globale du sheen, et en r186 le sheen reçoit aussi la
//   lumière ambiante + hémisphérique. Avec `sheen: 2` et un sheenColor bleu, le
//   modèle devient un aplat bleu saturé.
// - r186 : la diffusion multiple IBL utilise le F0 de l'iridescence au lieu de son
//   Fresnel, ce qui ternit les reflets irisés aux angles rasants.
import { MeshPhysicalNodeMaterial, PhysicalLightingModel } from "three/webgpu";
import type { Node, NodeBuilder } from "three/webgpu";
import {
  Fn,
  normalView,
  positionViewDirection,
  select,
  sheen,
  sheenRoughness,
  vec3,
} from "three/tsl";

interface LightingContext {
  iblIrradiance: Node<"vec3">;
  ambientOcclusion: Node<"float">;
  outgoingLight: Node<"vec3">;
}

const lightingContext = (builder: NodeBuilder) =>
  builder.context as unknown as LightingContext;

// Courbe d'Estevez & Kulla 2017 telle qu'implémentée jusqu'à three r181
const IBLSheenBRDFLegacy = Fn(
  ([normal, viewDir, roughness]: [Node<"vec3">, Node<"vec3">, Node<"float">]) => {
    const dotNV = normal.dot(viewDir).saturate();
    const r = roughness.clamp(0.07, 1);
    const r2 = r.mul(r);
    const smooth = r.lessThan(0.25);

    const a = select(
      smooth,
      r2.mul(-339.2).add(r.mul(161.4)).sub(25.9),
      r2.mul(-8.48).add(r.mul(14.3)).sub(9.95),
    );
    const b = select(
      smooth,
      r2.mul(44).sub(r.mul(23.7)).add(3.26),
      r2.mul(1.97).sub(r.mul(3.27)).add(0.72),
    );
    const c = select(smooth, 0, r.sub(0.25).mul(0.1));

    return a.mul(dotNV).add(b).exp().add(c).mul(1 / Math.PI).saturate();
  },
);

class LegacyPhysicalLightingModel extends PhysicalLightingModel {
  private readonly legacySheen: boolean;
  private legacySheenIndirect: Node<"vec3"> | null = null;

  constructor(
    clearcoat: boolean,
    useSheen: boolean,
    iridescence: boolean,
    anisotropy: boolean,
    transmission: boolean,
    dispersion: boolean,
    retroreflection: boolean,
  ) {
    // le sheen natif est désactivé, il est recalculé à l'ancienne ci-dessous
    super(clearcoat, false, iridescence, anisotropy, transmission, dispersion, retroreflection);
    this.legacySheen = useSheen;
  }

  override indirect(builder: NodeBuilder) {
    if (this.iridescence) {
      // ≤ r185 : la diffusion multiple IBL utilisait directement le Fresnel irisé
      this.iridescenceF0Dielectric = this.iridescenceFresnel;
      this.iridescenceF0Metallic = this.iridescenceFresnel;
    }
    if (this.legacySheen) {
      this.legacySheenIndirect = vec3().toVar("legacySheenIndirect");
    }
    super.indirect(builder);
  }

  override indirectSpecular(builder: NodeBuilder) {
    super.indirectSpecular(builder);
    if (!this.legacySheenIndirect) return;

    // ≤ r181 : seul l'éclairage de l'environnement alimente le sheen
    const { iblIrradiance } = lightingContext(builder);
    this.legacySheenIndirect.addAssign(
      iblIrradiance.mul(sheen, IBLSheenBRDFLegacy(normalView, positionViewDirection, sheenRoughness)),
    );
  }

  override ambientOcclusion(builder: NodeBuilder) {
    super.ambientOcclusion(builder);
    this.legacySheenIndirect?.mulAssign(lightingContext(builder).ambientOcclusion);
  }

  override finish(builder: NodeBuilder) {
    super.finish(builder);
    if (!this.legacySheenIndirect) return;

    // ≤ r181 : compensation d'énergie approchée appliquée à toute la couche de base
    const { outgoingLight } = lightingContext(builder);
    const energyComp = sheen.r.max(sheen.g).max(sheen.b).mul(0.157).oneMinus();
    outgoingLight.assign(outgoingLight.mul(energyComp).add(this.legacySheenIndirect));
  }
}

export class LegacyMeshPhysicalNodeMaterial extends MeshPhysicalNodeMaterial {
  override setupLightingModel() {
    return new LegacyPhysicalLightingModel(
      this.useClearcoat,
      this.useSheen,
      this.useIridescence,
      this.useAnisotropy,
      this.useTransmission,
      this.useDispersion,
      this.useRetroreflection,
    );
  }
}

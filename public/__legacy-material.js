// DEBUG-TEMP : miroir JS de app/utils/legacyPhysicalMaterial.ts
import { MeshPhysicalNodeMaterial, PhysicalLightingModel } from 'three/webgpu';
import { Fn, normalView, positionViewDirection, select, sheen, sheenRoughness, vec3 } from 'three/tsl';

const IBLSheenBRDFLegacy = Fn(({ normal, viewDir, roughness }) => {
  const dotNV = normal.dot(viewDir).saturate();
  const r = roughness.clamp(0.07, 1);
  const r2 = r.mul(r);
  const smooth = r.lessThan(0.25);
  const a = select(smooth, r2.mul(-339.2).add(r.mul(161.4)).sub(25.9), r2.mul(-8.48).add(r.mul(14.3)).sub(9.95));
  const b = select(smooth, r2.mul(44).sub(r.mul(23.7)).add(3.26), r2.mul(1.97).sub(r.mul(3.27)).add(0.72));
  const c = select(smooth, 0, r.sub(0.25).mul(0.1));
  return a.mul(dotNV).add(b).exp().add(c).mul(1 / Math.PI).saturate();
});

class LegacyPhysicalLightingModel extends PhysicalLightingModel {
  constructor(clearcoat, useSheen, ...rest) { super(clearcoat, false, ...rest); this.legacySheen = useSheen; this.legacySheenIndirect = null; }
  indirect(builder) {
    if (this.iridescence) { this.iridescenceF0Dielectric = this.iridescenceFresnel; this.iridescenceF0Metallic = this.iridescenceFresnel; }
    if (this.legacySheen) this.legacySheenIndirect = vec3().toVar('legacySheenIndirect');
    super.indirect(builder);
  }
  indirectSpecular(builder) {
    super.indirectSpecular(builder);
    if (this.legacySheen) this.legacySheenIndirect.addAssign(builder.context.iblIrradiance.mul(sheen, IBLSheenBRDFLegacy({ normal: normalView, viewDir: positionViewDirection, roughness: sheenRoughness })));
  }
  ambientOcclusion(builder) {
    super.ambientOcclusion(builder);
    if (this.legacySheen) this.legacySheenIndirect.mulAssign(builder.context.ambientOcclusion);
  }
  finish(builder) {
    super.finish(builder);
    if (!this.legacySheen) return;
    const { outgoingLight } = builder.context;
    const energyComp = sheen.r.max(sheen.g).max(sheen.b).mul(0.157).oneMinus();
    outgoingLight.assign(outgoingLight.mul(energyComp).add(this.legacySheenIndirect));
  }
}

export class LegacyMeshPhysicalNodeMaterial extends MeshPhysicalNodeMaterial {
  setupLightingModel() {
    return new LegacyPhysicalLightingModel(this.useClearcoat, this.useSheen, this.useIridescence, this.useAnisotropy, this.useTransmission, this.useDispersion, this.useRetroreflection);
  }
}

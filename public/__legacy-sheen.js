// Version JS du correctif (DEBUG-TEMP, miroir de app/utils/legacySheen.ts)
import { Color } from 'three/webgpu';
import { Fn, float, normalView, normalWorld, output, pmremTexture, positionViewDirection, uniform, vec4 } from 'three/tsl';
export function applyLegacySheen(material, environment) {
  const r = Math.min(Math.max(material.sheenRoughness, 0.07), 1);
  const r2 = r * r;
  const a = r < 0.25 ? -339.2 * r2 + 161.4 * r - 25.9 : -8.48 * r2 + 14.3 * r - 9.95;
  const b = r < 0.25 ? 44.0 * r2 - 23.7 * r + 3.26 : 1.97 * r2 - 3.27 * r + 0.72;
  const c = r < 0.25 ? 0 : 0.1 * (r - 0.25);
  const sheenColor = new Color().copy(material.sheenColor).multiplyScalar(material.sheen);
  const comp = 1 - 0.157 * Math.max(sheenColor.r, sheenColor.g, sheenColor.b);
  const uSheen = uniform(sheenColor);
  material.sheen = 0;
  material.outputNode = Fn(() => {
    const dotNV = normalView.dot(positionViewDirection).saturate();
    const albedo = dotNV.mul(a).add(b).exp().add(c).mul(1 / Math.PI).saturate();
    const irradiance = pmremTexture(environment, normalWorld, float(1)).rgb.mul(Math.PI);
    return vec4(output.rgb.mul(comp).add(irradiance.mul(uSheen).mul(albedo)), output.a);
  })();
}

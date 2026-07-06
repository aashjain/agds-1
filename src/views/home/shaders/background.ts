export const backgroundVertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

export const backgroundFragmentShader = /* glsl */ `
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uResolution;
    uniform vec3 color1;
    uniform vec3 color2;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float amp = 0.5;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 5; i++) {
        v += noise(p) * amp;
        p = rot * p * 2.05 + 9.7;
        amp *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv - 0.5;
      uv.x *= uResolution.x / uResolution.y;

      float t = uTime * 0.38;
      float vignette = smoothstep(0.95, 0.18, length(uv));
      float nebula = fbm(uv * 2.0 + vec2(t, -t * 0.55));
      float veil = fbm(uv * 4.5 - vec2(t * 0.35, t * 0.2));
      float ray = smoothstep(0.03, 0.0, abs(uv.y + sin(uv.x * 3.5 + t) * 0.04));

      vec3 base = vec3(0.004, 0.008, 0.020);
      vec3 cyan = color2;
      vec3 gold = color1;
      vec3 violet = vec3(0.22, 0.10, 0.42);

      vec3 atmosphere = cyan * pow(nebula, 3.0) * 0.26;
      atmosphere += violet * pow(veil, 2.3) * 0.28;
      atmosphere += gold * ray * (0.04 + uScroll * 0.08);
      atmosphere *= vignette;

      float grain = hash(vUv * uResolution.xy + uTime) * 0.018;
      gl_FragColor = vec4(base + atmosphere + grain, 1.0);
    }
`;

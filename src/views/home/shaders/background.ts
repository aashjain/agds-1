/**
 * Ambient nebula background — an orthographic fullscreen quad. fBm noise
 * paints slow violet and teal drifts, masked away from the centre so the
 * particle system keeps focus. Intensity rises gently with scroll.
 */

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

    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    float noise(vec2 x) {
        vec2 i = floor(x);
        vec2 f = fract(x);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    #define OCTAVES 4
    float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 st = vUv;
        st.x *= uResolution.x / uResolution.y;

        // Slow ambient drift; scroll advances the field gently.
        float t = uTime * 2.5 + uScroll * 40.0;

        vec2 st1 = st * 1.2;
        vec2 st2 = st * 1.6;

        // Violet drift (color1).
        float f1 = fbm(st1 + vec2(t * 0.12, t * 0.08));
        float mask1 = pow(fbm(st1 + f1 * 2.2 - vec2(t * 0.2, 0.0)), 2.2) * 2.6;

        // Teal drift (color2).
        float f2 = fbm(st2 - vec2(t * 0.08, t * 0.15));
        float mask2 = pow(fbm(st2 + f2 * 1.8 + vec2(0.0, t * 0.16)), 2.6) * 3.0;

        vec3 finalColor = color1 * mask1 + color2 * mask2;

        // Keep the centre clean — nebula lives in the corners.
        vec2 aspectUv = vUv - 0.5;
        aspectUv.x *= uResolution.x / uResolution.y;
        float centerDist = length(aspectUv);

        float angle = atan(aspectUv.y, aspectUv.x) + uScroll * 6.0;
        float maskOffset = sin(angle * 3.0 + t * 0.3) * 0.04
                         + sin(angle * 5.0 - t * 0.5) * 0.025;
        float dynamicDist = centerDist + maskOffset;

        float cornerFade = smoothstep(0.65, 1.15, dynamicDist);
        cornerFade = pow(cornerFade, 1.6);

        finalColor *= cornerFade * 0.55;

        // Deep navy base.
        vec3 baseBg = vec3(0.016, 0.022, 0.045);

        gl_FragColor = vec4(baseBg + finalColor, 1.0);
    }
`;

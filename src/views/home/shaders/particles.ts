/**
 * Particle morph shader for the AG Designs Studio homepage journey. A dense
 * point cloud moves through four bespoke marketing-led forms, driven by the
 * `uScroll` (0–1) and `uTime` uniforms:
 *
 *   1. Orbital system  — a central brand core with five planetary orbits.
 *   2. Brand planet    — one world in focus, with a service ring and moons.
 *   3. Signal field    — seven flowing campaign lanes with travelling pulses.
 *   4. Ecosystem       — an overhead orrery of orbits, nodes and spokes.
 */

export const particleVertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uScroll;
    uniform float uIntro; // 0 = appearing on load, 1 = settled
    varying float vFade;
    varying vec3 vColor;

    // 3D Simplex Noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
      vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    float random(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
    }

    const float TAU = 6.28318530718;

    void main() {
        // Independent per-particle randoms — stable across frames.
        float r1 = random(position);
        float r2 = random(position + vec3(17.31));
        float r3 = random(position + vec3(47.77));
        float r4 = random(position + vec3(91.13));

        // ------------------------------------------------------------------
        // FORM 1 — ORBITAL MARKETING SYSTEM
        // A warm brand core, five orbital rings with planet clusters, and a
        // faint dust disc. Everything centred at the origin; the camera does
        // the storytelling.
        // ------------------------------------------------------------------
        vec3 orbitalPos;
        float orbitalGlow = 0.0;

        if (r1 < 0.14) {
            // Brand core — dense, slowly churning sphere.
            float phi = acos(r2 * 2.0 - 1.0);
            float th = r3 * TAU + uTime * 0.5;
            float rr = pow(r4, 1.6) * 2.3;
            orbitalPos = vec3(rr * sin(phi) * cos(th), rr * cos(phi) * 0.85, rr * sin(phi) * sin(th));
            orbitalGlow = 1.0;
        } else if (r1 < 0.86) {
            float ring = floor(r2 * 5.0);
            float ringR = 6.0 + ring * 3.1 + (r3 - 0.5) * 0.7;
            float speed = 0.22 - ring * 0.03;
            float knot = fract(r1 * 9.7);
            if (knot < 0.28) {
                // Planet cluster riding the ring.
                float planetAngle = ring * 2.4 + uTime * speed;
                float ang = planetAngle + (r4 - 0.5) * 0.16;
                float pphi = acos(fract(r3 * 7.3) * 2.0 - 1.0);
                float pth = fract(r4 * 5.9) * TAU;
                float pr = pow(fract(r2 * 11.3), 1.5) * 0.75;
                orbitalPos = vec3(ringR * cos(ang), (r3 - 0.5) * 0.3, ringR * sin(ang));
                orbitalPos += vec3(pr * sin(pphi) * cos(pth), pr * cos(pphi), pr * sin(pphi) * sin(pth));
                orbitalGlow = 0.7;
            } else {
                // Thin orbital track.
                float ang = r4 * TAU + uTime * speed;
                orbitalPos = vec3(ringR * cos(ang), (r3 - 0.5) * 0.34, ringR * sin(ang));
            }
        } else {
            // Ambient dust disc.
            float dr = 4.0 + pow(r2, 0.6) * 20.0;
            float ang = r3 * TAU + uTime * 0.05;
            orbitalPos = vec3(dr * cos(ang), (r4 - 0.5) * 1.6, dr * sin(ang));
        }

        // ------------------------------------------------------------------
        // FORM 2 — FOCUSED BRAND PLANET
        // One world fills the frame: a noise-shaded surface, a tilted service
        // ring, and satellites on inclined orbits.
        // ------------------------------------------------------------------
        vec3 planetPos;
        float planetGlow = 0.0;
        float tilt = 0.42;
        mat3 tiltM = mat3(
            1.0, 0.0, 0.0,
            0.0, cos(tilt), -sin(tilt),
            0.0, sin(tilt), cos(tilt)
        );

        if (r1 < 0.55) {
            // Planet surface with slow continental drift.
            float phi = acos(r2 * 2.0 - 1.0);
            float th = r3 * TAU + uTime * 0.06;
            vec3 dir = vec3(sin(phi) * cos(th), cos(phi), sin(phi) * sin(th));
            float surf = snoise(dir * 2.2 + vec3(0.0, uTime * 0.05, 0.0));
            planetPos = dir * (3.1 + surf * 0.28 + pow(r4, 3.0) * 0.12);
        } else if (r1 < 0.85) {
            // Service ring — thin, tilted, faster on the inner edge.
            float rr = 4.6 + pow(r2, 1.4) * 2.8;
            float ang = r3 * TAU + uTime * (0.18 - r2 * 0.05);
            planetPos = tiltM * vec3(rr * cos(ang), (r4 - 0.5) * 0.14, rr * sin(ang));
            planetGlow = 0.5;
        } else {
            // Satellites on three inclined orbits.
            float orb = floor(r2 * 3.0);
            float rr = 8.2 + orb * 1.4;
            float ang = r3 * TAU + uTime * (0.3 + orb * 0.07);
            vec3 base = vec3(rr * cos(ang), (r4 - 0.5) * 0.4, rr * sin(ang));
            float inc = (orb - 1.0) * 0.5;
            mat3 incM = mat3(
                cos(inc), -sin(inc), 0.0,
                sin(inc), cos(inc), 0.0,
                0.0, 0.0, 1.0
            );
            planetPos = incM * base;
            planetGlow = 0.8;
        }

        // ------------------------------------------------------------------
        // FORM 3 — CAMPAIGN SIGNAL FIELD
        // Seven curved lanes flowing toward the viewer, carrying brighter
        // "packet" pulses — creative work travelling to measurable outcomes.
        // ------------------------------------------------------------------
        float lane = floor(r1 * 7.0);
        float laneX = (lane - 3.0) * 4.6;
        float laneY = sin(lane * 2.3) * 2.2 - 1.0;
        float flow = fract(r2 + uTime * 0.045 * (0.7 + 0.6 * r3));
        float z = mix(-95.0, 12.0, flow);
        vec3 signalPos = vec3(
            laneX + sin(z * 0.045 + lane * 1.3) * 3.2 + (r3 - 0.5) * 1.0,
            laneY + cos(z * 0.035 + lane * 2.1) * 1.7 + (r4 - 0.5) * 1.0,
            z
        );
        float pk = fract(flow * 4.0 + lane * 0.37);
        float packet = smoothstep(0.12, 0.0, min(pk, 1.0 - pk));

        // ------------------------------------------------------------------
        // FORM 4 — ECOSYSTEM ORRERY
        // The closing view: elliptical orbits with node clusters, radial
        // connection spokes and a bright nucleus, seen from above.
        // ------------------------------------------------------------------
        vec3 ecoPos;
        float ecoGlow = 0.0;

        if (r1 < 0.16) {
            // Nucleus.
            float phi = acos(r2 * 2.0 - 1.0);
            float th = r3 * TAU + uTime * 0.25;
            float rr = pow(r4, 2.0) * 4.5;
            ecoPos = vec3(rr * sin(phi) * cos(th), rr * cos(phi) * 0.5, rr * sin(phi) * sin(th));
            ecoGlow = 1.0;
        } else if (r1 < 0.30) {
            // Connection spokes between orbits.
            float spoke = floor(r2 * 10.0);
            float ang = spoke * 0.628318 + uTime * 0.04 + (r3 - 0.5) * 0.05;
            float rr = mix(5.0, 33.0, pow(r4, 0.8));
            ecoPos = vec3(rr * cos(ang), (r3 - 0.5) * 0.5, rr * sin(ang) * 0.66);
            ecoGlow = 0.35;
        } else {
            // Elliptical orbits with node clusters.
            float ring = floor(r2 * 6.0);
            float a = 8.0 + ring * 4.6 + (r3 - 0.5) * 0.9;
            float b = a * 0.66;
            float speed = 0.1 - ring * 0.011;
            float nodeSel = fract(r1 * 13.7);
            if (nodeSel < 0.18) {
                float nodeAng = ring * 1.9 + uTime * speed + (r4 - 0.5) * 0.1;
                ecoPos = vec3(a * cos(nodeAng), (r3 - 0.5) * 0.8, b * sin(nodeAng));
                ecoGlow = 0.8;
            } else {
                float ang = r4 * TAU + uTime * speed;
                ecoPos = vec3(a * cos(ang), (r3 - 0.5) * 0.55, b * sin(ang));
            }
        }

        // ------------------------------------------------------------------
        // SCROLL TIMELINE — three morphs between the four forms.
        // ------------------------------------------------------------------
        float mPlanet = smoothstep(0.16, 0.36, uScroll);
        float mSignal = smoothstep(0.42, 0.60, uScroll);
        float mEco    = smoothstep(0.66, 0.86, uScroll);

        vec3 pos = mix(orbitalPos, planetPos, mPlanet);
        pos = mix(pos, signalPos, mSignal);
        pos = mix(pos, ecoPos, mEco);

        // Intro: cloud gathers inward and fades up on first load.
        pos *= mix(0.55, 1.0, uIntro);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

        // ------------------------------------------------------------------
        // COLOUR — deep navy world, ion cyan / soft violet / antique gold.
        // ------------------------------------------------------------------
        vec3 ivory  = vec3(0.96, 0.93, 0.86);
        vec3 gold   = vec3(0.85, 0.68, 0.40);
        vec3 cyan   = vec3(0.30, 0.78, 0.88);
        vec3 violet = vec3(0.55, 0.49, 0.93);

        float orad = length(orbitalPos.xz);
        vec3 orbCol = mix(
            mix(ivory, gold, smoothstep(0.0, 3.0, orad)),
            mix(cyan, violet, smoothstep(9.0, 22.0, orad)),
            smoothstep(3.0, 9.0, orad)
        );
        orbCol = mix(orbCol, ivory, orbitalGlow * 0.3);

        vec3 plCol = r1 < 0.55
            ? mix(cyan * 0.85, ivory, pow(r4, 4.0))
            : (r1 < 0.85 ? gold : violet);

        float laneSel = mod(lane, 3.0);
        vec3 sigCol = laneSel < 0.5 ? cyan : (laneSel < 1.5 ? gold : violet);
        sigCol = mix(sigCol, ivory, packet * 0.8);

        float erad = length(ecoPos.xz);
        vec3 ecoCol = mix(
            mix(ivory, gold, smoothstep(0.0, 4.0, erad)),
            mix(cyan, violet, smoothstep(14.0, 34.0, erad)),
            smoothstep(4.0, 14.0, erad)
        );
        ecoCol = mix(ecoCol, ivory, ecoGlow * 0.25);

        vColor = mix(orbCol, plCol, mPlanet);
        vColor = mix(vColor, sigCol, mSignal);
        vColor = mix(vColor, ecoCol, mEco);

        // ------------------------------------------------------------------
        // SIZE & OPACITY — tuned per form so density never blows out.
        // ------------------------------------------------------------------
        float opacity = 0.55;
        float size = 2.2 + orbitalGlow * 1.6;

        opacity = mix(opacity, 0.5, mPlanet);
        size = mix(size, 2.6 + planetGlow * 1.4, mPlanet);

        opacity = mix(opacity, 0.38 + packet * 0.55, mSignal);
        size = mix(size, 3.2 + packet * 3.2, mSignal);

        opacity = mix(opacity, 0.45, mEco);
        size = mix(size, 2.4 + ecoGlow * 2.0, mEco);

        vFade = opacity * smoothstep(0.0, 0.3, uIntro);

        gl_PointSize = clamp(size * (34.0 / max(0.001, -mvPosition.z)), 1.2, 18.0);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

export const particleFragmentShader = /* glsl */ `
    varying float vFade;
    varying vec3 vColor;

    void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if (ll > 0.5) discard;

        float pointAlpha = smoothstep(0.5, 0.08, ll);
        gl_FragColor = vec4(vColor, vFade * pointAlpha * 0.9);
    }
`;

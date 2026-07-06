export const particleVertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uScroll;
    uniform float uIntro;
    varying float vEdgeFade;
    varying vec3 vColor;

    float hash(float n) { return fract(sin(n) * 43758.5453123); }
    float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453123); }

    vec3 palette(float t) {
      // Closer to the original point-field character: cool blue/violet dust with
      // a restrained warm core, never pure white.
      vec3 blue = vec3(0.18, 0.34, 0.92);
      vec3 cyan = vec3(0.22, 0.72, 0.95);
      vec3 violet = vec3(0.50, 0.32, 0.86);
      vec3 amber = vec3(0.92, 0.56, 0.26);
      vec3 cool = mix(blue, cyan, smoothstep(0.05, 0.45, t));
      vec3 cosmic = mix(cool, violet, smoothstep(0.38, 0.82, t));
      return mix(cosmic, amber, smoothstep(0.84, 1.0, t)) * 0.82;
    }

    mat2 rotate2d(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }

    vec3 spherePoint(float a, float b, float r) {
      float z = b * 2.0 - 1.0;
      float q = sqrt(max(0.0, 1.0 - z * z));
      float theta = a * 6.2831853;
      return vec3(q * cos(theta), z, q * sin(theta)) * r;
    }

    void main() {
      vec3 seed = position;
      float r1 = hash(seed + vec3(1.0));
      float r2 = hash(seed + vec3(2.0));
      float r3 = hash(seed + vec3(3.0));
      float r4 = hash(seed + vec3(4.0));
      float r5 = hash(seed + vec3(5.0));
      float r6 = hash(seed + vec3(6.0));

      float scroll = clamp(uScroll, 0.0, 1.0);

      // FORM 01 — agency solar system: brand core, marketing planets, orbital dust.
      float planetBand = floor(r1 * 7.0);
      float orbitRadius = 4.0 + planetBand * 1.55 + r2 * 0.7;
      float orbitAngle = r3 * 6.2831853 + uTime * (0.13 + planetBand * 0.018);
      float orbitTilt = -0.58 + planetBand * 0.17;
      vec2 orbitXZ = vec2(cos(orbitAngle), sin(orbitAngle)) * orbitRadius;
      orbitXZ = rotate2d(orbitTilt) * orbitXZ;
      float orbitalDust = step(0.28, r4);
      float planetSize = mix(0.22, 0.95, hash(planetBand + 1.7));
      vec3 planetCentre = vec3(orbitXZ.x, sin(orbitAngle * 1.7 + planetBand) * 0.7, orbitXZ.y);
      vec3 cluster = spherePoint(r5, r6, planetSize * (0.3 + r2));
      vec3 ringPoint = vec3(orbitXZ.x, (r5 - 0.5) * 0.09, orbitXZ.y);
      vec3 solarPos = mix(planetCentre + cluster, ringPoint, orbitalDust);
      solarPos.y += sin(orbitAngle + r2 * 6.2831853) * 0.45;

      // FORM 02 — focus on one planet: the camera appears to select a channel.
      vec3 focusCore = spherePoint(r3, r4, 2.75 + r2 * 0.2);
      focusCore += normalize(focusCore) * sin(uTime * 1.25 + r1 * 9.0) * 0.18;
      vec3 focusRing = vec3(cos(r1 * 6.2831853) * (4.2 + r2 * 0.8), (r5 - 0.5) * 0.18, sin(r1 * 6.2831853) * (4.2 + r2 * 0.8));
      vec3 focusPos = mix(focusCore, focusRing, step(0.74, r4));
      focusPos.z -= 8.0;
      focusPos.x += 1.2;

      // FORM 03 — constellation map: service nodes connected by orbital paths.
      float node = floor(r1 * 10.0);
      float nodeAngle = node / 10.0 * 6.2831853;
      float nodeRadius = 7.0 + mod(node, 3.0) * 1.1;
      vec3 nodeCentre = vec3(cos(nodeAngle) * nodeRadius, sin(node * 1.37) * 2.6, sin(nodeAngle) * nodeRadius - 22.0);
      vec3 nodeCloud = spherePoint(r2, r3, 0.35 + r4 * 0.45);
      float pathMix = step(0.55, r5);
      float pathAngle = mix(nodeAngle, nodeAngle + 0.72, r6);
      vec3 pathPoint = vec3(cos(pathAngle) * nodeRadius, mix(-2.5, 2.5, r2), sin(pathAngle) * nodeRadius - 22.0);
      vec3 constellationPos = mix(nodeCentre + nodeCloud, pathPoint, pathMix);
      constellationPos.xy = rotate2d(sin(uTime * 0.2) * 0.08) * constellationPos.xy;

      // FORM 04 — content/media stream: particles become a clean campaign signal field.
      float lane = floor(r1 * 9.0) - 4.0;
      float streamDepth = -18.0 - r2 * 56.0;
      float streamX = lane * 1.35 + sin(streamDepth * 0.13 + uTime + r3 * 6.0) * 0.35;
      float streamY = (r4 - 0.5) * 7.5 + sin(r1 * 14.0 + uTime * 0.55) * 0.22;
      vec3 streamPos = vec3(streamX, streamY, streamDepth);

      // FORM 05 — final galaxy: the full ecosystem pulls together.
      float gRadius = pow(r1, 1.8) * 42.0;
      float arm = floor(r2 * 3.0);
      float gTheta = arm * 2.0943951 + gRadius * 0.12 + pow(r3 * 2.0 - 1.0, 5.0) * 1.2 + uTime * 0.18;
      vec3 galaxyPos = vec3(cos(gTheta) * gRadius, pow(r4 * 2.0 - 1.0, 3.0) * 3.0, sin(gTheta) * gRadius - 82.0);
      float bulge = smoothstep(15.0, 0.0, gRadius);
      galaxyPos = mix(galaxyPos, spherePoint(r5, r6, pow(r3, 2.0) * 9.0) + vec3(0.0, 0.0, -82.0), bulge);

      float toFocus = smoothstep(0.10, 0.25, scroll);
      float toConstellation = smoothstep(0.28, 0.48, scroll);
      float toStream = smoothstep(0.52, 0.70, scroll);
      float toGalaxy = smoothstep(0.78, 0.94, scroll);

      vec3 p1 = mix(solarPos, focusPos, toFocus);
      vec3 p2 = mix(p1, constellationPos, toConstellation);
      vec3 p3 = mix(p2, streamPos, toStream);
      vec3 finalPos = mix(p3, galaxyPos, toGalaxy);

      finalPos += vec3(
        sin(uTime * 0.7 + r1 * 12.0),
        cos(uTime * 0.5 + r2 * 10.0),
        sin(uTime * 0.45 + r3 * 8.0)
      ) * 0.035;

      vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);

      float planetGlow = 0.42 - orbitalDust * 0.16;
      float focusGlow = mix(1.0, 0.78, toFocus * (1.0 - toConstellation));
      float streamGlow = mix(1.0, 0.58, toStream * (1.0 - toGalaxy));
      float galaxyGlow = mix(1.0, 0.72, toGalaxy);

      vEdgeFade = smoothstep(0.0, 0.2, uIntro) * planetGlow * focusGlow * streamGlow * galaxyGlow;
      vEdgeFade *= 0.45 + 0.35 * smoothstep(0.0, 1.0, r6);

      float colorKey = mix(r1, gRadius / 42.0, toGalaxy);
      vColor = palette(colorKey);
      vColor += vec3(0.08, 0.16, 0.22) * smoothstep(0.2, 0.9, toStream);

      float pointBase = mix(2.2, 4.2, step(0.92, r5));
      pointBase = mix(pointBase, 5.0, (1.0 - orbitalDust) * (1.0 - toStream) * 0.28);
      pointBase = mix(pointBase, 2.4, toStream * (1.0 - toGalaxy));
      pointBase = mix(pointBase, mix(2.2, 6.2, step(0.992, r6)), toGalaxy);
      gl_PointSize = pointBase * (10.0 / max(0.1, -mvPosition.z));
      gl_PointSize = max(gl_PointSize, 0.9);

      gl_Position = projectionMatrix * mvPosition;
    }
`;

export const particleFragmentShader = /* glsl */ `
    varying float vEdgeFade;
    varying vec3 vColor;

    void main() {
      vec2 xy = gl_PointCoord.xy - vec2(0.5);
      float d = length(xy);
      if (d > 0.5) discard;
      // Original-style point rendering: crisp soft dots, no extra halo.
      float pointAlpha = smoothstep(0.5, 0.1, d);
      gl_FragColor = vec4(vColor, vEdgeFade * pointAlpha * 0.78);
    }
`;

export const particleVertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uScroll;
    uniform float uIntro;
    varying float vEdgeFade;
    varying vec3 vColor;

    float hash(float n) { return fract(sin(n) * 43758.5453123); }
    float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453123); }

    vec3 palette(float t) {
      // Restored original project particle colour system: pure deep blue
      // blending into the warm orange used across the uploaded template.
      vec3 cBottom = vec3(0.2, 0.4, 1.0);
      vec3 cTop = vec3(1.0, 0.3, 0.2);
      return mix(cBottom, cTop, clamp(t, 0.0, 1.0));
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

      // FORM 01 - agency solar system: brand core, marketing planets, orbital dust.
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

      // FORM 02 - focus on one planet: the camera appears to select a channel.
      vec3 focusCore = spherePoint(r3, r4, 2.75 + r2 * 0.2);
      focusCore += normalize(focusCore) * sin(uTime * 1.25 + r1 * 9.0) * 0.18;
      vec3 focusRing = vec3(cos(r1 * 6.2831853) * (4.2 + r2 * 0.8), (r5 - 0.5) * 0.18, sin(r1 * 6.2831853) * (4.2 + r2 * 0.8));
      vec3 focusPos = mix(focusCore, focusRing, step(0.74, r4));
      focusPos.z -= 8.0;
      focusPos.x += 1.2;

      // FORM 03 - focused service planet: a complete sphere anchored inside
      // the viewport while the service cards appear sequentially on the right.
      // Large service planet: designed to read as a spacious, complete sphere
      // on the left while the service masonry occupies the right.
      vec3 serviceSphere = spherePoint(r2, r3, 13.43 + r4 * 0.31);
      serviceSphere.x *= 1.0;
      serviceSphere.y *= 1.0;
      serviceSphere.z *= 1.0;
      serviceSphere.x -= 24.70;
      serviceSphere.y -= 0.04;
      serviceSphere.z -= 10.9;

      // Saturn-style ring treatment: a clean, randomised annulus with no
      // straight source-geometry striping. The ring is flipped along the X axis
      // so the upper/lower read is reversed without touching planet/card layout.
      float serviceRingAngle = hash(seed * 41.7 + vec3(9.0, 2.0, 5.0)) * 6.2831853 - uTime * 0.18;
      float serviceRingTilt = 0.645772; // 37 degrees
      // Lift the ring so it wraps the planet visually, instead of sitting too low.
      float serviceRingLift = 4.13;
      float ringBandRandom = pow(hash(seed * 27.1 + vec3(3.0, 8.0, 1.0)), 0.72) - 0.5;
      float serviceRingBand = ringBandRandom * 6.84;
      float serviceRingRadius = 15.58 + serviceRingBand + (hash(seed * 12.4) - 0.5) * 0.68;
      float serviceRingX = cos(serviceRingAngle) * serviceRingRadius;
      float serviceRingZ = sin(serviceRingAngle) * serviceRingRadius;
      float ringPlaneNoise = (hash(seed * 18.9 + vec3(4.0, 7.0, 2.0)) - 0.5) * 0.18;
      float tiltedRingY = -(serviceRingZ * sin(serviceRingTilt)) + ringPlaneNoise;
      float tiltedRingZ = serviceRingZ * cos(serviceRingTilt);
      vec3 serviceRing = vec3(
        serviceRingX - 24.70,
        tiltedRingY + serviceRingLift, // primary lift before the visual slant is applied
        tiltedRingZ - 10.9
      );
      serviceRing.xy = rotate2d(-0.28) * serviceRing.xy;
      // Final screen-space lift applied after the ring slant. This moves the
      // visible ring upward without changing the approved planet position.
      float serviceRingPostLift = 5.80;
      serviceRing.y += serviceRingPostLift;

      // Ring depth mask. Segments travelling behind the sphere are softened
      // when they pass across the projected planet body, so the ring feels
      // like it wraps around the planet instead of being pasted over it.
      float ringBehindPlanet = step(0.0, -tiltedRingZ);
      float projectedRingDistance = length(vec2(serviceRingX, tiltedRingY + serviceRingLift + serviceRingPostLift + 0.04));
      float planetMaskArea = 1.0 - smoothstep(11.35, 13.95, projectedRingDistance);
      float ringDepthMask = 1.0 - ringBehindPlanet * planetMaskArea * 0.94;

      float serviceRingMix = step(0.84, r5);
      vec3 constellationPos = mix(serviceSphere, serviceRing, serviceRingMix);
      constellationPos += vec3(0.0, sin(uTime * 0.35 + r1 * 6.0) * 0.025, 0.0);

      // FORM 04 - content/media stream: particles become a clean campaign signal field.
      float lane = floor(r1 * 9.0) - 4.0;
      float streamDepth = -18.0 - r2 * 56.0;
      float streamX = lane * 1.35 + sin(streamDepth * 0.13 + uTime + r3 * 6.0) * 0.35;
      float streamY = (r4 - 0.5) * 7.5 + sin(r1 * 14.0 + uTime * 0.55) * 0.22;
      vec3 streamPos = vec3(streamX, streamY, streamDepth);

      // FORM 05 - final original-project energy ring. This recreates the
      // uploaded template's opening circular particle halo with a large hollow
      // centre and wavy threaded edges, coloured by the original blue-orange shader palette.
      float portalTheta = r1 * 6.2831853 + uTime * 0.08;
      float portalThread = hash(seed * 43.7 + vec3(6.0, 1.0, 8.0));
      float portalBand = (portalThread - 0.5) * 7.8;
      float portalWave = sin(portalTheta * 7.0 + r3 * 8.0 + uTime * 0.24) * 1.0
        + sin(portalTheta * 17.0 - r6 * 5.0 + uTime * 0.16) * 0.45;
      float portalRadius = 39.0 + portalBand + portalWave;
      float portalEllipseY = 0.70;
      vec3 galaxyPos = vec3(
        cos(portalTheta) * portalRadius,
        sin(portalTheta) * portalRadius * portalEllipseY,
        -58.0 + (r5 - 0.5) * 2.6
      );

      // Threaded micro movement from the original ring, kept random enough to
      // avoid visible straight-line bands while preserving the circular form.
      galaxyPos.x += sin(portalTheta * 23.0 + r2 * 9.0 + uTime * 0.32) * 0.65;
      galaxyPos.y += cos(portalTheta * 19.0 - r4 * 7.0 + uTime * 0.26) * 0.55;

      float toFocus = smoothstep(0.10, 0.25, scroll);
      float toConstellation = smoothstep(0.18, 0.29, scroll);
      float toStream = smoothstep(0.60, 0.76, scroll);
      float toGalaxy = smoothstep(0.79, 0.90, scroll);

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
      vEdgeFade *= 0.50 + 0.38 * smoothstep(0.0, 1.0, r6);
      vEdgeFade = mix(vEdgeFade, 0.86 * (0.72 + 0.28 * smoothstep(0.0, 1.0, r6)), toGalaxy);
      if (serviceRingMix > 0.5 && toConstellation > 0.02 && toStream < 0.98) {
        vEdgeFade *= ringDepthMask;
      }

      // --- ORIGINAL PROJECT PARTICLE COLOUR SYSTEM ---
      // The uploaded source uses one consistent blue-to-orange shader palette
      // for every particle form. Keep the exact RGB values and remove all
      // section-specific overrides so the full site matches the source code.
      vec3 cBottom = vec3(0.2, 0.4, 1.0); // Deep Blue
      vec3 cTop = vec3(1.0, 0.3, 0.2);    // Blazing Orange

      float baseColorMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
      vec3 normalColor = mix(cBottom, cTop, clamp(baseColorMix, 0.0, 1.0));

      // Keep the final portal/galaxy within the same uploaded-project palette:
      // warmer particles towards the visual core, blue towards the outer edge.
      float orangeMix = smoothstep(46.0, 28.0, portalRadius);
      vec3 galaxyColor = mix(cBottom, cTop, clamp(orangeMix, 0.0, 1.0));

      vColor = mix(normalColor, galaxyColor, toGalaxy);

      float pointBase = mix(2.2, 4.2, step(0.92, r5));
      pointBase = mix(pointBase, 5.0, (1.0 - orbitalDust) * (1.0 - toStream) * 0.28);
      pointBase = mix(pointBase, 2.4, toStream * (1.0 - toGalaxy));
      pointBase = mix(pointBase, mix(4.8, 9.6, step(0.992, r6)), toGalaxy);
      gl_PointSize = pointBase * (10.0 / max(0.1, -mvPosition.z));
      gl_PointSize = max(gl_PointSize, 1.0);

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
      gl_FragColor = vec4(vColor, vEdgeFade * pointAlpha * 0.9);
    }
`;

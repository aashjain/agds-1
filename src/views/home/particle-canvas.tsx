"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { subscribeToTicker } from "@/lib/animation/ticker";

import {
  backgroundFragmentShader,
  backgroundVertexShader,
} from "./shaders/background";
import {
  particleFragmentShader,
  particleVertexShader,
} from "./shaders/particles";
import { experienceProgress, useExperiencePhase } from "./experience";

/**
 * Fixed WebGL backdrop for the AG Designs Studio homepage.
 * The particle field remaps one dense source mesh into a solar system, focused
 * planet, service constellation, campaign signal field and final galaxy.
 */
export const ParticleCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    // --- AURORA BACKGROUND SETUP ---
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0.0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        color1: { value: new THREE.Color("#ff4c33") },
        color2: { value: new THREE.Color("#3366ff") },
      },
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      depthWrite: false,
    });
    const bgQuad = new THREE.Mesh(bgGeometry, bgMaterial);
    bgScene.add(bgQuad);

    // Dense source geometry remapped in the shader into solar, planet, signal and galaxy forms.
    const geometry = new THREE.SphereGeometry(4.2, 200, 600);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0.0 },
        uIntro: { value: 0.0 },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    // Keep visible when stretched far below the original bounding sphere.
    particles.frustumCulled = false;
    scene.add(particles);

    // --- POST-PROCESSING (BLOOM) ---
    const composer = new EffectComposer(renderer);

    const renderBg = new RenderPass(bgScene, bgCamera);
    composer.addPass(renderBg);

    const renderFg = new RenderPass(scene, camera);
    renderFg.clear = false;
    renderFg.clearDepth = true;
    composer.addPass(renderFg);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength - original uploaded-project glow
      0.5, // radius - original uploaded-project bloom spread
      0.05, // threshold - original uploaded-project particle bloom
    );
    composer.addPass(bloomPass);

    let time = 0;

    // Smooth scroll driver: raw page scroll becomes a target, while the WebGL
    // experience advances towards it at a capped speed. This keeps the motion
    // consistent even when a user flicks or drags the page quickly.
    let smoothScroll = 0;
    let lastFrameTime = 0;
    const SCROLL_PROGRESS_PER_MS = 0.00032;

    // On-load intro: the orbital field breathes into view before scroll takes over.
    const INTRO_MS = 2600;
    let introStart = 0;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bgMaterial.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    };
    window.addEventListener("resize", handleResize);

    const render = (now: number) => {
      // Intro progress (eased), driven by wall-clock since the first frame.
      if (introStart === 0) introStart = now;
      const introRaw = Math.min((now - introStart) / INTRO_MS, 1);
      const introEased = 1 - Math.pow(1 - introRaw, 3); // easeOutCubic
      material.uniforms.uIntro.value = introEased;

      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const targetScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;
      if (lastFrameTime === 0) lastFrameTime = now;
      const deltaMs = Math.min(Math.max(now - lastFrameTime, 16), 50);
      lastFrameTime = now;
      const scrollDelta = targetScroll - smoothScroll;
      const maxScrollStep = deltaMs * SCROLL_PROGRESS_PER_MS;
      if (Math.abs(scrollDelta) <= maxScrollStep) {
        smoothScroll = targetScroll;
      } else {
        smoothScroll += Math.sign(scrollDelta) * maxScrollStep;
      }

      const currentScroll = smoothScroll;

      // Background ambience may continue gently, but the particle system itself
      // is now scroll-scrubbed. Every particle state is derived from smoothed
      // scroll progress, so scrolling down moves forms from A → B and scrolling
      // up returns them from B → A with no hidden time accumulator.
      time += 0.005;
      const ambientDrift = time * 0.42;
      const particleTime = introEased * 1.2 + currentScroll * 34.0 + ambientDrift;

      material.uniforms.uTime.value = particleTime;
      material.uniforms.uScroll.value = currentScroll;
      bgMaterial.uniforms.uTime.value = time;
      bgMaterial.uniforms.uScroll.value = currentScroll;

      // --- CAMERA & ROTATION LOGIC ---
      // New flow: begin outside a living solar system, push into a selected
      // planet, then pass through service constellations, campaign streams and
      // the final marketing ecosystem.
      const ease = (x: number) => x * x * (3 - 2 * x);
      const focus = ease(Math.min(Math.max((currentScroll - 0.08) / 0.22, 0), 1));
      const constellation = ease(
        Math.min(Math.max((currentScroll - 0.18) / 0.12, 0), 1),
      );
      // Start the orbital-gap zoom shortly after the last service card has
      // appeared. This avoids the dead scroll zone where only the ring moves,
      // while keeping the cards, planet and ring composition untouched.
      // Last card reveal completes around 37% progress; the zoom begins after
      // a small buffer, roughly equivalent to 100px on the intended scroll range.
      const gapPass = ease(Math.min(Math.max((currentScroll - 0.39) / 0.15, 0), 1));
      const tunnelHold = ease(Math.min(Math.max((currentScroll - 0.48) / 0.10, 0), 1));
      const stream = ease(Math.min(Math.max((currentScroll - 0.52) / 0.035, 0), 1));
      const galaxy = ease(Math.min(Math.max((currentScroll - 0.80) / 0.18, 0), 1));

      camera.position.x = THREE.MathUtils.lerp(0.0, 1.8, focus);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -0.95, constellation);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -4.85, gapPass);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -10.25, tunnelHold * (1 - stream));
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -0.35, stream);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.0, galaxy);

      camera.position.y = THREE.MathUtils.lerp(4.0, 0.8, focus);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.0, constellation);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.18, gapPass);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.02, tunnelHold * (1 - stream));
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -0.15, stream);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.0, galaxy);

      camera.position.z = THREE.MathUtils.lerp(18.0, 7.4, focus);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 9.6, constellation);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.85, gapPass);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 0.85, tunnelHold * (1 - stream));
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, -15.5, stream);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 18.0, galaxy);

      const introZoom =
        (1 - introEased) * 4.5 * (1 - Math.min(currentScroll / 0.06, 1));
      camera.position.z += introZoom;

      const lookTarget = new THREE.Vector3(
        THREE.MathUtils.lerp(0.0, -4.85, constellation) - gapPass * 5.5 - tunnelHold * 7.0 + stream * 3.8,
        THREE.MathUtils.lerp(-0.02, -0.5, stream) + gapPass * 0.14 + tunnelHold * 0.04,
        THREE.MathUtils.lerp(-9.5, -18.5, gapPass) - tunnelHold * 2.2 + stream * 2.0,
      );
      lookTarget.z = THREE.MathUtils.lerp(lookTarget.z, -58.0, galaxy);
      camera.lookAt(lookTarget);

      const serviceVisibility = constellation * (1 - Math.min(Math.max((currentScroll - 0.50) / 0.13, 0), 1));
      // Keep particle travel time-led only. Do not add scroll progress into the
      // rotation itself; even a positive scroll offset can visually fight the
      // shader's clockwise time flow and read as a reversal during fast or slow
      // page movement. Scroll still morphs the forms, but clockwise travel is
      // governed by uTime throughout the experience.
      const orbitalRotation = particleTime * 0.055;
      // Restore the service-planet framing from V22: once the particles become
      // the planet, the group rotation settles into a fixed viewing angle so
      // the sphere stays inside the viewport. The shader still carries subtle
      // ambient motion, and scroll still drives the A → B / B → A morph.
      const serviceRotation = -0.08 + time * 0.012;
      particles.rotation.y = THREE.MathUtils.lerp(
        orbitalRotation,
        serviceRotation,
        serviceVisibility,
      );
      particles.rotation.x = THREE.MathUtils.lerp(
        Math.sin(currentScroll * Math.PI) * 0.08,
        -0.015,
        serviceVisibility,
      );
      camera.rotation.z = Math.sin(currentScroll * Math.PI * 2.0) * 0.012 * (1 - serviceVisibility);

      const glowScaleProgress = Math.min(Math.max((currentScroll - 0.74) / 0.12, 0), 1);
      const glowScale = Math.pow(glowScaleProgress, 2.8) * 24.0;
      const hideGlow = Math.min(Math.max((currentScroll - 0.88) / 0.08, 0), 1);
      glow.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
      glow.style.opacity = `${(1.0 - hideGlow) * glowScaleProgress * 0.28}`;

      // Publish progress for overlays (module value for per-frame card motion,
      // store for phase-boundary re-renders).
      experienceProgress.current = currentScroll;
      useExperiencePhase.getState().sync(currentScroll);

      composer.render();
    };

    const unsubscribe = subscribeToTicker(render, () => 0);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      renderer.domElement.remove();
      geometry.dispose();
      material.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      bloomPass.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {/* Soft system flare used during the transition into the final ecosystem. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-1/2 z-10 size-25 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(214,170,99,0.72) 0%, rgba(38,216,255,0.28) 38%, rgba(255,255,255,0) 72%)",
        }}
      />
    </>
  );
};

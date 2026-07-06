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
 * The fixed WebGL backdrop for the AG Designs Studio journey: a nebula quad,
 * the four-form particle morph, and a restrained bloom pass.
 *
 * Camera choreography (all forms are centred at the origin, so the camera
 * carries the narrative):
 *   1. Hero      — high, tilted orbit around the marketing system.
 *   2. Approach  — spiral descent toward the focused brand planet.
 *   3. Signal    — settle low and level while campaign lanes flow past.
 *   4. Ecosystem — rise to an overhead view of the full orrery.
 *
 * Smoothing lives in Lenis (the shared scroll layer), so reading scroll each
 * frame already yields a smoothed value — the single source of progress that
 * also feeds the overlay phases. The render loop runs on the shared ticker.
 */

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export const ParticleCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 13, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    // --- NEBULA BACKGROUND ---
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
        color1: { value: new THREE.Color("#6f5fd8") }, // soft violet
        color2: { value: new THREE.Color("#1f8ba6") }, // deep teal
      },
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      depthWrite: false,
    });
    const bgQuad = new THREE.Mesh(bgGeometry, bgMaterial);
    bgScene.add(bgQuad);

    // Dense SphereGeometry rendered as Points — a stable vertex pool whose
    // positions only seed per-particle randoms in the shader.
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
    // Forms extend far beyond the seed sphere's bounding volume.
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
      0.85, // strength — restrained, premium glow
      0.45, // radius
      0.2, // threshold
    );
    composer.addPass(bloomPass);

    let time = 0;

    // On-load intro: the orbital system gathers from a tighter cloud and
    // fades up. Time-driven, starting on the first rendered frame.
    const INTRO_MS = 2400;
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

    const camPos = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const tmpPos = new THREE.Vector3();
    const tmpLook = new THREE.Vector3();

    const render = (now: number) => {
      time += 0.005;

      if (introStart === 0) introStart = now;
      const introRaw = Math.min((now - introStart) / INTRO_MS, 1);
      const introEased = 1 - Math.pow(1 - introRaw, 3);
      material.uniforms.uIntro.value = introEased;

      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const p = maxScroll > 0 ? scrollTop / maxScroll : 0;

      material.uniforms.uTime.value = time;
      material.uniforms.uScroll.value = p;
      bgMaterial.uniforms.uTime.value = time;
      bgMaterial.uniforms.uScroll.value = p;

      // --- CAMERA CHOREOGRAPHY ---

      // Pose 1 → 2: orbital overview spiralling down into the planet.
      const dive = smooth(0.14, 0.38, p);
      const radius = THREE.MathUtils.lerp(27, 9.5, dive);
      const elevation = THREE.MathUtils.lerp(1.02, 1.32, dive); // from Y axis
      const azimuth = 0.6 + time * 0.06 + dive * 2.6;
      camPos.set(
        radius * Math.sin(elevation) * Math.cos(azimuth),
        radius * Math.cos(elevation),
        radius * Math.sin(elevation) * Math.sin(azimuth),
      );
      lookTarget.set(0, 0, 0);

      // Pose 3: low, level flight while the signal field streams past.
      const toSignal = smooth(0.4, 0.56, p);
      if (toSignal > 0) {
        tmpPos.set(Math.sin(time * 0.5) * 0.7, 0.6, 14);
        tmpLook.set(Math.sin(time * 0.35) * 1.2, -0.6, -50);
        camPos.lerp(tmpPos, toSignal);
        lookTarget.lerp(tmpLook, toSignal);
      }

      // Pose 4: rise to the overhead ecosystem view, with a final pullback.
      const toEco = smooth(0.62, 0.88, p);
      if (toEco > 0) {
        const pullback = smooth(0.9, 1.0, p) * 9;
        tmpPos.set(
          Math.sin(time * 0.05) * 2.5,
          30 + pullback,
          26 + pullback,
        );
        tmpLook.set(0, 0, 0);
        camPos.lerp(tmpPos, toEco);
        lookTarget.lerp(tmpLook, toEco);
      }

      camera.position.copy(camPos);
      camera.lookAt(lookTarget);

      // Publish progress for overlays (module value for per-frame motion,
      // store for phase-boundary re-renders).
      experienceProgress.current = p;
      useExperiencePhase.getState().sync(p);

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
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
};

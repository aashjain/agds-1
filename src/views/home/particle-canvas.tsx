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
        color1: { value: new THREE.Color("#d6aa63") },
        color2: { value: new THREE.Color("#26d8ff") },
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
      0.42, // strength — restrained so the particles read as points, not a white blur
      0.22, // radius
      0.38, // threshold
    );
    composer.addPass(bloomPass);

    let time = 0;

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
      time += 0.005;

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
      const currentScroll = maxScroll > 0 ? scrollTop / maxScroll : 0;

      material.uniforms.uTime.value = time;
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
      const stream = ease(Math.min(Math.max((currentScroll - 0.52) / 0.2, 0), 1));
      const galaxy = ease(Math.min(Math.max((currentScroll - 0.78) / 0.2, 0), 1));

      camera.position.x = THREE.MathUtils.lerp(0.0, 1.8, focus);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -0.35, constellation);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.0, galaxy);

      camera.position.y = THREE.MathUtils.lerp(4.0, 0.8, focus);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.05, constellation);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.0, galaxy);

      camera.position.z = THREE.MathUtils.lerp(18.0, 7.4, focus);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10.8, constellation);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, -18.0, stream);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 36.0, galaxy);

      const introZoom =
        (1 - introEased) * 4.5 * (1 - Math.min(currentScroll / 0.06, 1));
      camera.position.z += introZoom;

      const lookTarget = new THREE.Vector3(
        THREE.MathUtils.lerp(0.0, -0.25, constellation),
        THREE.MathUtils.lerp(-0.25, -0.5, stream),
        THREE.MathUtils.lerp(-9.5, -82.0, galaxy),
      );
      camera.lookAt(lookTarget);

      particles.rotation.y = currentScroll * Math.PI * 1.35 + time * 0.08;
      particles.rotation.x = Math.sin(currentScroll * Math.PI) * 0.08;
      camera.rotation.z = Math.sin(currentScroll * Math.PI * 2.0) * 0.02;

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

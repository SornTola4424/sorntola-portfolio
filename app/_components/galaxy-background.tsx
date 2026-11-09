"use client";

import { useEffect, useRef } from "react";

type Star = {
  /** Distance from the galactic core, in world units. */
  r: number;
  /** Angle on the disk. */
  a: number;
  /** Thickness offset, keeps the disk from being a flat sheet. */
  y: number;
  size: number;
  tone: number;
  spin: number;
  phase: number;
};

type Blob = {
  r: number;
  a: number;
  y: number;
  size: number;
  tone: string;
  alpha: number;
  spin: number;
};

type Meteor = { x: number; y: number; vx: number; vy: number; life: number; ttl: number };
type Pt = { x: number; y: number; z: number; s: number };

const TAU = Math.PI * 2;

const STAR_TONES = ["214, 234, 255", "52, 211, 153", "34, 211, 238", "186, 230, 253"] as const;
const NEBULA_TONES = ["52, 211, 153", "34, 211, 238", "129, 140, 248", "167, 243, 208"] as const;

const FOCAL = 1100;
const CAM_DIST = 1500;
const DISK_R = 840;
const ARMS = 2;
const TILT = 0.94;

/** Cheap bell-ish distribution in roughly [-1, 1]. */
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
/** Inner stars orbit faster than the rim, like a real disk. */
const spinAt = (r: number) => 0.02 + (260 / (r + 260)) * 0.055;
const spiralAngle = (r: number, arm: number) => (arm / ARMS) * TAU + r * 0.0125;

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let fit = 1;
    let seededWidth = 0;

    let stars: Star[] = [];
    let blobs: Blob[] = [];
    const meteors: Meteor[] = [];
    let nextMeteor = 3.5;

    const buildScene = () => {
      const count = width < 640 ? 1100 : width < 1100 ? 1700 : 2400;
      stars = new Array<Star>(count);
      for (let i = 0; i < count; i++) {
        const r = 40 + Math.pow(Math.random(), 0.62) * (DISK_R - 40);
        // Most stars cling to an arm so the spiral reads; the rest are haze.
        const onArm = Math.random() < 0.72;
        const arm = Math.floor(Math.random() * ARMS);
        const jitter = onArm
          ? gauss() * (0.04 + 55 / (r + 280))
          : gauss() * (0.42 + 240 / (r + 320));
        const roll = Math.random();
        stars[i] = {
          r,
          a: spiralAngle(r, arm) + jitter,
          y: gauss() * (5 + r * 0.018),
          size: 0.5 + Math.pow(Math.random(), 3.2) * 2.3,
          tone: roll < 0.13 ? 1 : roll < 0.23 ? 2 : roll < 0.29 ? 3 : 0,
          spin: spinAt(r),
          phase: Math.random() * TAU,
        };
      }

      blobs = new Array<Blob>(22);
      for (let i = 0; i < 22; i++) {
        const r = 80 + Math.pow(Math.random(), 0.85) * DISK_R * 0.9;
        blobs[i] = {
          r,
          a: spiralAngle(r, Math.floor(Math.random() * ARMS)) + gauss() * 0.2,
          y: gauss() * 30,
          size: 120 + Math.random() * 300,
          tone: NEBULA_TONES[Math.floor(Math.random() * NEBULA_TONES.length)],
          alpha: 0.05 + Math.random() * 0.06,
          spin: spinAt(r),
        };
      }
    };

    const resize = () => {
      // 1.5× is plenty for a soft, glowing backdrop and keeps hi-dpi screens cheap.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width * 0.5;
      centerY = height * 0.44;
      fit = Math.min(width / 940, height / 700);
      if (Math.abs(width - seededWidth) > 200 || stars.length === 0) {
        seededWidth = width;
        buildScene();
      }
    };
    resize();

    const pointer = { x: 0.5, y: 0.5 };
    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(1, width);
      pointer.y = event.clientY / Math.max(1, height);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let pitch = TILT;
    let yaw = 0;
    let cosP = 1;
    let sinP = 0;
    let cosY = 1;
    let sinY = 0;

    const project = (x: number, y: number, z: number, out: Pt) => {
      // Tilt the disk toward the viewer, then orbit the camera slightly.
      const y1 = y * cosP - z * sinP;
      const z1 = y * sinP + z * cosP;
      const x2 = x * cosY - z1 * sinY;
      const z2 = x * sinY + z1 * cosY;
      const zc = z2 + CAM_DIST;
      if (zc < 60) return false;
      out.s = (FOCAL / zc) * fit;
      out.x = centerX + x2 * out.s;
      out.y = centerY + y1 * out.s;
      out.z = zc;
      return true;
    };

    const A: Pt = { x: 0, y: 0, z: 0, s: 0 };

    const drawScene = (time: number) => {
      const coreScale = (FOCAL / CAM_DIST) * fit;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Dust clouds trailing the spiral arms.
      for (const blob of blobs) {
        if (!project(Math.cos(blob.a) * blob.r, blob.y, Math.sin(blob.a) * blob.r, A)) continue;
        const radius = Math.max(8, blob.size * A.s);
        const g = ctx.createRadialGradient(A.x, A.y, 0, A.x, A.y, radius);
        g.addColorStop(0, `rgba(${blob.tone}, ${blob.alpha.toFixed(3)})`);
        g.addColorStop(0.55, `rgba(${blob.tone}, ${(blob.alpha * 0.45).toFixed(3)})`);
        g.addColorStop(1, `rgba(${blob.tone}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(A.x, A.y, radius, 0, TAU);
        ctx.fill();
      }

      // Galactic core: wide halo plus a hot, bright centre.
      const halo = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        520 * coreScale,
      );
      halo.addColorStop(0, "rgba(148, 255, 222, 0.15)");
      halo.addColorStop(0.35, "rgba(52, 211, 153, 0.075)");
      halo.addColorStop(1, "rgba(52, 211, 153, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 520 * coreScale, 0, TAU);
      ctx.fill();

      const core = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        150 * coreScale,
      );
      core.addColorStop(0, "rgba(244, 255, 252, 0.6)");
      core.addColorStop(0.22, "rgba(186, 255, 230, 0.32)");
      core.addColorStop(0.55, "rgba(52, 211, 153, 0.13)");
      core.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 * coreScale, 0, TAU);
      ctx.fill();

      // Stars.
      for (const star of stars) {
        if (!project(Math.cos(star.a) * star.r, star.y, Math.sin(star.a) * star.r, A)) continue;
        const depth = Math.min(1.1, 0.5 + (A.s / coreScale) * 0.55);
        const twinkle = reduced.matches ? 1 : 0.82 + 0.18 * Math.sin(time * 1.6 + star.phase);
        const alpha = Math.min(1, depth * twinkle * (0.55 + star.size * 0.22));
        const size = Math.max(1, star.size * A.s * 1.6);
        const tone = STAR_TONES[star.tone];

        ctx.fillStyle = `rgba(${tone}, ${alpha.toFixed(3)})`;
        ctx.fillRect(A.x - size * 0.5, A.y - size * 0.5, size, size);

        if (star.size > 2.2) {
          ctx.fillStyle = `rgba(${tone}, ${(alpha * 0.32).toFixed(3)})`;
          ctx.fillRect(A.x - size * 1.9, A.y - 0.5, size * 3.8, 1);
          ctx.fillRect(A.x - 0.5, A.y - size * 1.9, 1, size * 3.8);
        }
      }

      // Shooting stars.
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const progress = m.life / m.ttl;
        if (progress >= 1) {
          meteors.splice(i, 1);
          continue;
        }
        const fade = Math.sin(progress * Math.PI);
        const tailX = m.x - m.vx * 0.13;
        const tailY = m.y - m.vy * 0.13;
        const g = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        g.addColorStop(0, `rgba(240, 255, 250, ${(fade * 0.9).toFixed(3)})`);
        g.addColorStop(1, "rgba(167, 243, 208, 0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let last = 0;
    let time = 0;

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      time += dt;

      const targetYaw = (pointer.x - 0.5) * 0.32;
      const targetPitch = TILT + (pointer.y - 0.5) * 0.14;
      const ease = Math.min(1, dt * 1.8);
      yaw += (targetYaw - yaw) * ease;
      pitch += (targetPitch - pitch) * ease;
      cosY = Math.cos(yaw);
      sinY = Math.sin(yaw);
      cosP = Math.cos(pitch);
      sinP = Math.sin(pitch);

      if (!reduced.matches) {
        for (const star of stars) star.a += star.spin * dt;
        for (const blob of blobs) blob.a += blob.spin * dt;

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          m.life += dt;
        }

        nextMeteor -= dt;
        if (nextMeteor <= 0 && meteors.length < 2) {
          const dir = Math.random() < 0.5 ? 1 : -1;
          meteors.push({
            x: dir === 1 ? -80 : width + 80,
            y: Math.random() * height * 0.55,
            vx: dir * (380 + Math.random() * 320),
            vy: 120 + Math.random() * 160,
            life: 0,
            ttl: 1.1 + Math.random() * 0.5,
          });
          nextMeteor = 5 + Math.random() * 8;
        }
      }

      drawScene(time);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const paintOnce = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame((now) => {
        last = 0;
        frame(now);
        cancelAnimationFrame(raf);
      });
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced.matches) start();
    };

    const onResize = () => {
      resize();
      if (reduced.matches) paintOnce();
    };

    const onMotionChange = () => {
      if (reduced.matches) paintOnce();
      else start();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotionChange);

    if (reduced.matches) paintOnce();
    else start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-20" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(5,7,10,0.55),rgba(5,7,10,0.28)_60%,transparent_100%)]"
      />
    </>
  );
}

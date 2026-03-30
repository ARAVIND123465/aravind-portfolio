"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1, // 1px to 5px
    x: Math.random() * 100, // percentage
    y: Math.random() * 100, // percentage
    duration: Math.random() * 20 + 10, // 10s to 30s
    delay: Math.random() * -20, // Negative delay to start immediately at different points
  }));

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-[#030712] pointer-events-none">
      {/* 1. Base Grid Layer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. Soft Gradient Blobs (Animated) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(0,242,255,0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] left-[20%] w-[70%] h-[50%] rounded-full mix-blend-screen filter blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }}
        />

      {/* 3. Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-500/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}

      {/* Vignette Overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)]" />
    </div>
  );
}

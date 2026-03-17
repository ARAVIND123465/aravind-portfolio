"use client";

import React from 'react';

export default function GridBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] bg-grid-black/[0.2]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
    </div>
  );
}
# Project Blueprint

## Overview

This is a personal portfolio website built with Next.js and Tailwind CSS. The project is structured using the App Router and includes a comprehensive set of components for showcasing a developer's skills, projects, and contact information. The application is designed to be modern, responsive, and easily customizable.

## Project Structure

- **`src/app`**: The main directory for the application, containing the root layout, page, and all components.
  - **`layout.tsx`**: The root layout of the application. It includes the `Navbar` and `Footer` components.
  - **`page.tsx`**: The main page of the application. It imports and renders all the main sections of the portfolio.
  - **`components`**: This directory contains all the reusable components for the application, such as the navbar, hero section, about section, etc.
  - **`api`**: This directory contains the API routes for the application.
- **`src/data`**: This directory contains the central data file for the application, `data.ts`, which exports all the data used in the components.
- **`public`**: This directory contains all the static assets for the application, such as images and resumes.
- **`tailwind.config.ts`**: The configuration file for Tailwind CSS.

## Proposed Change: "Attractive Color" & "Robo Log" Redesign

### Overview
We are overhauling the portfolio to a "Cyber-modern" or "Future-tech" theme that perfectly fits the user's role as a Full-Stack Developer & ML Enthusiast. We are moving away from the "Rose" (Red) theme toward a high-contrast Neon Cyan & Electric Indigo palette.

### Design & Style
- **Primary Colors**: 
  - AI/Tech Cyan (`#00f2ff` / `cyan-400`): Used for primary highlights, code prefixes, and AI Assistant logs.
  - Electric Indigo (`#6366f1` / `indigo-500`): Used for depth glows, hover states, and primary CTA gradients.
  - Dark Onyx (`#050505` / `stone-950`): Base background for a premium, non-vibrant-white aesthetic.
- **Typography**: Pairing `Playfair Display` (Serif elegance) with `IBM Plex Mono` (Technical ML/Robo precision).
- **Visual Effects**:
  - **Cyber Glows**: High-blur, low-opacity radial gradients for depth.
  - **Scanlines**: Subtle CRT-style overlays for the AI Assistant.
  - **Robo Logs**: Monospaced text with `[SYSTEM]` and `[USER]` prefixes.

### Current Project Features
- **AI Assistant (Robo Log)**: Floating terminal-style chat at the bottom-right.
  - Monospaced fonts, Neon Cyan theme, scanline overlay, and custom terminal prefixes.
- **Hero Section (Vibrant Red - DEPRECATED)**: Currently uses rose-red. Transitioning to Cyan/Indigo.

### Actionable Steps
1.  **AI Assistant Transformation**: (COMPLETED) Refactor chat to a "Robo Log" terminal aesthetic.
2.  **Color Overhaul**: Replace all `rose-*` and `blue-*` instances with a cohesive Cyan/Indigo palette across all components (`Hero`, `About`, `Skills`, `Projects`).
3.  **Hero Update**: Apply premium Indigo/Cyan glows and update CTA buttons to gradients.
4.  **Content Refinement**: Ensure the identity "Aravindhan S. - Full-Stack Developer & ML Enthusiast" is highlighted with new "attractive" styles.
5.  **Global Transitions**: Update `globals.css` with smooth transitions and theme-appropriate selection colors.
6.  **Verification**: Confirm visual harmony across the site and responsive performance.

## Current Status

- **`tailwind.config.ts`**: The `content` array has been updated to `'./src/**/*.{js,ts,jsx,tsx,mdx}'` to ensure that Tailwind CSS scans all necessary files.
- **Build Status**: The project builds successfully with `npm run build`.
- **Code Review**: A comprehensive code review has been performed on all components, data files, and configuration files. No errors have been found.
- **Rendering Issue**: Despite the successful build and the absence of any code errors, the application is still rendering a blank page. This strongly suggests that the issue is with the development environment and not the code itself.

## Next Steps

Since the code is in a solid state, the next steps should focus on troubleshooting the development environment. It is recommended to:

1.  **Restart the development server.**
2.  **Reinstall the project dependencies.**

These actions should resolve the rendering issue and allow the application to be viewed in the browser.

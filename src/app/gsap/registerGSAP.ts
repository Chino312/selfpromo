"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Safely register ScrollTrigger (works with TypeScript and Next.js SSR)
 */
export function registerGSAP() {
  if (typeof window === "undefined") return;

  // @ts-ignore – GSAP doesn't expose a typed registry
  const isRegistered = gsap?.ScrollTrigger || gsap?.plugins?.ScrollTrigger;

  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
  }
}

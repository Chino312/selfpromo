"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook to easily attach a GSAP ScrollTrigger animation to any element.
 *
 * @param animationFn - function that receives the target element ref and returns a gsap timeline
 */
export function useScrollAnimation(
  animationFn: (el: HTMLElement) => gsap.core.Timeline,
  options?: { once?: boolean }
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const timeline = animationFn(ref.current);

    if (options?.once) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        onEnter: () => timeline.play(),
      });
    }

    return () => {
      // cleanup timeline & scroll triggers on unmount
      timeline.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animationFn, options]);

  return ref;
}

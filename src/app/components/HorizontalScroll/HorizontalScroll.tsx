"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HorizontalScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    const container = containerRef.current;
    const totalWidth = container?.scrollWidth || 0;
    const scrollDistance = totalWidth - window.innerWidth;

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section ref={containerRef} className={styles.horizontalSection}>
      {React.Children.toArray(children).map((child, i) => (
        <div
          key={i}
          className={styles.hSection}
          ref={(el) => {
            if (el) sectionsRef.current[i] = el;
          }}
        >
          {child}
        </div>
      ))}
    </section>
  );
};

export default HorizontalScroll;

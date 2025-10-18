"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Glass.module.css";

gsap.registerPlugin(ScrollTrigger);

const Glass = () => {
  const panesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    panesRef.current.forEach((pane, i) => {
      if (!pane) return;
      gsap.fromTo(
        pane,
        {
          opacity: 0,
          y: 60 * (i % 2 === 0 ? 1 : -1),
          x: 40 * (i % 3 === 0 ? 1 : -1),
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pane,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 3;
      const y = (e.clientY / innerHeight - 0.5) * 3;

      panesRef.current.forEach((pane, i) => {
        if (!pane) return;

        // Give each pane its own strength factor (you can tune these)
        const rotationStrength = 15;
        const depth = 1 + i * 0.4; // ensures all panes have movement, increasing slightly per pane

        gsap.to(pane, {
          rotationY: x * rotationStrength * depth,
          rotationX: -y * rotationStrength * depth,
          transformPerspective: 800,
          transformOrigin: "center",
          ease: "power2.out",
          duration: 0.6,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const paneStyles = [
    { top: "20%", left: "12%", width: "350px", height: "220px" },
    { top: "60%", left: "15%", width: "250px", height: "150px" },
    { bottom: "50%", right: "12%", width: "500px", height: "250px" },
    { bottom: "10%", right: "25%", width: "300px", height: "280px" },
  ];

  return (
    <div className={styles.glassOverlay}>
      {paneStyles.map((style, i) => (
        <div
          key={i}
          ref={(el) => {
            panesRef.current[i] = el;
          }}
          className={styles.glassPane}
          style={style}
        />
      ))}
    </div>
  );
};

export default Glass;

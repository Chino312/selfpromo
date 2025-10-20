"use client";

import React, { useRef, useEffect } from "react";
import styles from "./LoadingBrick.module.css";
import gsap from "gsap";

interface LoadingProps {
  onComplete: () => void;
}

const LoadingBrick = ({ onComplete }: LoadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brickRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: onComplete,
    });

    tl.fromTo(
      brickRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.2 }
    )
      .add(() => {
        const brick = brickRef.current;
        if (brick) brick.style.display = "none";
        if (leftRef.current) leftRef.current.style.display = "block";
        if (rightRef.current) rightRef.current.style.display = "block";
      })
      .fromTo(
        [leftRef.current, rightRef.current],
        { width: "20px" },
        {
          width: "50vw",
          duration: 1,
          stagger: 0.1,
        }
      )
      .to(
        [leftRef.current, rightRef.current],
        {
          scale: 30,
          duration: 1.5,
          onStart: () => {
            gsap.to(containerRef.current, {
              backgroundColor: "#ffffff",
              duration: 0.8,
            });
          },
        },
        "+=0.2"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            gsap.set(containerRef.current, { display: "none" });
          },
        },
        "-=0.5"
      );
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.loadingContainer}>
      <div ref={brickRef} className={styles.brick} />
      <div ref={leftRef} className={`${styles.halfBrick} ${styles.halfLeft}`} />
      <div
        ref={rightRef}
        className={`${styles.halfBrick} ${styles.halfRight}`}
      />
    </div>
  );
};

export default LoadingBrick;

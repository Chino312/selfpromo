"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Item {
  text: string;
  image: string;
}

const ScrollGallery: React.FC<{ items: Item[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      // pin the wrapper and scroll through items
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${items.length * window.innerHeight * 0.125}`, // controls delay of scroll vs item change
        pin: true,
        scrub: 0, // very short smooth animation
        onUpdate: (self) => {
          const index = Math.round(self.progress * (items.length - 1));
          setActiveIndex(index);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);
  return (
    <div ref={containerRef} className={styles.galleryWrapper} id="gallery">
      <div className={styles.galleryContent}>
        <div className={styles.textColumn}>
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className={`${styles.textItem} ${
                activeIndex === i ? styles.active : ""
              }`}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className={styles.imageColumn}>
          <img
            src={items[activeIndex].image}
            alt={items[activeIndex].text}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollGallery;

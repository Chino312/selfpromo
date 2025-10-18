"use client";

import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { gsap } from "gsap";
import styles from "./Hero.module.css";
import Glass from "../Glass/Glass";

export default function Hero() {
  const heroText = ["Gram Otero Livemore", "Actor.", "Writer.", "Developer."];

  const heroRef = useScrollAnimation((el) => {
    const words = el.querySelectorAll(`.${styles.heroWord}`);

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=100%", // use a scroll range relative to section height
          scrub: true,
          pin: true,
        },
      })
      .fromTo(
        words,
        {
          x: () => Math.random() * 200 - 100,
          y: () => Math.random() * 200 - 100,
          opacity: 0,
          rotation: () => Math.random() * 45 - 15,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
  });

  return (
    <section className={styles.heroSection} ref={heroRef} id="home">
      <Glass />
      <div className={styles.heroBackground} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {heroText.map((word, i) => (
            <span
              key={i}
              className={styles.heroWord}
              style={{
                color: i === 0 ? "black" : i === 1 ? "red" : undefined,
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

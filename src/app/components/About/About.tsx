"use client";

import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { gsap } from "gsap";
import styles from "./About.module.css";
import ScrollGallery from "../ScrollGalley/ScrollGallery";

// instead of scroll triggering the text, hover should trigger the text and as i scroll through the words, hover is applied to each string
export default function AboutSection() {
  const aboutRef = useScrollAnimation((el) => {
    const content = el.querySelector(`.${styles.aboutContent}`) as HTMLElement;

    return gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true, // <-- animate with scroll
          markers: false, // set true if you want to debug
        },
      })
      .from(content, {
        x: -400,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
  });

  return (
    <>
      <section id="about" ref={aboutRef} className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>About</h2>
          <p className={styles.aboutText}>
            I am an actor and storyteller with a passion for immersive
            performances…
          </p>
        </div>
      </section>
    </>
  );
}

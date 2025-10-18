import styles from "./page.module.css";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import ScrollGallery from "./components/ScrollGalley/ScrollGallery";
import { galleryItems } from "./constants/constants";
import HorizontalScroll from "./components/HorizontalScroll/HorizontalScroll";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <About />
      <ScrollGallery items={galleryItems} />
      <HorizontalScroll>
        <div style={{ backgroundColor: "black" }}>
          <h2 style={{ marginTop: "2rem", color: "white" }}>Section 1</h2>
        </div>
        <div style={{ backgroundColor: "red" }}>
          <h2 style={{ marginTop: "2rem" }}>Section 2</h2>
        </div>
        <div style={{ backgroundColor: "pink" }}>
          <h2 style={{ marginTop: "2rem" }}>Section 3</h2>
        </div>
      </HorizontalScroll>
      <div style={{ height: "100vh", backgroundColor: "lightblue" }}>Hello</div>
    </div>
  );
}

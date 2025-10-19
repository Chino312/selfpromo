"use client";
import React from "react";
import styles from "./IconBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faImdb,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export default function IconBar() {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.stickyIcons}>
      <FontAwesomeIcon
        icon={faInstagram}
        className={styles.icon}
        onClick={() => handleClick("footer")}
      />
      <FontAwesomeIcon
        icon={faImdb}
        className={styles.icon}
        onClick={() => handleClick("footer")}
      />
      <FontAwesomeIcon
        icon={faGithub}
        className={styles.icon}
        onClick={() => handleClick("footer")}
      />
    </div>
  );
}

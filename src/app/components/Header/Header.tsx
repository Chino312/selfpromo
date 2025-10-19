"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faTractor } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
  { label: "Footer", href: "#footer" },
];

const Header = () => {
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);

  // close flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setActiveFlyout(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.navWrapper}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faTractor} className={styles.logoWht} />
          <span className={styles.logoBlk}>
            minus<span className={styles.logoBlk}>TR</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => setActiveFlyout(item.label)}
              onMouseLeave={() => setActiveFlyout(null)}
            >
              <a href={item.href}>{item.label}</a>

              {/* Flyout */}
              <AnimatePresence>
                {activeFlyout === item.label && (
                  <motion.div
                    ref={flyoutRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.25 }}
                    className={styles.flyout}
                  >
                    <ul className={styles.dropdownItems}>
                      <li className={styles.dropdownitem}>Sub Link 1</li>
                      <li className={styles.dropdownitem}>Sub Link 2</li>
                      <li className={styles.dropdownitem}>Sub Link 3</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Hamburger (visible on smaller screens) */}
        <div>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`${styles.hamburger} ${isMenuOpen ? styles.hidden : ""}`}
          />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            {navItems.map((item) => (
              <>
                <div>
                  <button className={styles.mobileNavItem} key={item.label}>
                    <a
                      className={styles.links}
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </button>
                </div>
              </>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

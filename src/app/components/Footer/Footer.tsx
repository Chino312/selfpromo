"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faImdb,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";
import { name, subTitle, sendBtn, rights } from "../../constants/constants";

const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <footer className={styles.footer} id="footer">
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <h2 className={styles.footerTitle}>{name}</h2>
            <p className={styles.footerSubTitle}>{subTitle}</p>
            <div className={styles.socalLinks}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://pro.imdb.com/name/nm12616332?ref_=hm_nv_usr_profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faImdb} />
              </a>

              <a
                href="https://github.com/Chino312"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>

          <div className={styles.footerRight}>
            <h3>Contact</h3>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button type="submit">{sendBtn}</button>
            </form>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            <FontAwesomeIcon icon={faCopyright} />: {new Date().getFullYear()}{" "}
            {name} {rights}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

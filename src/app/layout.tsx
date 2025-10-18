"use client";

import { useEffect } from "react";
import { registerGSAP } from "./gsap/registerGSAP";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Register GSAP + ScrollTrigger once on client
  useEffect(() => {
    registerGSAP();
  }, []);

  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

"use client;";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Mulish } from "next/font/google";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion"

const mulish = Mulish({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext', 'latin-ext', 'vietnamese'],

});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-ignore
    import("preline");
  }, []);
  return (
    <AnimatePresence>
      <main className={mulish.className}>
        <Component {...pageProps} />
      </main>
    </AnimatePresence>
  );
}

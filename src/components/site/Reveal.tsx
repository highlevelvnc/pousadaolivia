"use client";
import { useEffect } from "react";

// Marca todos os [data-reveal] como data-revealed="false" no mount, observa-os
// com IntersectionObserver e ainda forca revelacao apos 3.5s como fallback
// (headless browsers, tabs em background, IO silenciosamente quebrado).
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => el.setAttribute("data-revealed", "false"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.setAttribute("data-revealed", "true"));
    }, 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return null;
}

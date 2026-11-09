"use client";

import { useEffect } from "react";

export function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    elements.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible"); });
    document.documentElement.dataset.reveal = "ready";
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    elements.forEach(el => { if (!el.classList.contains("is-visible")) observer.observe(el); });
    return () => { observer.disconnect(); delete document.documentElement.dataset.reveal; };
  }, []);
  return null;
}

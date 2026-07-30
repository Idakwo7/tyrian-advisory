"use client";

import { useEffect } from "react";

/**
 * Layered-depth parallax: selected elements drift at a fraction of the scroll
 * speed as they pass through the viewport, creating depth. Rides on the native
 * scroll events that Lenis dispatches, so it stays in sync with the smooth
 * scrolling. Disabled for reduced-motion users.
 */
const TARGETS: { sel: string; speed: number }[] = [
  { sel: ".services .section-head", speed: 0.16 },
  { sel: ".approach .section-head", speed: 0.14 },
  { sel: ".about-panel", speed: 0.2 },
  { sel: ".cta h2", speed: 0.14 },
];

export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    type Item = { el: HTMLElement; speed: number; base: number; h: number };
    const items: Item[] = [];
    TARGETS.forEach(({ sel, speed }) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        items.push({ el, speed, base: 0, h: 0 });
      });
    });
    if (!items.length) return;

    const measure = () => {
      items.forEach((it) => {
        const prev = it.el.style.transform;
        it.el.style.transform = "none";
        const rect = it.el.getBoundingClientRect();
        it.base = rect.top + window.scrollY;
        it.h = rect.height;
        it.el.style.transform = prev;
        it.el.style.willChange = "transform";
      });
    };

    let ticking = false;
    const apply = () => {
      ticking = false;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      for (const it of items) {
        const start = it.base - vh;
        const end = it.base + it.h;
        const p = (sy - start) / (end - start || 1);
        const clamped = Math.max(0, Math.min(1, p));
        const translate = (clamped - 0.5) * it.speed * 220;
        it.el.style.transform = `translate3d(0, ${translate.toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      measure();
      apply();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      items.forEach((it) => (it.el.style.transform = ""));
    };
  }, []);

  return null;
}

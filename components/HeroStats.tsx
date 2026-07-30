"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Stat = { value: number; suffix?: string; label: string };

const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Advisory practices" },
  { value: 360, suffix: "°", label: "Across the balance sheet" },
  { value: 14, suffix: "+", label: "Trusted partners" },
];

export default function HeroStats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".hero-stat"));
    const numOf = (item: HTMLElement) =>
      item.querySelector<HTMLElement>("[data-value]");

    // Respect reduced-motion: show everything, no movement or counting.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => {
        const el = numOf(item);
        if (el) el.textContent = el.dataset.value + (el.dataset.suffix || "");
      });
      return;
    }

    // Hide immediately (before reveal) to avoid a flash of final state.
    gsap.set(items, { opacity: 0, x: -48 });

    let started = false;
    let ctx: gsap.Context | undefined;

    const run = () => {
      if (started) return;
      started = true;
      ctx = gsap.context(() => {
        items.forEach((item, i) => {
          const el = numOf(item);
          if (!el) return;
          const target = Number(el.dataset.value);
          const suffix = el.dataset.suffix || "";
          const delay = i * 0.4; // one-by-one, left to right

          // Ease in from the left.
          gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1.1,
            delay,
            ease: "power3.out",
          });

          // Count up as it enters.
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 2.6,
            delay,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(counter.v) + suffix;
            },
          });
        });
      }, root);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <div className="hero-stats" ref={rootRef}>
      {stats.map((s) => (
        <div className="hero-stat" key={s.label}>
          <div className="num" data-value={s.value} data-suffix={s.suffix || ""}>
            0{s.suffix || ""}
          </div>
          <div className="label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

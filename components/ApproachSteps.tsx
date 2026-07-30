"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    step: "01",
    title: "Understand",
    body: "We begin with your objectives, constraints and context — not a template. The right answer starts with the right questions.",
  },
  {
    step: "02",
    title: "Advise",
    body: "We bring analytical rigor and candid perspective, laying out options clearly so decisions are made with conviction.",
  },
  {
    step: "03",
    title: "Execute",
    body: "We stay in the room through execution — protecting value from mandate to close, and beyond.",
  },
];

/**
 * Each step's Tyrian-purple rule "loads" left-to-right; once a rule completes,
 * that step's text wipes in from the left. Triggered when the section scrolls
 * into view. Reduced-motion users get the finished state immediately.
 */
export default function ApproachSteps() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grid.classList.add("shown");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          grid.classList.add("run");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <div className="approach-grid" ref={ref}>
      {STEPS.map((s, i) => (
        <div
          className="approach-item"
          key={s.step}
          // Short stride relative to the line duration, so each rule starts
          // while the previous one is still drawing — a continuous cascade
          // rather than three separate waits.
          style={{ ["--d" as string]: `${(i * 0.15).toFixed(2)}s` }}
        >
          <span className="step">{s.step}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Independent Advisory.",
  "Strategy.",
  "Capital.",
  "Transactions.",
];

const IN_MS = 500; // one character's entrance
const IN_STAGGER = 26; // gap between characters entering
const HOLD_MS = 1900; // fully readable before it leaves
const OUT_MS = 340;
const OUT_STAGGER = 12; // exits tighter than it enters, so it clears quickly

/**
 * Cycles the hero eyebrow through its phrases one at a time, each one flipping
 * up character by character. Screen readers get the full list from the label
 * and never see the animated copy.
 */
export default function HeroEyebrow() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const chars = PHRASES[index].length;
    // The last character lands after the full stagger, so the hold has to be
    // measured from there rather than from the start of the phrase.
    const settled = IN_MS + chars * IN_STAGGER;
    const leaveAt = settled + HOLD_MS;
    const nextAt = leaveAt + OUT_MS + chars * OUT_STAGGER;

    const toOut = setTimeout(() => setPhase("out"), leaveAt);
    const toNext = setTimeout(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
      setPhase("in");
    }, nextAt);

    return () => {
      clearTimeout(toOut);
      clearTimeout(toNext);
    };
  }, [index, reduced]);

  if (reduced) {
    return <span className="eyebrow">{PHRASES.join(" ")}</span>;
  }

  return (
    <span className="eyebrow hero-eyebrow" aria-label={PHRASES.join(" ")}>
      <span className="eyebrow-track" aria-hidden="true" key={index}>
        {PHRASES[index].split("").map((ch, i) => (
          <span
            key={i}
            className={phase === "in" ? "ec ec-in" : "ec ec-out"}
            style={{ ["--i" as string]: i }}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

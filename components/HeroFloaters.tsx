"use client";

import { useRef } from "react";

type Floater = {
  w: number;
  h: number;
  top: string;
  right: string; // anchored to the right edge so it never exceeds full width
  clip: string;
  float: number; // bob duration (s)
  delay: number;
  // Drift direction — "x" moves right-to-left, "y-down" bobs downward so a
  // stacked pair converges against a neighbour using the default "y".
  axis?: "x" | "y" | "y-down";
};

// Tablet form: a portrait rounded rectangle (radius comes from CSS) with a
// notch cut into each SIDE — the same step-notch language as the "What we do"
// section's top edge. Corners stay square-on, only the sides are cut.
// Sizes keep the 1 : 3/5 : 2/5 height ratio at ~0.72 tablet proportions.
const TABLET =
  "polygon(0 0, 100% 0, 100% 41%, 93% 46%, 93% 54%, 100% 59%, 100% 100%, 0 100%, 0 59%, 7% 54%, 7% 46%, 0 41%)";
const FLOATERS: Floater[] = [
  // Largest — flush with the container's right edge (nav CTA / "14+" line).
  {
    w: 216,
    h: 300,
    top: "calc(13% + 4px)",
    right: "24px",
    clip: TABLET,
    float: 7,
    delay: 0,
    axis: "x",
  },

  // Medium — to its left with a clear 28px gap (spans 268–398px from the right).
  {
    w: 130,
    h: 180,
    top: "30%",
    right: "268px",
    clip: TABLET,
    float: 7,
    delay: 0,
  },
  // Small — same width as the medium, stacked directly on top of it so the two
  // form a column beside the largest. Height unchanged.
  // Positioned off the medium's 30% top (own height 120px + 26px gap) so the
  // stack gap stays fixed no matter how the container is offset or resized.
  {
    w: 130,
    h: 120,
    top: "calc(30% - 146px)",
    right: "268px",
    clip: TABLET,
    float: 7,
    delay: 0,
    axis: "y-down",
  },
];

function FloaterBlock({ f }: { f: Floater }) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, sx: 0, sy: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, sx: e.clientX, sy: e.clientY };
    el.classList.add("dragging");
    el.setPointerCapture(e.pointerId);
    if (innerRef.current) innerRef.current.style.animationPlayState = "paused";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.sx;
    const dy = e.clientY - drag.current.sy;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    drag.current.active = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
    el.classList.remove("dragging");
    // Spring back to the original spot.
    el.style.transform = "translate(0px, 0px)";
    if (innerRef.current) innerRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      ref={ref}
      className="hero-floater"
      style={{ width: f.w, height: f.h, top: f.top, right: f.right }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        ref={innerRef}
        className="hero-floater-inner"
        style={{
          clipPath: f.clip,
          WebkitClipPath: f.clip,
          animationName:
            f.axis === "x"
              ? "floatside"
              : f.axis === "y-down"
                ? "floatbobdown"
                : "floatbob",
          animationDuration: `${f.float}s`,
          animationDelay: `${f.delay}s`,
        }}
        role="img"
        aria-label="Decorative image placeholder"
      >
        <span className="hero-floater-label">IMAGE</span>
      </div>
    </div>
  );
}

export default function HeroFloaters() {
  return (
    <div className="hero-floaters" aria-hidden="true">
      {FLOATERS.map((f, i) => (
        <FloaterBlock key={i} f={f} />
      ))}
    </div>
  );
}

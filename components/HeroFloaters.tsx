"use client";

import { useRef } from "react";
import Image from "next/image";

type Floater = {
  w: number;
  h: number;
  top: string;
  right: string; // anchored to the right edge so it never exceeds full width
  clip: string;
  src: string;
  // Width the source is actually scaled to once object-fit:cover fills the
  // frame — larger than `w` whenever the source is wider than the frame, which
  // is what `sizes` has to advertise or Next serves a soft, upscaled crop.
  coverW: number;
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
    w: 248,
    h: 345,
    top: "calc(13% - 16px)",
    right: "24px",
    clip: TABLET,
    src: "/hm1.jpg",
    coverW: 518, // 900x600 source filling a 345px-tall frame
    float: 7,
    delay: 0,
    axis: "x",
  },

  // Medium — to its left with a clear 28px gap (spans 300–450px from the right,
  // clearing the largest block's new 272px right edge).
  {
    w: 150,
    h: 207,
    top: "30%",
    right: "300px",
    clip: TABLET,
    src: "/hm2.jpg",
    coverW: 217, // 560x536 source filling a 207px-tall frame
    float: 7,
    delay: 0,
  },
  // Small — same width as the medium, stacked directly on top of it so the two
  // form a column beside the largest. Height unchanged.
  // Positioned off the medium's 30% top (own height 138px + 26px gap) so the
  // stack gap stays fixed no matter how the container is offset or resized.
  {
    w: 150,
    h: 138,
    top: "calc(30% - 164px)",
    right: "300px",
    clip: TABLET,
    src: "/hm3.jpg",
    coverW: 150, // square source, frame width is the binding constraint
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
      >
        <Image
          src={f.src}
          alt=""
          fill
          sizes={`${f.coverW}px`}
          className="hero-floater-img"
          // Without this the browser's native image drag hijacks the pointer
          // drag and leaves a ghost image behind.
          draggable={false}
        />
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

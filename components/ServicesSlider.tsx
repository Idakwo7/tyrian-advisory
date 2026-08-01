"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/services";
import Icon from "@/components/Icon";

// Movement past this counts as a drag rather than a tap, which decides both
// when to capture the pointer and whether to swallow the card's click.
const DRAG_THRESHOLD = 6;
const EASE = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Transform-based card carousel. Uses translateX (not native scroll) so it is
 * immune to Lenis smooth-scroll, which otherwise resets an inner element's
 * scrollLeft every frame. Drags by pointer/touch as well as by the buttons.
 */
export default function ServicesSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const drag = useRef({
    active: false,
    captured: false,
    startX: 0,
    startOffset: 0,
    moved: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });

  const maxOffset = () => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return 0;
    return Math.max(0, track.scrollWidth - vp.clientWidth);
  };

  const apply = (value: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    offset.current = value;
    track.style.transition = animate ? EASE : "none";
    track.style.transform = `translate3d(${-value}px, 0, 0)`;
  };

  const move = (dir: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const step = vp.clientWidth * 0.85;
    apply(Math.min(maxOffset(), Math.max(0, offset.current + dir * step)), true);
  };

  // A narrower viewport shortens the track's travel; without this a resize can
  // leave it parked past the new end with blank space showing.
  useEffect(() => {
    const onResize = () => apply(Math.min(offset.current, maxOffset()), false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const d = drag.current;
    d.active = true;
    d.captured = false;
    d.startX = e.clientX;
    d.startOffset = offset.current;
    d.moved = 0;
    d.lastX = e.clientX;
    d.lastT = performance.now();
    d.velocity = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;

    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved <= DRAG_THRESHOLD) return; // still might be a tap or a page scroll

    if (!d.captured) {
      d.captured = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      viewportRef.current?.classList.add("dragging");
    }

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) {
      // Clamped because a coalesced or synthetic move can report a near-zero
      // dt and throw the projection to the far end of the track.
      const v = (e.clientX - d.lastX) / dt; // px per ms
      d.velocity = Math.max(-2.5, Math.min(2.5, v));
    }
    d.lastX = e.clientX;
    d.lastT = now;

    const max = maxOffset();
    let next = d.startOffset - dx;
    // Resist past either end rather than stopping dead against it.
    if (next < 0) next *= 0.35;
    else if (next > max) next = max + (next - max) * 0.35;
    apply(next, false);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (d.captured) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
    d.captured = false;
    viewportRef.current?.classList.remove("dragging");

    // Let a flick carry, then settle back inside the bounds.
    const projected = offset.current - d.velocity * 180;
    apply(Math.min(maxOffset(), Math.max(0, projected)), true);
  };

  // Releasing a drag on top of a card would otherwise follow its link.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = 0;
    }
  };

  return (
    <div className="slider">
      <div
        className="slider-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <div className="slider-track" ref={trackRef}>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
              <div className="icon-wrap">
                <Icon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <span className="more">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="slider-nav">
        <button
          type="button"
          className="slider-btn"
          aria-label="Previous services"
          onClick={() => move(-1)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="slider-btn"
          aria-label="Next services"
          onClick={() => move(1)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

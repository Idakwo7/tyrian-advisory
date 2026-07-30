"use client";

import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/services";
import Icon from "@/components/Icon";

/**
 * Transform-based card carousel. Uses translateX (not native scroll) so it is
 * immune to Lenis smooth-scroll, which otherwise resets an inner element's
 * scrollLeft every frame.
 */
export default function ServicesSlider() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);

  const move = (dir: number) => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;
    const max = Math.max(0, track.scrollWidth - vp.clientWidth);
    const step = vp.clientWidth * 0.85;
    offset.current = Math.min(max, Math.max(0, offset.current + dir * step));
    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  };

  return (
    <div className="slider">
      <div className="slider-viewport" ref={viewportRef}>
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

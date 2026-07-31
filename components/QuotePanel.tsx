"use client";

import { useEffect, useRef } from "react";

/**
 * The quote rises into place, its hairline draws out from the centre and the
 * attribution follows — same IntersectionObserver / `.run` convention as
 * ApproachSteps, so the band moves in the site's existing motion language.
 */
export default function QuotePanel() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("shown");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("run");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="quote-panel" ref={ref}>
      <blockquote>
        We measure our success not by the size of the deal, but by the soundness
        of the decision.
      </blockquote>
      <figcaption>The Tyrian Advisory principle</figcaption>
    </figure>
  );
}

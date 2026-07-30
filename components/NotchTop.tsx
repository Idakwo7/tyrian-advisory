"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** class name of the ancestor section to clip (without the dot) */
  targetClass?: string;
  /** unique id for this clipPath */
  clipId?: string;
  /** also notch the bottom edge */
  includeBottom?: boolean;
};

/**
 * Cuts a rounded "tab" notch into the edges of the nearest matching section
 * using a responsive SVG clipPath (the terminal-industries technique). The
 * notch reveals the lighter page behind it, so the section interlocks with its
 * neighbours.
 */
export default function NotchTop({
  targetClass = "services",
  clipId = "services-notch",
  includeBottom = true,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const section = svg.closest("." + targetClass) as HTMLElement | null;
    const pathEl = svg.querySelector("path");
    if (!section || !pathEl) return;

    const build = () => {
      const W = section.offsetWidth;
      const H = section.offsetHeight;
      if (!W || !H) return;

      const depth = 24;
      const r = 26;
      const plateau = Math.min(320, Math.max(120, W * 0.32));
      const shoulder = 34;
      const cx = W / 2;
      const plL = cx - plateau / 2;
      const plR = cx + plateau / 2;
      const lx = plL - shoulder;
      const lmx = plL - shoulder / 2;
      const rx = plR + shoulder;
      const rmx = plR + shoulder / 2;
      const h = depth / 2;

      const parts = [
        "M 0 0",
        // top notch (left → right)
        `L ${lx.toFixed(1)} 0`,
        `A ${r} ${r} 0 0 1 ${lmx.toFixed(1)} ${h}`,
        `A ${r} ${r} 0 0 0 ${plL.toFixed(1)} ${depth}`,
        `L ${plR.toFixed(1)} ${depth}`,
        `A ${r} ${r} 0 0 0 ${rmx.toFixed(1)} ${h}`,
        `A ${r} ${r} 0 0 1 ${rx.toFixed(1)} 0`,
        `L ${W} 0`,
        `L ${W} ${H}`,
      ];

      if (includeBottom) {
        parts.push(
          `L ${rx.toFixed(1)} ${H}`,
          `A ${r} ${r} 0 0 1 ${rmx.toFixed(1)} ${(H - h).toFixed(1)}`,
          `A ${r} ${r} 0 0 0 ${plR.toFixed(1)} ${(H - depth).toFixed(1)}`,
          `L ${plL.toFixed(1)} ${(H - depth).toFixed(1)}`,
          `A ${r} ${r} 0 0 0 ${lmx.toFixed(1)} ${(H - h).toFixed(1)}`,
          `A ${r} ${r} 0 0 1 ${lx.toFixed(1)} ${H}`,
          `L 0 ${H}`
        );
      } else {
        parts.push(`L 0 ${H}`);
      }
      parts.push("Z");

      pathEl.setAttribute("d", parts.join(" "));
      section.style.clipPath = `url(#${clipId})`;
      (section.style as unknown as { webkitClipPath: string }).webkitClipPath =
        `url(#${clipId})`;
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(section);
    return () => {
      ro.disconnect();
      section.style.clipPath = "";
    };
    // Props are constant for a given instance; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      ref={ref}
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d="" />
        </clipPath>
      </defs>
    </svg>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">T</span>
          <span className="brand-name">
            Tyrian
            <small>Advisory</small>
          </span>
        </Link>

        <nav className={open ? "nav open" : "nav"}>
          <Link href="/#services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/#approach" onClick={() => setOpen(false)}>
            Approach
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
            Get in touch
          </Link>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

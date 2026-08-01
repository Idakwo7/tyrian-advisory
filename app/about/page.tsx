import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tyrian Advisory is an independent firm bringing institutional discipline and trusted counsel to strategy, capital and transactions.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> · About
          </div>
          <h1>Independent counsel for the decisions that matter.</h1>
          <p className="tagline">Strategy · Capital · Transactions</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-copy">
            <span className="eyebrow">Who we are</span>
            <h2>A boutique advisory firm, built for trust.</h2>
            <p>
              Tyrian Advisory is an independent advisory firm serving boards,
              investors, entrepreneurs and families. We bring the analytical rigor of
              institutional finance together with the discretion and continuity of a
              trusted personal advisor.
            </p>
            <p>
              We deliberately keep our client relationships few and deep. Every
              engagement is led by senior advisors, and every recommendation is our
              own, free of the conflicts that can cloud judgment.
            </p>
            <p>
              Across eight connected practices, we help our clients see clearly,
              decide with conviction, and execute with discipline.
            </p>
          </div>

          <div className="about-panel">
            <blockquote>
              The most important decisions deserve independent counsel, unclouded by
              conflict and grounded in genuine expertise.
            </blockquote>
            <div className="attr">Our founding conviction</div>
          </div>
        </div>
      </section>

      <section className="section approach">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              What guides us
            </span>
            <h2>Principles over playbooks.</h2>
          </div>
          <div className="approach-grid">
            <div className="approach-item">
              <h3>Independence</h3>
              <p>
                We advise in your interest alone. No hidden incentives, no product to
                sell, only counsel we would act on ourselves.
              </p>
            </div>
            <div className="approach-item">
              <h3>Discretion</h3>
              <p>
                Confidentiality is not a policy; it is the foundation of every
                relationship we hold.
              </p>
            </div>
            <div className="approach-item">
              <h3>Longevity</h3>
              <p>
                We build relationships intended to last across cycles, transactions
                and generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="container">
          <h2>Eight practices. One standard of counsel.</h2>
          <p>Explore how our advisory practices come together for you.</p>
          <div className="chips" style={{ justifyContent: "center", marginBottom: 32 }}>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="chip">
                {s.title}
              </Link>
            ))}
          </div>
          <Link href="/contact" className="btn btn-dark">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}

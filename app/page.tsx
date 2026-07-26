import Link from "next/link";
import { services } from "@/lib/services";
import Icon from "@/components/Icon";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Independent Advisory · Strategy · Capital · Transactions
          </span>
          <h1>
            Advising the decisions that <span className="accent">define</span> the
            enterprise.
          </h1>
          <p>
            Tyrian Advisory partners with boards, investors and families to shape
            strategy, structure capital, and execute the transactions that create
            lasting value.
          </p>
          <div className="hero-actions">
            <Link href="/#services" className="btn btn-primary">
              Explore our services
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Speak with us
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">8</div>
              <div className="label">Advisory practices</div>
            </div>
            <div className="hero-stat">
              <div className="num">360°</div>
              <div className="label">Across the balance sheet</div>
            </div>
            <div className="hero-stat">
              <div className="num">1</div>
              <div className="label">Trusted partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Advisory across the full lifecycle of value.</h2>
            <p>
              From the boardroom to the balance sheet, our practices combine to
              support every consequential decision an enterprise or family faces.
            </p>
          </div>

          <div className="services-grid">
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
      </section>

      {/* Approach */}
      <section className="section approach" id="approach">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              How we work
            </span>
            <h2>Independent, rigorous, and aligned to your interests.</h2>
            <p>
              We are not transaction brokers. We are trusted advisors — measured by
              the quality of the decisions we help you make.
            </p>
          </div>

          <div className="approach-grid">
            <div className="approach-item">
              <span className="step">01</span>
              <h3>Understand</h3>
              <p>
                We begin with your objectives, constraints and context — not a
                template. The right answer starts with the right questions.
              </p>
            </div>
            <div className="approach-item">
              <span className="step">02</span>
              <h3>Advise</h3>
              <p>
                We bring analytical rigor and candid perspective, laying out
                options clearly so decisions are made with conviction.
              </p>
            </div>
            <div className="approach-item">
              <span className="step">03</span>
              <h3>Execute</h3>
              <p>
                We stay in the room through execution — protecting value from
                mandate to close, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-copy">
            <span className="eyebrow">The firm</span>
            <h2>A partner for the moments that matter.</h2>
            <p>
              Tyrian Advisory was built on a simple conviction: that the most
              important decisions deserve independent counsel, unclouded by conflict
              and grounded in genuine expertise.
            </p>
            <p>
              We work with a select group of clients across strategy, capital and
              transactions — bringing institutional discipline and the discretion of
              a trusted advisor to every engagement.
            </p>
            <div className="about-values">
              <div className="value">
                <h4>Independence</h4>
                <p>Advice aligned solely with your interests.</p>
              </div>
              <div className="value">
                <h4>Discretion</h4>
                <p>Confidentiality at the core of every mandate.</p>
              </div>
              <div className="value">
                <h4>Rigor</h4>
                <p>Analytical depth behind every recommendation.</p>
              </div>
              <div className="value">
                <h4>Partnership</h4>
                <p>Relationships measured in decades, not deals.</p>
              </div>
            </div>
          </div>

          <div className="about-panel">
            <blockquote>
              We measure our success not by the size of the deal, but by the
              soundness of the decision.
            </blockquote>
            <div className="attr">— The Tyrian Advisory principle</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <div className="container">
          <h2>Let&rsquo;s discuss what&rsquo;s next for your enterprise.</h2>
          <p>
            Whether you are shaping strategy, raising capital, or considering a
            transaction, a conversation is the right place to begin.
          </p>
          <Link href="/contact" className="btn btn-dark">
            Arrange a conversation
          </Link>
        </div>
      </section>
    </>
  );
}

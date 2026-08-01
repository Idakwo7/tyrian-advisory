import Link from "next/link";
import HeroStats from "@/components/HeroStats";
import HeroEyebrow from "@/components/HeroEyebrow";
import HeroFloaters from "@/components/HeroFloaters";
import NotchTop from "@/components/NotchTop";
import ServicesSlider from "@/components/ServicesSlider";
import ApproachSteps from "@/components/ApproachSteps";
import QuotePanel from "@/components/QuotePanel";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero screen">
        <HeroFloaters />
        <div className="container hero-inner">
          <HeroEyebrow />
          <h1>
            Every enterprise has <span className="accent">defining moments</span>.{" "}
            <span className="hero-line">We advise them.</span>
          </h1>
          <p>
          Tyrian Advisory partners with boards, investors, and families to shape strategy, structure capital, and execute the transactions that create lasting value across Africa's most dynamic markets.
          </p>
          <div className="hero-actions">
            <Link href="/#services" className="btn btn-primary">
              Explore our services
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Speak with us
            </Link>
          </div>

          <HeroStats />
        </div>
      </section>

      {/* Services */}
      <section className="section services screen" id="services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Advisory across the full lifecycle of value.</h2>
            <p>
              From the boardroom to the balance sheet, our practices combine to
              support every consequential decision an enterprise or family faces.
            </p>
          </div>

          <ServicesSlider />
        </div>
      </section>

      {/* Approach */}
      <section className="section approach screen" id="approach">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              How we work
            </span>
            <h2>Independent, rigorous, and aligned to your interests.</h2>
            <p>
              We are not transaction brokers. We are trusted advisors, measured by
              the quality of the decisions we help you make.
            </p>
          </div>

          <ApproachSteps />
        </div>
      </section>

      {/* Quote */}
      <section className="quote screen">
        <NotchTop targetClass="quote" clipId="quote-notch" includeBottom />
        <QuotePanel />
      </section>

      {/* About teaser */}
      <section className="section screen" id="about">
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
              transactions, bringing institutional discipline and the discretion of
              a trusted advisor to every engagement.
            </p>
          </div>

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
      </section>

    </>
  );
}

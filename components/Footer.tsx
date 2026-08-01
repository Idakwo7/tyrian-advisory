import Link from "next/link";
import { services } from "@/lib/services";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <figure className="testimonial">
          <div
            className="testimonial-rating"
            role="img"
            aria-label="Rated 5 out of 5"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <blockquote>
            They were the only advisors in the room willing to tell us what we
            did not want to hear &mdash; and they were right. The deal we walked
            away from mattered as much as the one we closed.
          </blockquote>
          <figcaption>
            <span className="testimonial-name">Client name</span>
            <span className="testimonial-role">Title &middot; Organisation</span>
          </figcaption>
        </figure>

        <div className="footer-cta">
          <h2>Let&rsquo;s discuss what&rsquo;s next for your enterprise.</h2>
          <p>
            Whether you are shaping strategy, raising capital, or considering a
            transaction, a conversation is the right place to begin.
          </p>
          <Link href="/contact" className="btn btn-gold">
            Arrange a conversation
          </Link>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-name">
              Tyrian
              <small>Advisory</small>
            </div>
            <p>
              An independent advisory firm partnering with boards, investors and
              families to shape strategy, structure capital, and create enduring value.
            </p>
            <SocialLinks />
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            {services.slice(0, 4).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h5>Firm</h5>
            {services.slice(4).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </Link>
            ))}
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tyrian Advisory. All rights reserved.</span>
          <span>Strategy · Capital · Transactions</span>
        </div>
      </div>
    </footer>
  );
}

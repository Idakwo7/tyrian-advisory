import Link from "next/link";
import { services } from "@/lib/services";
import NotchTop from "@/components/NotchTop";

export default function Footer() {
  return (
    <footer className="site-footer">
      <NotchTop targetClass="site-footer" clipId="footer-notch" includeBottom={false} />
      <div className="container">
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

import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Arrange a confidential conversation with Tyrian Advisory about strategy, capital or a transaction.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> · Contact
          </div>
          <h1>Let&rsquo;s begin a conversation.</h1>
          <p className="tagline">In confidence, and without obligation.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Get in touch</span>
            <h2>Speak with an advisor.</h2>
            <p>
              Every engagement begins with a conversation. Tell us a little about
              your situation and we will arrange the right introduction, discreetly
              and promptly.
            </p>

            <div className="contact-detail">
              <div className="k">Email</div>
              <div className="v">contact@tyrianadv.com</div>
            </div>
            <div className="contact-detail">
              <div className="k">Phone</div>
              <div className="v">+1 (000) 000-0000</div>
            </div>
            <div className="contact-detail">
              <div className="k">Office</div>
              <div className="v">
                One Financial Plaza
                <br />
                Suite 2100
              </div>
            </div>
            <div className="contact-detail">
              <div className="k">Hours</div>
              <div className="v">Monday to Friday, 9:00 to 18:00</div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

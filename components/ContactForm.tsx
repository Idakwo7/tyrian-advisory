"use client";

import { useState } from "react";
import { services } from "@/lib/services";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Front-end demo only. Wire this to your email service or API route.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form">
        <h3 style={{ fontSize: 22, marginBottom: 12 }}>Thank you.</h3>
        <p style={{ color: "var(--slate)", fontSize: 16 }}>
          Your enquiry has been received. A member of the Tyrian Advisory team will
          be in touch shortly and in confidence.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" required placeholder="Jane Doe" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required placeholder="jane@company.com" />
      </div>

      <div className="field">
        <label htmlFor="company">Company / Organization</label>
        <input id="company" name="company" type="text" placeholder="Optional" />
      </div>

      <div className="field">
        <label htmlFor="interest">Area of interest</label>
        <select id="interest" name="interest" defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="general">General enquiry</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell us a little about what you're looking to achieve."
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Send enquiry
      </button>
      <p className="form-note">Your message is treated in strict confidence.</p>
    </form>
  );
}

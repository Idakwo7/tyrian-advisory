"use client";

import { useState } from "react";
import { services } from "@/lib/services";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
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

  const sending = status === "sending";

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

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

      {status === "error" && (
        <p style={{ color: "#b3261e", fontSize: 14, marginBottom: 14 }}>{error}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send enquiry"}
      </button>
      <p className="form-note">Your message is treated in strict confidence.</p>
    </form>
  );
}

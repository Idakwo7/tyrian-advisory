# Tyrian Advisory

A marketing website for **Tyrian Advisory**, an independent advisory firm, built with
[Next.js](https://nextjs.org/) (App Router) and TypeScript.

## Practices covered

- Corporate Strategy
- Investment & Capital Advisory
- Mergers & Acquisitions
- Family Office Services
- Real Estate & Infrastructure Advisory
- Business Transformation
- Board & CEO Advisory
- Private Capital & Venture Advisory

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx            Root layout, header + footer, site metadata
  page.tsx              Home page (hero, services, approach, about, CTA)
  globals.css           All styling (design system + components)
  about/page.tsx        About the firm
  contact/page.tsx      Contact page
  services/[slug]/      Dynamic detail page per service
components/
  Header.tsx            Sticky nav with mobile menu
  Footer.tsx            Site footer
  ContactForm.tsx       Client-side enquiry form
  Icon.tsx              Inline SVG icon set
lib/
  services.ts           Single source of truth for all service content
```

## Customizing

- **Content**: edit `lib/services.ts` to change service copy, offerings and outcomes.
- **Branding / colors**: adjust the CSS variables at the top of `app/globals.css`
  (`--navy-900`, `--gold`, fonts, etc.).
- **Contact form**: `components/ContactForm.tsx` currently handles submission on the
  client only. Wire the `handleSubmit` function to an API route or an email service
  (e.g. Resend, SendGrid, Formspree) to actually deliver enquiries.
```

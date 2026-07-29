import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getService } from "@/lib/services";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> · <Link href="/#services">Services</Link> ·{" "}
            {service.title}
          </div>
          <div className="icon-wrap" style={{ width: 52, height: 52, color: "var(--gold-dark)", marginBottom: 20 }}>
            <Icon name={service.icon} />
          </div>
          <h1>{service.title}</h1>
          <p className="tagline">{service.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div className="detail-main">
            <h2>Overview</h2>
            <p>{service.overview}</p>

            <h2>How we help</h2>
            <ul className="offer-list">
              {service.offerings.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>

          <aside className="detail-aside">
            <h3>Outcomes we deliver</h3>
            <ul>
              {service.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary">
              Discuss this service
            </Link>
          </aside>
        </div>
      </section>

      <section className="section other-services">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 30 }}>
            <span className="eyebrow">Explore more</span>
            <h2 style={{ fontSize: 30 }}>Our other practices</h2>
          </div>
          <div className="chips">
            {others.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="chip">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

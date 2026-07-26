import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className="breadcrumb">Error 404</div>
        <h1 style={{ marginBottom: 20 }}>This page could not be found.</h1>
        <Link href="/" className="btn btn-primary">
          Return home
        </Link>
      </div>
    </section>
  );
}

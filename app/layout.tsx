import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Tyrian Advisory — Corporate Strategy & Capital Advisory",
    template: "%s | Tyrian Advisory",
  },
  description:
    "Tyrian Advisory is an independent firm advising boards, investors and families on corporate strategy, capital, M&A, real assets, transformation and private capital.",
  keywords: [
    "corporate strategy",
    "investment advisory",
    "capital advisory",
    "mergers and acquisitions",
    "family office",
    "real estate advisory",
    "infrastructure advisory",
    "business transformation",
    "board advisory",
    "private capital",
    "venture advisory",
  ],
  openGraph: {
    title: "Tyrian Advisory",
    description:
      "Strategy, capital and transactions advisory for boards, investors and families.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

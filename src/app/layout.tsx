import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import "./globals.css";

const SITE_URL = "https://sejusedu.com";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "SeJus — Avaluació per competències per a mestres de primària";
const description =
  "Avaluació per competències, informes trimestrals amb IA i seguiment de l'alumnat en una sola aplicació, alineada amb el Decret 175/2022 per a mestres de Catalunya.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: "/",
    // El lloc encara serveix ca/es des de la mateixa URL (selector d'idioma
    // en client, no rutes per idioma) — es deixa preparat per quan hi hagi
    // rutes pròpies per idioma (p. ex. /es/).
    languages: {
      ca: "/",
      es: "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: "/favicon.ico",
    // Falta afegir public/apple-touch-icon.png (180x180px) perquè aquesta
    // línia funcioni de veritat.
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "SeJus",
    locale: "ca_ES",
    type: "website",
    // Falta afegir public/og-image.png (1200x630px) perquè aquesta
    // vista prèvia es mostri correctament en compartir l'enllaç.
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "SeJus",
  description,
  url: SITE_URL,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "teacher",
  },
  offers: {
    "@type": "Offer",
    price: "9",
    priceCurrency: "EUR",
    priceValidUntil: "2027-12-31",
  },
  inLanguage: ["ca", "es"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={`${fraunces.variable} ${karla.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

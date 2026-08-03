import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SeJus — Cada alumne, una història",
  description:
    "Gestió educativa per a mestres: competències, informes trimestrals i programació setmanal, alineats amb el Decret 175/2022.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={`${fraunces.variable} ${karla.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

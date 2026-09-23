import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RegisterPage } from "@/components/sections/register-page";

export const metadata: Metadata = {
  title: "Registra't — SeJus",
  description:
    "Crea el teu compte de SeJus i tria l'etapa amb què treballes: Infantil, Primària o ESO.",
  alternates: { canonical: "/registre" },
};

export default function Registre() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <RegisterPage />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LegalPage, LegalSection } from "@/components/legal/legal-prose";

export const metadata: Metadata = {
  title: "Aviso legal — SeJus",
  description:
    "Aviso legal de SeJus conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE): titular, propiedad intelectual y legislación aplicable.",
  alternates: { canonical: "/avis-legal" },
};

export default function AvisLegalPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Aviso legal"
        meta="SeJus — Conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)"
      >
        <LegalSection title="Titular del sitio web y la aplicación">
          <p>Nombre/Razón social: Marc Juvanteny i Serra</p>
          <p>NIF/CIF: 43637074W</p>
          <p>Domicilio: Les Tries 53, 17800, Catalunya, España</p>
          <p>Email: suport@sejusedu.com</p>
          <p>
            Actividad: SeJus es una aplicación web de gestión educativa dirigida al profesorado de
            educación primaria.
          </p>
        </LegalSection>

        <LegalSection title="Propiedad intelectual">
          <p>
            El código fuente, el diseño, los textos y los elementos gráficos de SeJus son propiedad
            del titular o están licenciados por terceros. Queda prohibida su reproducción total o
            parcial sin autorización expresa.
          </p>
        </LegalSection>

        <LegalSection title="Responsabilidad">
          <p>
            SeJus no se hace responsable del uso que el profesorado haga de la aplicación ni del
            contenido de los comentarios e informes que genere. El titular de la app no responde de
            los daños derivados del uso incorrecto de la plataforma.
          </p>
        </LegalSection>

        <LegalSection title="Legislación aplicable">
          <p>
            Las presentes condiciones se rigen por la legislación española y catalana. Para
            cualquier controversia, las partes se someten a los juzgados y tribunales de Olot,
            renunciando a cualquier otro fuero.
          </p>
        </LegalSection>
      </LegalPage>
      <Footer />
    </>
  );
}

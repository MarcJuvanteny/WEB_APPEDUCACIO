import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LegalPage, LegalSection, LegalUl } from "@/components/legal/legal-prose";

export const metadata: Metadata = {
  title: "Términos y condiciones — SeJus",
  description:
    "Términos y condiciones de uso de SeJus: cuenta, uso correcto de la aplicación, la función de inteligencia artificial y responsabilidad del profesorado.",
  alternates: { canonical: "/termes-us" },
};

export default function TermesUsPage() {
  return (
    <>
      <Header />
      <LegalPage title="Términos y condiciones de uso" meta="SeJus — Versión 1.0 — Agosto 2026">
        <LegalSection title="1. Qué es SeJus y a quién va dirigido">
          <p>
            SeJus es una aplicación web de gestión educativa diseñada exclusivamente para
            profesorado de educación primaria. Su uso está restringido a profesionales de la
            educación mayores de edad.
          </p>
          <p>
            Al crear una cuenta, aceptas estos términos y confirmas que eres un profesional de la
            educación mayor de edad.
          </p>
        </LegalSection>

        <LegalSection title="2. Tu cuenta">
          <p>
            Eres responsable de mantener la confidencialidad de tus credenciales de acceso. Si
            detectas un uso no autorizado de tu cuenta, debes comunicárnoslo inmediatamente en{" "}
            suport@sejusedu.com.
          </p>
          <p>Cada cuenta es personal e intransferible. No puedes ceder tu cuenta a terceros.</p>
        </LegalSection>

        <LegalSection title="3. Uso correcto de la aplicación">
          <p>Puedes usar SeJus para:</p>
          <LegalUl>
            <li>Gestionar los datos académicos de tu alumnado en el ejercicio de tus funciones docentes</li>
            <li>Generar informes de evaluación</li>
            <li>Usar la función de IA para obtener borradores de comentarios pedagógicos</li>
          </LegalUl>
          <p>No puedes usar SeJus para:</p>
          <LegalUl>
            <li>Introducir datos de personas que no sean tu alumnado actual</li>
            <li>Usar la aplicación con fines distintos a la gestión educativa</li>
            <li>Intentar acceder a datos de otros usuarios</li>
            <li>Realizar un uso abusivo de la función de IA</li>
          </LegalUl>
        </LegalSection>

        <LegalSection title="4. Datos del alumnado y responsabilidad">
          <p>
            Como profesorado, eres responsable de asegurarte de que tu centro educativo te autoriza
            a usar SeJus para tratar los datos de tu alumnado y de que dicho uso es conforme a la
            normativa de protección de datos aplicable.
          </p>
          <p>
            SeJus trata los datos del alumnado siguiendo tus instrucciones, como encargado del
            tratamiento del centro educativo.
          </p>
        </LegalSection>

        <LegalSection title="5. La función de inteligencia artificial">
          <p>
            SeJus ofrece una función opcional para generar borradores de comentarios pedagógicos
            mediante inteligencia artificial. Estos borradores son una sugerencia, no una evaluación
            definitiva. El profesorado es siempre el responsable del contenido final de los
            informes.
          </p>
          <p>
            Para proteger la privacidad del alumnado, la IA nunca recibe el nombre del alumno o
            alumna, solo un identificador numérico.
          </p>
          <p>
            El uso de esta función está limitado a 4 informes con IA por año escolar para garantizar
            un uso responsable.
          </p>
        </LegalSection>

        <LegalSection title="5 bis. Responsabilidad del profesorado sobre los comentarios de texto libre procesados por IA">
          <p className="font-medium text-ink">5 bis.1 Qué ocurre con los comentarios que introduces</p>
          <p>
            SeJus permite al profesorado introducir comentarios de texto libre sobre el alumnado
            (por asignatura, por actividad o como observación general). Cuando se usa la función de
            generación de comentarios con IA, estos textos se envían a la API de Anthropic para
            generar un borrador del informe pedagógico.
          </p>
          <p>
            SeJus no aplica ningún filtrado automático sobre el contenido de los comentarios que el
            profesorado introduce antes de enviarlos a la IA. El texto se transmite tal como el
            profesorado lo escribe.
          </p>

          <p className="mt-2 font-medium text-ink">5 bis.2 Qué es tu responsabilidad</p>
          <p>
            El profesorado es el único responsable del contenido de los comentarios que introduce en
            la aplicación. En particular, el profesorado se compromete a:
          </p>
          <LegalUl>
            <li>
              No introducir comentarios que contengan datos personales del alumnado innecesarios o
              excesivos para la finalidad educativa (por ejemplo, información médica, familiar o de
              cualquier otra índole que no sea relevante para la evaluación académica)
            </li>
            <li>
              No introducir comentarios vejatorios, discriminatorios, ofensivos o que vulneren la
              dignidad del alumnado
            </li>
            <li>No incluir en los comentarios datos de terceros ajenos al proceso educativo</li>
            <li>
              Asegurarse de que el contenido de los comentarios es adecuado, veraz y proporcionado a
              la finalidad de evaluación académica
            </li>
          </LegalUl>

          <p className="mt-2 font-medium text-ink">5 bis.3 Qué ocurre con el borrador generado por la IA</p>
          <p>
            El texto generado por la IA es un borrador orientativo. El profesorado debe revisarlo,
            editarlo si es necesario y asumir la responsabilidad plena del contenido final antes de
            incluirlo en cualquier informe que se entregue a las familias o al centro educativo.
          </p>
          <p>
            SeJus no se hace responsable del contenido del borrador generado por la IA ni de las
            consecuencias derivadas de su uso sin revisión previa por parte del profesorado.
          </p>

          <p className="mt-2 font-medium text-ink">5 bis.4 Limitación de responsabilidad de SeJus</p>
          <p>
            SeJus actúa como intermediario técnico entre el profesorado y el proveedor de IA
            (Anthropic). SeJus no revisa, modera ni valida el contenido de los comentarios
            introducidos por el profesorado ni los borradores generados por la IA.
          </p>
          <p>En consecuencia, SeJus no será responsable de:</p>
          <LegalUl>
            <li>
              Los daños o perjuicios derivados de comentarios introducidos por el profesorado que
              vulneren derechos de terceros
            </li>
            <li>
              El contenido del borrador generado por la IA que el profesorado decida incluir en un
              informe sin revisión previa
            </li>
            <li>El uso de los informes generados fuera del contexto educativo para el que están diseñados</li>
          </LegalUl>
        </LegalSection>

        <LegalSection title="6. Disponibilidad del servicio">
          <p>
            SeJus se ofrece &ldquo;tal como está&rdquo; en fase beta. Nos esforzamos por mantener el
            servicio disponible, pero no garantizamos una disponibilidad del 100%.
          </p>
        </LegalSection>

        <LegalSection title="7. Precios">
          <p>Gratuito.</p>
        </LegalSection>

        <LegalSection title="8. Cancelación de la cuenta">
          <p>
            Puedes cancelar tu cuenta en cualquier momento escribiendo a suport@sejusedu.com. Tras
            la cancelación, tus datos se conservarán durante 3 años por razones legales y luego se
            eliminarán.
          </p>
        </LegalSection>

        <LegalSection title="9. Modificaciones">
          <p>
            Podemos modificar estos términos notificándotelo por email con al menos 15 días de
            antelación. Si no estás de acuerdo con los nuevos términos, puedes cancelar tu cuenta
            antes de que entren en vigor.
          </p>
        </LegalSection>

        <LegalSection title="10. Legislación aplicable">
          <p>
            Estos términos se rigen por la legislación española. Para cualquier controversia, las
            partes se someten a los juzgados y tribunales de Olot.
          </p>
        </LegalSection>
      </LegalPage>
      <Footer />
    </>
  );
}

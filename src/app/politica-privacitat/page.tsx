import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LegalPage, LegalSection, LegalUl, LegalTable } from "@/components/legal/legal-prose";

export const metadata: Metadata = {
  title: "Política de privacidad — SeJus",
  description:
    "Política de privacidad de SeJus: qué datos recogemos del profesorado y del alumnado, con qué finalidad, cuánto tiempo los conservamos y qué terceros los tratan.",
  alternates: { canonical: "/politica-privacitat" },
};

export default function PoliticaPrivacitatPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Política de privacidad"
        meta="SeJus — Aplicación de gestión educativa · Versión 1.0 — Septiembre 2026"
      >
        <LegalSection title="1. Quién es responsable de tus datos">
          <p className="font-medium text-ink">Titular de la aplicación (SeJus):</p>
          <p>Nombre/Razón social: Marc Juvanteny i Serra</p>
          <p>NIF/CIF: 43637074W</p>
          <p>Domicilio: Les Tries 53, 17800, Catalunya, España</p>
          <p>Email de contacto: suport@sejusedu.com</p>
          <p>
            A efectos de esta política, el titular de SeJus actúa como responsable del tratamiento
            de los datos del profesorado registrado en la plataforma.
          </p>
          <p>
            En relación con los datos del alumnado introducidos por el profesorado, el centro
            educativo es el responsable del tratamiento y SeJus actúa como encargado del tratamiento
            por cuenta de dicho centro. Esta relación se formaliza mediante un contrato de encargado
            del tratamiento (véase apartado 9).
          </p>
        </LegalSection>

        <LegalSection title="2. Qué datos recogemos y por qué">
          <p className="font-medium text-ink">2.1 Datos del profesorado (usuarios registrados)</p>
          <LegalTable
            head={["Dato", "Finalidad", "Base legal"]}
            rows={[
              [
                "Nombre completo",
                "Personalizar la experiencia y figurar en los informes generados",
                "Ejecución del contrato (art. 6.1.b RGPD)",
              ],
              [
                "Dirección de email",
                "Autenticación, comunicaciones del servicio y recuperación de contraseña",
                "Ejecución del contrato (art. 6.1.b RGPD)",
              ],
              [
                "Contraseña",
                "Autenticación segura (nunca se almacena en texto plano)",
                "Ejecución del contrato (art. 6.1.b RGPD)",
              ],
              [
                "Centro educativo",
                "Personalización y figura en los informes",
                "Ejecución del contrato (art. 6.1.b RGPD)",
              ],
              [
                "Curso escolar",
                "Organización de los datos por año académico",
                "Ejecución del contrato (art. 6.1.b RGPD)",
              ],
              [
                "Dirección IP (temporal)",
                "Protección anti-abuso y limitación de peticiones a la IA",
                "Interés legítimo (art. 6.1.f RGPD) — la IP no se almacena en base de datos",
              ],
            ]}
          />

          <p className="mt-4 font-medium text-ink">2.2 Datos del alumnado (introducidos por el profesorado)</p>
          <p>
            El profesorado introduce en la aplicación datos relativos a su alumnado. Estos datos son
            tratados por SeJus por cuenta del centro educativo, que es el responsable de su
            tratamiento. Los datos que se pueden introducir son:
          </p>
          <LegalUl>
            <li>Nombre completo e iniciales del alumno o alumna</li>
            <li>Curso y grupo</li>
            <li>Notas numéricas por competencia y criterio de evaluación</li>
            <li>Comentarios de texto libre del profesorado sobre el alumno o alumna</li>
            <li>Fechas de actividades evaluadas</li>
          </LegalUl>
          <p>
            Base legal del tratamiento por parte del centro educativo: cumplimiento de obligación
            legal en materia educativa (art. 6.1.c RGPD, en relación con la normativa educativa
            vigente en Catalunya) y, en su caso, misión de interés público (art. 6.1.e RGPD).
          </p>
          <p>
            Datos de menores: el alumnado de primaria son menores de edad. El profesorado introduce
            estos datos en el ejercicio de sus funciones docentes, amparado por la normativa
            educativa. SeJus no recoge datos directamente de los menores ni les permite crear
            cuentas.
          </p>
        </LegalSection>

        <LegalSection title="3. Cuánto tiempo conservamos los datos">
          <LegalTable
            head={["Dato", "Plazo de conservación"]}
            rows={[
              ["Datos de cuenta del profesorado", "Mientras la cuenta esté activa + 3 años tras la baja"],
              [
                "Datos del alumnado",
                "Mientras el profesorado los mantenga activos. Los alumnos dados de baja se marcan como \"inactivos\" pero no se eliminan para preservar la integridad de los informes históricos",
              ],
              [
                "Dirección IP (temporal)",
                "No se almacena. Solo se usa en memoria del servidor para control de peticiones",
              ],
            ]}
          />
        </LegalSection>

        <LegalSection title="4. Terceros que tratan datos (subencargados)">
          <p>SeJus utiliza los siguientes proveedores externos que pueden tener acceso a los datos:</p>

          <p className="mt-2 font-medium text-ink">4.1 Supabase</p>
          <p>Función: autenticación de usuarios y base de datos donde se almacenan todos los datos.</p>
          <p>Datos que recibe: todos los datos del profesorado y del alumnado descritos en el apartado 2.</p>
          <p>Dónde almacena los datos: West UE, Ireland</p>
          <p>Más información: supabase.com/privacy</p>

          <p className="mt-2 font-medium text-ink">4.2 Anthropic (API de Claude)</p>
          <p>
            Función: generación de borradores de comentarios pedagógicos mediante inteligencia
            artificial.
          </p>
          <p>
            Datos que recibe: exclusivamente datos de rendimiento académico (notas y comentarios del
            profesorado) vinculados a un identificador numérico interno. Nunca se envía el nombre
            del alumno ni ningún dato que permita identificarle directamente.
          </p>
          <p>Uso para entrenamiento de modelos: Estados Unidos</p>
          <p>Más información: anthropic.com/privacy</p>

          <p className="mt-2 font-medium text-ink">4.3 Vercel</p>
          <p>Función: alojamiento y despliegue de la aplicación web.</p>
          <p>Datos que recibe: puede procesar datos de tráfico web (IP, cabeceras HTTP) en tránsito.</p>
          <p>Más información: vercel.com/legal/privacy-policy</p>

          <p className="mt-2 font-medium text-ink">4.4 Google Fonts</p>
          <p>Función: carga de tipografías para la interfaz de la aplicación.</p>
          <p>
            Datos que recibe: la dirección IP del usuario se transmite a los servidores de Google al
            cargar las fuentes tipográficas.
          </p>
          <p>Más información: policies.google.com/privacy</p>

          <p className="mt-2 font-medium text-ink">4.5 Formspree</p>
          <p>Función: gestión del formulario de contacto de la página web (sejusedu.com).</p>
          <p>
            Datos que recibe: nombre, email, centro educativo (opcional) y mensaje de las personas
            que rellenan el formulario de contacto.
          </p>
          <p>Más información: formspree.io/legal/privacy-policy</p>
        </LegalSection>

        <LegalSection title="5. Seguridad">
          <p>SeJus aplica las siguientes medidas técnicas y organizativas para proteger tus datos:</p>
          <LegalUl>
            <li>
              Cifrado en tránsito: toda la comunicación entre tu navegador y la aplicación se realiza
              mediante HTTPS con certificado SSL.
            </li>
            <li>
              Cifrado de contraseñas: las contraseñas nunca se almacenan en texto plano. La gestión de
              contraseñas la realiza Supabase Auth con estándares de seguridad actuales.
            </li>
            <li>
              Control de acceso por filas (Row Level Security): cada profesor solo puede acceder a
              sus propios datos. A nivel de base de datos, es técnicamente imposible que un usuario
              acceda a los datos de otro.
            </li>
            <li>
              Cabeceras de seguridad: la aplicación implementa cabeceras HTTP de seguridad (Content
              Security Policy, HSTS y otras).
            </li>
            <li>
              Limitación de peticiones: los endpoints sensibles (especialmente la generación de
              comentarios con IA) tienen limitación de peticiones por dirección IP para prevenir el
              abuso.
            </li>
          </LegalUl>
        </LegalSection>

        <LegalSection title="6. Tus derechos">
          <p>
            Como usuario registrado en SeJus, puedes ejercer los siguientes derechos sobre tus datos
            personales:
          </p>
          <LegalUl>
            <li>Acceso: saber qué datos tenemos sobre ti.</li>
            <li>Rectificación: corregir datos incorrectos o incompletos.</li>
            <li>Supresión: solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
            <li>Oposición: oponerte a determinados tratamientos.</li>
            <li>Limitación: solicitar que limitemos el uso de tus datos en determinadas circunstancias.</li>
            <li>Portabilidad: recibir tus datos en un formato estructurado y de uso común.</li>
          </LegalUl>
          <p>
            Cómo ejercerlos: envía un email a suport@sejusedu.com indicando el derecho que deseas
            ejercer y adjuntando una copia de tu documento de identidad. Respondemos en un plazo
            máximo de un mes desde la recepción de la solicitud.
          </p>
          <p>
            Si consideras que el tratamiento de tus datos no es correcto, tienes derecho a presentar
            una reclamación ante la Agencia Española de Protección de Datos (AEPD): aepd.es
          </p>
        </LegalSection>

        <LegalSection title="7. Sesión y almacenamiento local">
          <p>
            SeJus utiliza el localStorage del navegador para almacenar el token de sesión de
            Supabase. Este mecanismo no utiliza cookies de terceros ni de seguimiento publicitario.
            Su única finalidad es mantener la sesión activa entre visitas.
          </p>
        </LegalSection>

        <LegalSection title="8. Cambios en esta política">
          <p>
            Si modificamos esta política de privacidad, lo comunicaremos por email al profesorado
            registrado con al menos 15 días de antelación si los cambios son sustanciales. La versión
            actualizada siempre estará disponible en la aplicación.
          </p>
        </LegalSection>

        <LegalSection title="9. Contrato de encargado del tratamiento">
          <p>
            Dado que SeJus trata datos del alumnado por cuenta de los centros educativos, la relación
            entre SeJus y cada centro debe formalizarse mediante un contrato de encargado del
            tratamiento (Data Processing Agreement o DPA), conforme al artículo 28 del RGPD.
          </p>
          <p>
            Los centros educativos interesados pueden solicitar este contrato escribiendo a
            suport@sejusedu.com.
          </p>
        </LegalSection>
      </LegalPage>
      <Footer />
    </>
  );
}

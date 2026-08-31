export const locales = ["ca", "es"] as const;
export type Locale = (typeof locales)[number];

export type Dictionary = {
  meta: { title: string; description: string };
  header: { login: string; register: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    badges: string[];
    card: {
      eyebrow: string;
      nameLabel: string;
      name: string;
      cursLabel: string;
      curs: string;
      classeLabel: string;
      classe: string;
      footerLine: string;
    };
    caption: string;
  };
  scrolly: {
    stages: { eyebrow: string; title: string; description: string }[];
    closingTagline: string;
    startLabel: string;
    card: {
      fichaLabel: string;
      name: string;
      emptyState: string;
      criteria: string[];
      levelFull: { NA: string; AS: string; AN: string; AE: string };
      commentLabel: string;
      commentText: string;
      comparisonLabel: string;
      studentName: string;
      averageName: string;
      evolutionLabel: string;
      trimesterLabels: string[];
      devicesLabel: string;
      climaxLabel: string;
      comingSoonLabel: string;
      piece1: { eyebrow: string; name: string; meta: string };
      piece2: { eyebrow: string };
      piece3: { eyebrow: string; items: string[] };
      piece4: { eyebrow: string; quote: string };
      stats: { competencies: string; trimestres: string; cursComplet: string };
      archiveCaption: string;
      returnNote: string;
      radarLabel: string;
      folderIllustrationLabel: string;
    };
  };
  features: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    individual: { title: string; description: string; price: string; period: string; cta: string };
    centre: { title: string; description: string; price: string; cta: string };
  };
  plansPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stage: {
      prompt: string;
      infantil: string;
      primaria: string;
      eso: string;
      available: string;
      soon: string;
    };
    individual: {
      title: string;
      description: string;
      price: string;
      period: string;
      cta: string;
      features: string[];
    };
    centre: {
      title: string;
      description: string;
      badge: string;
      note: string;
      features: string[];
    };
  };
  testimonials: {
    eyebrow: string;
    items: { quote: string; author: string }[];
  };
  comingSoon: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  finalCta: { title: string; cta: string };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    schoolLabel: string;
    schoolPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitCta: string;
    sendingCta: string;
    errorMessage: string;
    successTitle: string;
    successMessage: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    tagline: string;
    primaryLinks: string[];
    legalLinks: { label: string; href: string }[];
    rights: string;
  };
};

const ca: Dictionary = {
  meta: {
    title: "SeJus — Cada alumne, una història",
    description:
      "Gestió educativa per a mestres: competències, informes trimestrals i programació setmanal, alineats amb el Decret 175/2022.",
  },
  header: {
    login: "Inicia sessió",
    register: "Registra't",
  },
  hero: {
    eyebrow: "Gestió educativa per a mestres",
    title: "Cada alumne té una història. Dona-li el seguiment que es mereix.",
    subtitle:
      "Avaluació per competències, informes trimestrals i seguiment de l'alumnat, alineats amb el Decret 175/2022 — la gestió d'aula digital pensada per a mestres de Catalunya.",
    ctaPrimary: "Prova SeJus",
    badges: ["Escala NA / AS / AN / AE"],
    card: {
      eyebrow: "Cas fictici · exemple il·lustratiu",
      nameLabel: "Nom",
      name: "Laia",
      cursLabel: "Curs",
      curs: "3r de Primària",
      classeLabel: "Classe",
      classe: "3r B",
      footerLine: "Competències · Informe · Comentaris — encara res",
    },
    caption: "Cada alumne, una història.",
  },
  scrolly: {
    stages: [
      {
        eyebrow: "Setembre",
        title: "Un curs nou comença en tres minuts.",
        description:
          "El mestre arriba al setembre amb una classe nova. SeJus li permet tenir tots els alumnes configurats en minuts.",
      },
      {
        eyebrow: "Octubre – Novembre",
        title: "Saps com va cada alumne abans que ell mateix se n'adoni.",
        description:
          "En el moment que el mestre introdueix les primeres notes, el gràfic d'aranya ja mostra la seva evolució.",
      },
      {
        eyebrow: "Desembre",
        title: "Tu coneixes l'alumne. SeJus t'ajuda a explicar-lo.",
        description:
          "SeJus analitza tots els mesos de seguiment, detecta patrons, identifica punts forts i febles, i genera un text pedagògic que el mestre revisa i signa.",
      },
      {
        eyebrow: "Gener – Març",
        title: "La diferència entre una nota i una història.",
        description:
          "No és una foto del moment — és una pel·lícula del curs sencer. El mestre veu si un alumne ha millorat, si un patró es repeteix, si una competència sempre queda endarrerida.",
      },
      {
        eyebrow: "Abril – Maig",
        title: "Tot el que saps d'un alumne, en un sol lloc.",
        description:
          "Notes per competència, evolució per trimestre i comentaris dels mestres, comparats amb la classe. Consultable des del mòbil, la tauleta o l'ordinador.",
      },
      {
        eyebrow: "Juny",
        title: "Un informe que els pares llegiran de veritat.",
        description:
          "Una IA genera una primera versió de l'informe analitzant tots els comentaris, notes i patrons de l'alumne. El mestre la revisa i l'ajusta. L'informe final compara els tres trimestres, celebra les millores i assenyala de manera constructiva el que encara cal treballar — en un to proper i sense tecnicismes.",
      },
      {
        eyebrow: "Setembre següent",
        title: "El que has après d'ells, no s'oblida.",
        description:
          "Quan comença el setembre següent, el nou mestre pot veure l'historial complet de l'alumne. El progrés no es perd. La feina d'un any no desapareix en un calaix.",
      },
    ],
    closingTagline: "Cada nen, una història.",
    startLabel: "Comencem el curs!",
    card: {
      fichaLabel: "Fitxa de seguiment",
      name: "Laia",
      emptyState: "Encara no hi ha avaluacions registrades.",
      criteria: [
        "Comunicació lingüística",
        "Competència digital",
        "Pensament científic i tècnic",
        "Competència personal i social",
        "Educació física",
      ],
      levelFull: {
        NA: "No assolit",
        AS: "Assoliment satisfactori",
        AN: "Assoliment notable",
        AE: "Assoliment excel·lent",
      },
      commentLabel: "Comentari pedagògic",
      commentText:
        "La Laia ha consolidat la comprensió lectora i mostra iniciativa en el treball en equip. Cal seguir reforçant l'expressió escrita de cara al proper trimestre.",
      comparisonLabel: "Compara amb la resta de la classe",
      studentName: "Laia",
      averageName: "Mitjana",
      evolutionLabel: "Evolució per trimestre",
      trimesterLabels: ["1r trim.", "2n trim.", "3r trim."],
      devicesLabel: "Des de qualsevol dispositiu",
      climaxLabel: "L'informe es genera sol",
      comingSoonLabel: "Properament",
      piece1: { eyebrow: "Informe trimestral", name: "Laia", meta: "3r B · Juny" },
      piece2: { eyebrow: "Competències" },
      piece3: {
        eyebrow: "Criteris avaluats",
        items: [
          "Comunicació — AN",
          "Digital — AS",
          "Científic — AN",
          "Personal i social — AE",
          "Educació física — AS",
        ],
      },
      piece4: {
        eyebrow: "Comentari",
        quote: "«Ha consolidat la comprensió lectora i mostra iniciativa en el treball en equip.»",
      },
      stats: { competencies: "competències", trimestres: "trimestres", cursComplet: "curs complet" },
      archiveCaption: "Historial dels tres trimestres, guardat",
      returnNote:
        "L'historial no es perd: el proper mestre el trobarà tot a punt el setembre següent.",
      radarLabel: "Gràfic de radar amb el nivell assolit a cada competència",
      folderIllustrationLabel:
        "Il·lustració d'una carpeta amb un núvol, representant una funcionalitat encara en desenvolupament",
    },
  },
  features: {
    eyebrow: "Funcionalitats",
    title: "Tot el que necessites per portar el dia a dia de l'aula, en un sol lloc",
    items: [
      {
        title: "Gestió d'alumnes",
        description:
          "Fitxes individuals sempre a mà, amb l'historial complet de cada infant al llarg del curs.",
      },
      {
        title: "Competències i criteris",
        description:
          "Avaluació alineada amb el Decret 175/2022, amb l'escala NA / AS / AN / AE sempre a la vista.",
      },
      {
        title: "Programació setmanal",
        description:
          "Planifica la setmana i vincula cada activitat als criteris que treballa, sense fulls solts.",
      },
      {
        title: "Informes amb ajuda d'IA",
        description:
          "Una primera versió de l'informe trimestral, generada automàticament a partir dels comentaris i les notes, que el mestre revisa i signa.",
      },
    ],
  },
  pricing: {
    eyebrow: "Preus",
    title: "Pensat per a un mestre, o per a tota l'escola",
    individual: {
      title: "Individual",
      description: "Per a un sol mestre, amb totes les seves classes.",
      price: "9 €",
      period: "/ mes",
      cta: "Comença ara",
    },
    centre: {
      title: "Centre",
      description: "Per a tota l'escola, amb coordinació entre cicles.",
      price: "Properament",
      cta: "T'avisarem quan estigui a punt.",
    },
  },
  plansPage: {
    eyebrow: "Preus",
    title: "Tria com vols fer servir SeJus",
    subtitle:
      "Un pla senzill per a un sol mestre, i un pla de centre que estem preparant per a tota l'escola.",
    stage: {
      prompt: "Per a quina etapa vols SeJus?",
      infantil: "Infantil",
      primaria: "Primària",
      eso: "ESO",
      available: "Disponible",
      soon: "Properament",
    },
    individual: {
      title: "Individual",
      description: "Per a un sol mestre, amb totes les seves classes.",
      price: "9 €",
      period: "/ mes",
      cta: "Comença ara",
      features: [
        "Alumnes i classes il·limitats",
        "Competències i criteris alineats amb el decret actual",
        "Escala NA / AS / AN / AE sempre a la vista",
        "Programació setmanal vinculada als criteris",
        "Informes trimestrals amb primera versió generada per IA",
        "Historial complet de cada alumne, curs rere curs",
        "Accés des del mòbil, la tauleta o l'ordinador",
      ],
    },
    centre: {
      title: "Centre",
      description: "Per a tota l'escola, amb coordinació entre cicles.",
      badge: "Properament",
      note: "T'avisarem quan estigui a punt.",
      features: [
        "Tot el que inclou el pla Individual",
        "Coordinació entre mestres i cicles",
        "Panell de centre amb visió de conjunt",
        "Formació i suport prioritari per a l'equip docent",
      ],
    },
  },
  testimonials: {
    eyebrow: "Mestres que ja l'utilitzen",
    items: [
      {
        quote: "Per fi una eina que sembla feta per algú que ha estat dins una aula.",
        author: "Marta Solé · mestra de cicle mitjà, Escola Els Til·lers",
      },
      {
        quote:
          "Els informes trimestrals que abans em portaven un cap de setmana, ara els tinc en una tarda.",
        author: "Jordi Ferran · tutor de 4t, Escola Sant Roc",
      },
      {
        quote: "Els criteris del Decret hi són tots, i no em fa sentir que estic omplint un formulari.",
        author: "Núria Camps · directora, Escola Bellavista",
      },
    ],
  },
  comingSoon: {
    eyebrow: "Properament",
    title: "El curs 2026-2027 ja hi serà, esperant-te.",
    description:
      "Estem preparant la sincronització al núvol perquè, quan comenci el setembre que ve, obris SeJus i tot hi sigui: alumnes, historial, comentaris. Sense exportar res, sense fer còpies a mà.",
    note: "En proves amb un grapat d'escoles aquest curs.",
  },
  finalCta: {
    title: "Cada alumne té una història. Dona-li el seguiment que es mereix.",
    cta: "Prova SeJus",
  },
  contact: {
    eyebrow: "Contacte",
    title: "Tens dubtes o vols provar-ho amb la teva escola?",
    subtitle: "Explica'ns el teu cas i et respondrem en menys de 48 hores.",
    nameLabel: "Nom",
    namePlaceholder: "El teu nom",
    emailLabel: "Email",
    emailPlaceholder: "tu@escola.cat",
    schoolLabel: "Centre educatiu (opcional)",
    schoolPlaceholder: "Nom de l'escola",
    messageLabel: "Missatge",
    messagePlaceholder: "Explica'ns què necessites o quin dubte tens…",
    submitCta: "Envia la consulta",
    sendingCta: "Enviant…",
    errorMessage: "No s'ha pogut enviar el missatge. Torna-ho a provar en uns minuts.",
    successTitle: "Gràcies!",
    successMessage: "Hem rebut el teu missatge. Et respondrem en menys de 48 hores.",
  },
  faq: {
    eyebrow: "Preguntes freqüents",
    title: "Tot el que un mestre es pregunta abans de començar",
    items: [
      {
        question: "Què és l'avaluació per competències?",
        answer:
          "És un model d'avaluació que valora el que l'alumnat sap fer amb els seus coneixements, no només si els recorda. A Catalunya es mesura amb l'escala NA / AS / AN / AE per a cada competència, i és la base de la programació setmanal i dels informes trimestrals a primària.",
      },
      {
        question: "SeJus és compatible amb el Decret 175/2022?",
        answer:
          "Sí. Les competències, els criteris d'avaluació i l'escala NA / AS / AN / AE que fa servir SeJus estan alineats amb el Decret 175/2022 d'ordenació dels ensenyaments de l'educació bàsica a Catalunya.",
      },
      {
        question: "Per a quines etapes educatives està disponible SeJus?",
        answer:
          "Ara mateix SeJus està disponible per a Infantil i Primària. L'aplicació per a ESO encara no l'hem començat — pots deixar-nos el teu contacte i t'avisarem quan estigui a punt.",
      },
      {
        question: "Com funcionen els informes trimestrals amb IA?",
        answer:
          "SeJus analitza les notes i comentaris que el mestre ha anat introduint durant el trimestre i en genera una primera versió de l'informe, amb un to proper i sense tecnicismes. El mestre sempre la revisa, l'ajusta i la signa abans d'enviar-la a les famílies.",
      },
      {
        question: "Quant costa SeJus?",
        answer:
          "El pla Individual, per a un sol mestre amb totes les seves classes, costa 9 € al mes. El pla de Centre, pensat per a tota l'escola amb coordinació entre cicles, estarà disponible properament.",
      },
    ],
  },
  footer: {
    tagline: "Cada nen, una història.",
    primaryLinks: ["Funcionalitats", "Preus", "Contacte"],
    legalLinks: [
      { label: "Política de privacitat", href: "/politica-privacitat" },
      { label: "Avís legal", href: "/avis-legal" },
      { label: "Termes d'ús", href: "/termes-us" },
    ],
    rights: "© 2026 SeJus",
  },
};

const es: Dictionary = {
  meta: {
    title: "SeJus — Cada alumno, una historia",
    description:
      "Gestión educativa para maestros: competencias, informes trimestrales y programación semanal, alineados con el Decret 175/2022.",
  },
  header: {
    login: "Iniciar sesión",
    register: "Regístrate",
  },
  hero: {
    eyebrow: "Gestión educativa para maestros",
    title: "Cada alumno tiene una historia. Dale el seguimiento que se merece.",
    subtitle:
      "Evaluación por competencias, informes trimestrales y seguimiento del alumnado, alineados con el Decret 175/2022 — la gestión de aula digital pensada para maestros de Cataluña.",
    ctaPrimary: "Prueba SeJus",
    badges: ["Escala NA / AS / AN / AE"],
    card: {
      eyebrow: "Caso ficticio · ejemplo ilustrativo",
      nameLabel: "Nombre",
      name: "Laia",
      cursLabel: "Curso",
      curs: "3º de Primaria",
      classeLabel: "Clase",
      classe: "3º B",
      footerLine: "Competencias · Informe · Comentarios — todavía nada",
    },
    caption: "Cada alumno, una historia.",
  },
  scrolly: {
    stages: [
      {
        eyebrow: "Septiembre",
        title: "Un curso nuevo empieza en tres minutos.",
        description:
          "El maestro llega en septiembre con una clase nueva. SeJus le permite tener a todo el alumnado configurado en minutos.",
      },
      {
        eyebrow: "Octubre – Noviembre",
        title: "Sabes cómo va cada alumno antes de que él mismo se dé cuenta.",
        description:
          "En el momento en que el maestro introduce las primeras notas, el gráfico de araña ya muestra su evolución.",
      },
      {
        eyebrow: "Diciembre",
        title: "Tú conoces al alumno. SeJus te ayuda a explicarlo.",
        description:
          "SeJus analiza todos los meses de seguimiento, detecta patrones, identifica puntos fuertes y débiles, y genera un texto pedagógico que el maestro revisa y firma.",
      },
      {
        eyebrow: "Enero – Marzo",
        title: "La diferencia entre una nota y una historia.",
        description:
          "No es una foto del momento — es una película del curso entero. El maestro ve si un alumno ha mejorado, si un patrón se repite, si una competencia siempre queda rezagada.",
      },
      {
        eyebrow: "Abril – Mayo",
        title: "Todo lo que sabes de un alumno, en un solo lugar.",
        description:
          "Notas por competencia, evolución por trimestre y comentarios de los maestros, comparados con la clase. Consultable desde el móvil, la tableta o el ordenador.",
      },
      {
        eyebrow: "Junio",
        title: "Un informe que los padres leerán de verdad.",
        description:
          "Una IA genera una primera versión del informe analizando todos los comentarios, notas y patrones del alumno. El maestro la revisa y la ajusta. El informe final compara los tres trimestres, celebra las mejoras y señala de forma constructiva lo que todavía hay que trabajar — en un tono cercano y sin tecnicismos.",
      },
      {
        eyebrow: "Septiembre siguiente",
        title: "Lo que has aprendido de ellos, no se olvida.",
        description:
          "Cuando empieza el septiembre siguiente, el nuevo maestro puede ver el historial completo del alumno. El progreso no se pierde. El trabajo de un año no desaparece en un cajón.",
      },
    ],
    closingTagline: "Cada niño, una historia.",
    startLabel: "¡Empezamos el curso!",
    card: {
      fichaLabel: "Ficha de seguimiento",
      name: "Laia",
      emptyState: "Todavía no hay evaluaciones registradas.",
      criteria: [
        "Comunicación lingüística",
        "Competencia digital",
        "Pensamiento científico y técnico",
        "Competencia personal y social",
        "Educación física",
      ],
      levelFull: {
        NA: "No conseguido",
        AS: "Logro satisfactorio",
        AN: "Logro notable",
        AE: "Logro excelente",
      },
      commentLabel: "Comentario pedagógico",
      commentText:
        "Laia ha consolidado la comprensión lectora y muestra iniciativa en el trabajo en equipo. Hay que seguir reforzando la expresión escrita de cara al próximo trimestre.",
      comparisonLabel: "Compara con el resto de la clase",
      studentName: "Laia",
      averageName: "Media",
      evolutionLabel: "Evolución por trimestre",
      trimesterLabels: ["1er trim.", "2º trim.", "3er trim."],
      devicesLabel: "Desde cualquier dispositivo",
      climaxLabel: "El informe se genera solo",
      comingSoonLabel: "Próximamente",
      piece1: { eyebrow: "Informe trimestral", name: "Laia", meta: "3º B · Junio" },
      piece2: { eyebrow: "Competencias" },
      piece3: {
        eyebrow: "Criterios evaluados",
        items: [
          "Comunicación — AN",
          "Digital — AS",
          "Científico — AN",
          "Personal y social — AE",
          "Educación física — AS",
        ],
      },
      piece4: {
        eyebrow: "Comentario",
        quote: "«Ha consolidado la comprensión lectora y muestra iniciativa en el trabajo en equipo.»",
      },
      stats: { competencies: "competencias", trimestres: "trimestres", cursComplet: "curso completo" },
      archiveCaption: "Historial de los tres trimestres, guardado",
      returnNote:
        "El historial no se pierde: el próximo maestro lo encontrará todo listo el septiembre siguiente.",
      radarLabel: "Gráfico de radar con el nivel alcanzado en cada competencia",
      folderIllustrationLabel:
        "Ilustración de una carpeta con una nube, representando una funcionalidad todavía en desarrollo",
    },
  },
  features: {
    eyebrow: "Funcionalidades",
    title: "Todo lo que necesitas para llevar el día a día del aula, en un solo lugar",
    items: [
      {
        title: "Gestión de alumnos",
        description:
          "Fichas individuales siempre a mano, con el historial completo de cada niño a lo largo del curso.",
      },
      {
        title: "Competencias y criterios",
        description:
          "Evaluación alineada con el Decret 175/2022, con la escala NA / AS / AN / AE siempre a la vista.",
      },
      {
        title: "Programación semanal",
        description:
          "Planifica la semana y vincula cada actividad a los criterios que trabaja, sin hojas sueltas.",
      },
      {
        title: "Informes con ayuda de IA",
        description:
          "Una primera versión del informe trimestral, generada automáticamente a partir de los comentarios y las notas, que el maestro revisa y firma.",
      },
    ],
  },
  pricing: {
    eyebrow: "Precios",
    title: "Pensado para un maestro, o para todo el colegio",
    individual: {
      title: "Individual",
      description: "Para un solo maestro, con todas sus clases.",
      price: "9 €",
      period: "/ mes",
      cta: "Empieza ahora",
    },
    centre: {
      title: "Centro",
      description: "Para todo el colegio, con coordinación entre ciclos.",
      price: "Próximamente",
      cta: "Te avisaremos cuando esté listo.",
    },
  },
  plansPage: {
    eyebrow: "Precios",
    title: "Elige cómo quieres usar SeJus",
    subtitle:
      "Un plan sencillo para un solo maestro, y un plan de centro que estamos preparando para todo el colegio.",
    stage: {
      prompt: "¿Para qué etapa quieres SeJus?",
      infantil: "Infantil",
      primaria: "Primaria",
      eso: "ESO",
      available: "Disponible",
      soon: "Próximamente",
    },
    individual: {
      title: "Individual",
      description: "Para un solo maestro, con todas sus clases.",
      price: "9 €",
      period: "/ mes",
      cta: "Empieza ahora",
      features: [
        "Alumnado y clases ilimitados",
        "Competencias y criterios alineados con el decreto actual",
        "Escala NA / AS / AN / AE siempre a la vista",
        "Programación semanal vinculada a los criterios",
        "Informes trimestrales con primera versión generada por IA",
        "Historial completo de cada alumno, curso tras curso",
        "Acceso desde el móvil, la tableta o el ordenador",
      ],
    },
    centre: {
      title: "Centro",
      description: "Para todo el colegio, con coordinación entre ciclos.",
      badge: "Próximamente",
      note: "Te avisaremos cuando esté listo.",
      features: [
        "Todo lo que incluye el plan Individual",
        "Coordinación entre maestros y ciclos",
        "Panel de centro con visión de conjunto",
        "Formación y soporte prioritario para el equipo docente",
      ],
    },
  },
  testimonials: {
    eyebrow: "Maestros que ya lo usan",
    items: [
      {
        quote: "Por fin una herramienta que parece hecha por alguien que ha estado dentro de un aula.",
        author: "Marta Solé · maestra de ciclo medio, Escola Els Til·lers",
      },
      {
        quote:
          "Los informes trimestrales que antes me llevaban un fin de semana, ahora los tengo en una tarde.",
        author: "Jordi Ferran · tutor de 4º, Escola Sant Roc",
      },
      {
        quote: "Los criterios del Decret están todos, y no me hace sentir que estoy rellenando un formulario.",
        author: "Núria Camps · directora, Escola Bellavista",
      },
    ],
  },
  comingSoon: {
    eyebrow: "Próximamente",
    title: "El curso 2026-2027 ya estará ahí, esperándote.",
    description:
      "Estamos preparando la sincronización en la nube para que, cuando empiece el próximo septiembre, abras SeJus y todo esté ahí: alumnado, historial, comentarios. Sin exportar nada, sin copias a mano.",
    note: "En pruebas con un puñado de colegios este curso.",
  },
  finalCta: {
    title: "Cada alumno tiene una historia. Dale el seguimiento que se merece.",
    cta: "Prueba SeJus",
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Tienes dudas o quieres probarlo con tu colegio?",
    subtitle: "Cuéntanos tu caso y te responderemos en menos de 48 horas.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@colegio.es",
    schoolLabel: "Centro educativo (opcional)",
    schoolPlaceholder: "Nombre del colegio",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos qué necesitas o qué duda tienes…",
    submitCta: "Enviar consulta",
    sendingCta: "Enviando…",
    errorMessage: "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.",
    successTitle: "¡Gracias!",
    successMessage: "Hemos recibido tu mensaje. Te responderemos en menos de 48 horas.",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Todo lo que un maestro se pregunta antes de empezar",
    items: [
      {
        question: "¿Qué es la evaluación por competencias?",
        answer:
          "Es un modelo de evaluación que valora lo que el alumnado sabe hacer con sus conocimientos, no solo si los recuerda. En Cataluña se mide con la escala NA / AS / AN / AE para cada competencia, y es la base de la programación semanal y de los informes trimestrales en primaria.",
      },
      {
        question: "¿SeJus es compatible con el Decret 175/2022?",
        answer:
          "Sí. Las competencias, los criterios de evaluación y la escala NA / AS / AN / AE que usa SeJus están alineados con el Decret 175/2022 de ordenación de las enseñanzas de la educación básica en Cataluña.",
      },
      {
        question: "¿Para qué etapas educativas está disponible SeJus?",
        answer:
          "Ahora mismo SeJus está disponible para Infantil y Primaria. La aplicación para ESO todavía no la hemos empezado — puedes dejarnos tu contacto y te avisaremos cuando esté lista.",
      },
      {
        question: "¿Cómo funcionan los informes trimestrales con IA?",
        answer:
          "SeJus analiza las notas y comentarios que el maestro ha ido introduciendo durante el trimestre y genera una primera versión del informe, con un tono cercano y sin tecnicismos. El maestro siempre la revisa, la ajusta y la firma antes de enviarla a las familias.",
      },
      {
        question: "¿Cuánto cuesta SeJus?",
        answer:
          "El plan Individual, para un solo maestro con todas sus clases, cuesta 9 € al mes. El plan de Centro, pensado para todo el colegio con coordinación entre ciclos, estará disponible próximamente.",
      },
    ],
  },
  footer: {
    tagline: "Cada niño, una historia.",
    primaryLinks: ["Funcionalidades", "Precios", "Contacto"],
    legalLinks: [
      { label: "Política de privacidad", href: "/politica-privacitat" },
      { label: "Aviso legal", href: "/avis-legal" },
      { label: "Términos de uso", href: "/termes-us" },
    ],
    rights: "© 2026 SeJus",
  },
};

export const translations = { ca, es };

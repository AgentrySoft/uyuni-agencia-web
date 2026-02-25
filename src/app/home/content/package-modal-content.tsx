import type { TimelineDay } from "@/app/home/components/PackageTimeline";

const UNSPLASH = "https://images.unsplash.com";
const IMG = (id: string, w = 800) => `${UNSPLASH}/photo-${id}?w=${w}&q=80`;

export type PackageModalContent = {
  title: string;
  destination: string;
  duration: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  days: TimelineDay[];
};

const FULL_DAY: PackageModalContent = {
  title: "Salar de Uyuni día completo",
  destination: "Uyuni",
  duration: "1 día",
  imageUrl: IMG("1617961110553-a5baf6c73bd0"),
  imageAlt: "Salar de Uyuni, horizonte infinito",
  description:
    "Recorrido clásico por el Salar de Uyuni: Cementerio de Trenes, Colchani, Isla Incahuasi y perspectivas infinitas sobre el salar. Ideal si tienes poco tiempo.",
  days: [
    {
      day: 1,
      title: "Uyuni – Salar – Isla Incahuasi – Uyuni",
      steps: [
        "Salida desde Uyuni. Parada en el Cementerio de Trenes.",
        "Visita a Colchani (procesamiento de sal y artesanías).",
        "Entrada al Salar: fotos de perspectiva y recorrido por el blanco infinito.",
        "Isla Incahuasi: cactus gigantes y vista 360° del salar.",
        "Regreso a Uyuni por la tarde.",
      ],
    },
  ],
};

const UYUNI_ATACAMA_CLASICO: PackageModalContent = {
  title: "Uyuni - Atacama Chile clásico",
  destination: "Uyuni-Atacama",
  duration: "3 días / 2 noches",
  imageUrl: IMG("1681740103037-ad4f7b372f96"),
  imageAlt: "Paisaje altiplánico entre Uyuni y Atacama",
  description:
    "Trayecto Uyuni → San Pedro de Atacama atravesando el Salar, lagunas altiplánicas, géiseres y desierto de Dalí. Entrega en la frontera chilena.",
  days: [
    {
      day: 1,
      title: "Uyuni – Salar – Isla Incahuasi – noche en refugio",
      steps: [
        "Cementerio de Trenes y Colchani.",
        "Salar de Uyuni e Isla Incahuasi.",
        "Noche en alojamiento en ruta (habitación compartida o privada).",
      ],
    },
    {
      day: 2,
      title: "Lagunas – Laguna Colorada – géiseres – termales",
      steps: [
        "Laguna Cañapa, Hedionda, Chiarcota; avistamiento de flamencos.",
        "Desierto de Dalí y Laguna Verde/Blanca (opcional según ruta).",
        "Laguna Colorada; géiseres Sol de Mañana; termales (opcional).",
        "Noche en refugio cerca de Laguna Colorada.",
      ],
    },
    {
      day: 3,
      title: "Árbol de Piedra – lagunas – frontera San Pedro",
      steps: [
        "Amanecer en Laguna Colorada; desayuno.",
        "Árbol de Piedra y lagunas altiplánicas (Ramaditas, Honda, etc.).",
        "Llegada a la frontera (Hito Cajón); traslado a San Pedro de Atacama.",
      ],
    },
  ],
};

const TOUR_3D_2N_HOTELES: PackageModalContent = {
  title: "Tour 3 días 2 noches con hoteles",
  destination: "Uyuni - Atacama",
  duration: "3 días / 2 noches",
  imageUrl: IMG("1667759318192-58c71a6abdde"),
  imageAlt: "Montañas y lagunas en la Reserva Eduardo Avaroa",
  description:
    "Recorrido completo por Salar, lagunas, géiseres y paisajes de la Reserva Eduardo Avaroa, con alojamiento en hoteles de sal y refugios.",
  days: [
    {
      day: 1,
      title: "Uyuni – Cementerio de Trenes – Salar – Isla Incahuasi",
      steps: [
        "Cementerio de Trenes y Colchani.",
        "Salar de Uyuni: fotos de perspectiva, Isla Incahuasi (cactus gigantes).",
        "Noche en hotel de sal o alojamiento en ruta.",
      ],
    },
    {
      day: 2,
      title: "Lagunas – Laguna Colorada – géiseres – termales",
      steps: [
        "Lagunas altiplánicas (Cañapa, Hedionda, Chiarcota) y flamencos.",
        "Desierto de Dalí; Laguna Verde y Laguna Blanca (vista).",
        "Laguna Colorada; géiseres Sol de Mañana; baño en termales (opcional).",
        "Noche en refugio en la Reserva Eduardo Avaroa.",
      ],
    },
    {
      day: 3,
      title: "Regreso: Árbol de Piedra – Uyuni",
      steps: [
        "Amanecer en Laguna Colorada.",
        "Árbol de Piedra; lagunas Ramaditas, Honda.",
        "Regreso a Uyuni por la tarde.",
      ],
    },
  ],
};

const UYUNI_SAN_PEDRO: PackageModalContent = {
  title: "Uyuni - San Pedro de Atacama",
  destination: "Uyuni",
  duration: "3 días / 2 noches",
  imageUrl: IMG("1511971102362-4716ca353f65"),
  imageAlt: "Camino al Salar de Uyuni",
  description:
    "Mismo itinerario espectacular que el clásico Uyuni–Atacama: Salar, lagunas de colores, géiseres y entrega en Hito Cajón para continuar a Chile.",
  days: [
    {
      day: 1,
      title: "Uyuni – Salar – Isla Incahuasi",
      steps: [
        "Salida desde Uyuni; Cementerio de Trenes y Colchani.",
        "Salar de Uyuni e Isla Incahuasi.",
        "Alojamiento en hotel de sal o refugio.",
      ],
    },
    {
      day: 2,
      title: "Lagunas – Laguna Colorada – géiseres",
      steps: [
        "Lagunas Cañapa, Hedionda, Chiarcota; flamencos.",
        "Laguna Colorada; géiseres Sol de Mañana; termales.",
        "Noche en refugio en la reserva.",
      ],
    },
    {
      day: 3,
      title: "Hacia San Pedro de Atacama",
      steps: [
        "Árbol de Piedra; lagunas altiplánicas.",
        "Llegada a Hito Cajón; entrega para traslado a San Pedro de Atacama.",
      ],
    },
  ],
};

const TOUR_NOCTURNO: PackageModalContent = {
  title: "Tour nocturno Salar de Uyuni",
  destination: "Uyuni",
  duration: "1 noche",
  imageUrl: IMG("1667759321771-e1016861be32"),
  imageAlt: "Estrellas sobre el Salar de Uyuni",
  description:
    "Experiencia bajo las estrellas en el Salar: salida al atardecer, observación de la Vía Láctea y fotos nocturnas en el blanco infinito.",
  days: [
    {
      day: 1,
      title: "Atardecer y noche en el Salar",
      steps: [
        "Salida desde Uyuni al Salar al atardecer.",
        "Fotos con el cielo naranja y luego estrellado.",
        "Observación de constelaciones y Vía Láctea (época seca).",
        "Regreso a Uyuni de madrugada o pernocta en el salar según programa.",
      ],
    },
  ],
};

const ESTRELLAS_AMANECER_2D: PackageModalContent = {
  title: "Observación de estrellas + amanecer 2 días",
  destination: "Uyuni",
  duration: "2 días / 1 noche",
  imageUrl: IMG("1617961110553-a5baf6c73bd0"),
  imageAlt: "Amanecer en el Salar de Uyuni",
  description:
    "Combinación de noche estrellada en el Salar y amanecer en el mismo escenario. Incluye Isla Incahuasi y recorrido diurno por el salar.",
  days: [
    {
      day: 1,
      title: "Uyuni – Salar – noche estrellada",
      steps: [
        "Salida por la tarde; entrada al Salar.",
        "Atardecer y sesión de fotos nocturnas; observación de estrellas.",
        "Pernocta en hotel de sal o refugio en el salar.",
      ],
    },
    {
      day: 2,
      title: "Amanecer en el Salar – Isla Incahuasi – Uyuni",
      steps: [
        "Amanecer en el Salar (fotos y desayuno).",
        "Visita a Isla Incahuasi; más recorrido por el salar.",
        "Regreso a Uyuni a media mañana o mediodía.",
      ],
    },
  ],
};

/** Slug por índice de OUR_PACKAGES (orden del array) */
const PACKAGE_SLUGS = [
  "salar-uyuni-dia-completo",
  "uyuni-atacama-clasico",
  "tour-3d-2n-hoteles",
  "uyuni-san-pedro",
  "tour-nocturno",
  "estrellas-amanecer-2d",
] as const;

const PACKAGE_CONTENT: Record<(typeof PACKAGE_SLUGS)[number], PackageModalContent> = {
  "salar-uyuni-dia-completo": FULL_DAY,
  "uyuni-atacama-clasico": UYUNI_ATACAMA_CLASICO,
  "tour-3d-2n-hoteles": TOUR_3D_2N_HOTELES,
  "uyuni-san-pedro": UYUNI_SAN_PEDRO,
  "tour-nocturno": TOUR_NOCTURNO,
  "estrellas-amanecer-2d": ESTRELLAS_AMANECER_2D,
};

export { PACKAGE_SLUGS, PACKAGE_CONTENT };

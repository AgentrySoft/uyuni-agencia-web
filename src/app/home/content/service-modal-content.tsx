import type { ReactNode } from "react";

export type ServiceModalContent = {
  title: string;
  subtitle?: string;
  /** URL de imagen (ej. Unsplash) para el modal */
  imageUrl?: string;
  imageAlt?: string;
  body: string[];
  highlights?: string[];
  icon?: ReactNode;
};

const UNSPLASH = "https://images.unsplash.com";
const IMG = (id: string, w = 800) => `${UNSPLASH}/photo-${id}?w=${w}&q=80`;

/** Contenido extendido para los modales de servicios (basado en información real de Uyuni) */
export const SERVICE_MODAL_CONTENT: Record<string, ServiceModalContent> = {
  "alojamiento-comodo": {
    title: "Alojamiento cómodo",
    subtitle: "Hoteles y refugios seleccionados para tu descanso",
    imageUrl: IMG("1615994992013-ed37418f6ea1"),
    imageAlt: "Hotel de sal en Uyuni, habitación acogedora",
    body: [
      "Trabajamos con hoteles de sal, hostales y refugios dentro de la Reserva Eduardo Avaroa, elegidos por ubicación, limpieza y calefacción a más de 4.000 m.s.n.m.",
      "En Uyuni encontrarás opciones como el Hotel de Sal o el Boutique Andina de Sal (terraza, bar, piscina cubierta y sauna). En ruta, alojamiento en habitaciones compartidas o privadas según el tour.",
      "Todas las noches incluyen manta extra por el frío altiplánico. Recomendamos llevar saco de dormir si prefieres mayor confort en refugios.",
    ],
    highlights: [
      "Hoteles de sal en Uyuni y en ruta",
      "Habitaciones privadas disponibles en la mayoría de tours",
      "Calefacción y agua caliente donde la infraestructura lo permite",
    ],
  },
  "transporte-seguro": {
    title: "Transporte seguro y confiable",
    subtitle: "Vehículos 4×4 y guías experimentados",
    imageUrl: IMG("1487947366323-374a622aeccf"),
    imageAlt: "Vehículo 4×4 en el Altiplano cerca del Salar de Uyuni",
    body: [
      "Todos nuestros tours por el Salar y la Reserva Eduardo Avaroa se realizan en vehículos 4×4 preparados para arena, sal y caminos de altura (hasta 5.000 m.s.n.m.).",
      "Cada jeep lleva máximo 6 pasajeros para mayor comodidad. Los conductores son guías locales con años de experiencia y conocimiento del clima y las rutas.",
      "Incluimos seguro de pasajeros y comunicación por radio entre vehículos. En temporada de lluvias (enero-marzo) adaptamos rutas para priorizar seguridad.",
    ],
    highlights: [
      "Jeeps 4×4 con capacidad 6 personas",
      "Conductores-guías locales certificados",
      "Seguro y comunicación entre vehículos",
    ],
  },
  "rutas-escenicas": {
    title: "Rutas escénicas únicas",
    subtitle: "Paisajes que solo el Altiplano ofrece",
    imageUrl: IMG("1708432594936-918e1417a240"),
    imageAlt: "Salar de Uyuni al atardecer, paisaje infinito",
    body: [
      "Nuestras rutas atraviesan el Salar de Uyuni, la Reserva Nacional de Fauna Andina Eduardo Avaroa, lagunas de colores, géiseres, desiertos de roca y formaciones como el Árbol de Piedra.",
      "Cada recorrido está pensado para combinar fotos inolvidables, avistamiento de flamencos y vicuñas, y tiempo en lugares emblemáticos como la Laguna Colorada o la Isla Incahuasi.",
      "Te llevamos por caminos que evitan masificación y respetan los horarios de parques y comunidades, para que vivas el Uyuni más auténtico.",
    ],
    highlights: [
      "Salar, lagunas, géiseres y desiertos de roca",
      "Flamencos, vicuñas y paisajes de otro planeta",
      "Rutas diseñadas para fotografía y experiencia única",
    ],
  },
};

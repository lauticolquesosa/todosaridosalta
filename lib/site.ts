export const SITE_URL = 'https://todosaridosalta.vercel.app';

export const BRAND = {
  name: 'Todo Áridos Salta',
  sub: 'Norte Piscinas',
  legalName: 'Todo Áridos Salta · Norte Piscinas',
  phoneLabel: '387 572-2206',
  phoneHref: 'tel:+543875722206',
  whatsapp: '5493875722206',
  instagram: 'https://instagram.com/todoaridos',
  facebook: 'https://facebook.com/todoaridossalta',
  city: 'Salta',
  region: 'Salta',
  country: 'AR',
  founded: '2020',
  agency: { name: 'LCS DESING', url: 'https://lcsdesign.vercel.app/' },
} as const;

export function wa(text: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type TipoPileta = 'hormigon' | 'fibra';

export type Obra = {
  slug: string;
  barrio: string;
  zona: string;
  tipo: TipoPileta;
  medidas: string;
  plazo: string;
  destacada?: boolean;
};

/**
 * Obras publicadas. Solo "La Reserva, San Lorenzo Chico" corresponde a una obra
 * documentada; el resto queda como ficha lista para cargar con los datos reales
 * del cliente. Medidas y plazos no se inventan: van como "A confirmar".
 */
export const OBRAS: Obra[] = [
  {
    slug: 'la-reserva-san-lorenzo-chico',
    barrio: 'Pileta en La Reserva',
    zona: 'San Lorenzo',
    tipo: 'hormigon',
    medidas: 'A confirmar',
    plazo: 'A confirmar',
    destacada: true,
  },
  { slug: 'san-lorenzo-i', barrio: 'Pileta en San Lorenzo', zona: 'San Lorenzo', tipo: 'hormigon', medidas: 'A confirmar', plazo: 'A confirmar' },
  { slug: 'vaqueros-i', barrio: 'Pileta en Vaqueros', zona: 'Vaqueros', tipo: 'fibra', medidas: 'A confirmar', plazo: 'A confirmar' },
  { slug: 'salta-capital-i', barrio: 'Pileta en Salta capital', zona: 'Salta capital', tipo: 'hormigon', medidas: 'A confirmar', plazo: 'A confirmar' },
  { slug: 'zona-sur-i', barrio: 'Pileta en zona sur', zona: 'Zona sur', tipo: 'fibra', medidas: 'A confirmar', plazo: 'A confirmar' },
  { slug: 'san-lorenzo-ii', barrio: 'Pileta en San Lorenzo', zona: 'San Lorenzo', tipo: 'hormigon', medidas: 'A confirmar', plazo: 'A confirmar' },
];

export const ZONAS = ['San Lorenzo', 'Vaqueros', 'Salta capital', 'Zona sur'] as const;

export const tipoLabel = (t: TipoPileta) => (t === 'hormigon' ? 'Hormigón' : 'Fibra de vidrio');

export const obraImg = (slug: string, kind: 'antes' | 'terminada' | 'detalle' | 'entorno') =>
  `/obras/${slug}-${kind}.webp`;

export function obraLead(o: Obra): string {
  const detalle =
    o.tipo === 'hormigon'
      ? 'Pileta de hormigón construida a medida en el terreno.'
      : 'Pileta de fibra de vidrio instalada sobre el pozo que hicimos nosotros.';
  return `Obra en ${o.zona}. ${detalle} El movimiento de suelo y la pileta, con un solo equipo.`;
}

export function getObra(slug: string): Obra | undefined {
  return OBRAS.find((o) => o.slug === slug);
}

export function nextObra(slug: string): Obra {
  const i = OBRAS.findIndex((o) => o.slug === slug);
  return OBRAS[(i + 1) % OBRAS.length];
}

export const MATERIALES = [
  'Arena mediana',
  'Arena lavada',
  'Arena ripiosa',
  'Ripio',
  'Enlame',
  'Base',
  'Relleno',
] as const;

export const SERVICIOS = [
  'Movimiento de suelo',
  'Zanjeos',
  'Retiro de escombros',
  'Alquiler de maquinaria',
] as const;

export type Paso = { n: string; name: string; desc: string };
export type Faq = { q: string; a: string };

export type TipoContent = {
  key: TipoPileta;
  slug: string;
  crumb: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  pasos: Paso[];
  obrasTitle: string;
  presupuestoHref: string;
  proceso: string;
  faqs: Faq[];
};

export const TIPOS: Record<TipoPileta, TipoContent> = {
  hormigon: {
    key: 'hormigon',
    slug: 'hormigon',
    crumb: 'Hormigón',
    h1: 'Piscinas de hormigón, con la forma que quieras',
    title: 'Piscinas de hormigón en Salta, construcción a medida',
    description:
      'Construimos piscinas de hormigón a medida en Salta. Excavación con equipos propios y obra completa, de la forma y medida que pida tu terreno.',
    intro:
      'La pileta de hormigón es para el que quiere la forma y la medida exactas de su terreno. Se construye en el lugar, así que no hay molde que la limite. La excavación y la construcción las hace el mismo equipo.',
    pasos: [
      { n: '1', name: 'Relevamiento del terreno', desc: 'Vamos, medimos y definimos dónde va la pileta y por dónde entra la máquina.' },
      { n: '2', name: 'Excavación con equipos propios', desc: 'Abrimos el pozo con nuestras máquinas. La misma gente que después construye.' },
      { n: '3', name: 'Estructura y hormigón', desc: 'Armadura, encofrado y hormigón, con la forma y la medida de tu terreno.' },
      { n: '4', name: 'Terminaciones', desc: 'Revestimiento, bordes y solárium según lo que elijas.' },
      { n: '5', name: 'Llenado y entrega', desc: 'Conexiones, llenado y la pileta lista para usar.' },
    ],
    obrasTitle: 'Obras de hormigón',
    presupuestoHref: '/presupuesto?tipo=hormigon',
    proceso: '/img/proceso-hormigon.webp',
    faqs: [
      {
        q: '¿Cuánto tarda la construcción de una pileta de hormigón en Salta?',
        a: 'Depende del tamaño y del terreno. Te confirmamos el plazo exacto cuando armamos el presupuesto, sin vueltas.',
      },
      {
        q: '¿Hace falta preparar el terreno antes o lo hacen ustedes?',
        a: 'Lo hacemos nosotros. Tenemos equipos propios de movimiento de suelo, así que la excavación y la pileta las hace la misma gente.',
      },
      {
        q: '¿Qué incluye el presupuesto de una pileta?',
        a: 'Te lo detallamos por escrito cuando lo armamos. Contanos dónde va la pileta y el tipo, y te pasamos el detalle.',
      },
    ],
  },
  fibra: {
    key: 'fibra',
    slug: 'fibra-de-vidrio',
    crumb: 'Fibra de vidrio',
    h1: 'Piletas de fibra, listas en menos tiempo',
    title: 'Piletas de fibra de vidrio en Salta, instalación completa',
    description:
      'Instalamos piletas de fibra de vidrio en Salta. Llegan hechas y se colocan sobre el pozo que abrimos con equipos propios, con menos días de obra.',
    intro:
      'La pileta de fibra de vidrio es para el que quiere resolverlo en menos tiempo. Llega hecha y se instala, con menos días de obra que una de hormigón. Igual, el pozo lo hacemos nosotros con equipos propios.',
    pasos: [
      { n: '1', name: 'Relevamiento del terreno', desc: 'Vamos, medimos y definimos dónde va la pileta y por dónde entra la máquina.' },
      { n: '2', name: 'Excavación con equipos propios', desc: 'Abrimos el pozo con nuestras máquinas, listo para recibir el casco.' },
      { n: '3', name: 'Colocación del casco de fibra', desc: 'Se coloca la pileta de fibra y se nivela en el pozo.' },
      { n: '4', name: 'Conexiones y terminaciones', desc: 'Bordes, solárium y las conexiones que hacen falta.' },
      { n: '5', name: 'Llenado y entrega', desc: 'Llenado y la pileta lista, en menos días que una de hormigón.' },
    ],
    obrasTitle: 'Obras de fibra',
    presupuestoHref: '/presupuesto?tipo=fibra-de-vidrio',
    proceso: '/img/proceso-fibra.webp',
    faqs: [
      {
        q: '¿Qué diferencia hay entre una pileta de hormigón y una de fibra de vidrio?',
        a: 'La de hormigón se construye a medida en el terreno y admite cualquier forma. La de fibra llega hecha y se instala en menos tiempo. La elección depende del terreno, del uso y del plazo.',
      },
      {
        q: '¿Hace falta preparar el terreno antes o lo hacen ustedes?',
        a: 'Lo hacemos nosotros. Tenemos equipos propios de movimiento de suelo, así que la excavación y la instalación las hace la misma gente.',
      },
      {
        q: '¿En qué zonas de Salta trabajan?',
        a: 'Trabajamos en Salta capital, San Lorenzo, Vaqueros y la zona sur.',
      },
    ],
  },
};

export const COMPARATIVA: { fila: string; hormigon: string; fibra: string }[] = [
  {
    fila: 'Forma y medidas',
    hormigon: 'A medida. La forma y el tamaño los define el terreno.',
    fibra: 'Modelos y medidas de fábrica, dentro de un rango.',
  },
  {
    fila: 'Plazo de obra',
    hormigon: 'Más largo, porque se construye entera en el lugar.',
    fibra: 'Más corto, llega hecha y se instala.',
  },
  {
    fila: 'Terminaciones',
    hormigon: 'Revestimiento a elección, bordes y solárium a medida.',
    fibra: 'Superficie de fábrica, con menos opciones de terminación.',
  },
  {
    fila: 'Mantenimiento',
    hormigon: 'El de una pileta de obra, según el revestimiento.',
    fibra: 'Superficie lisa, suele pedir menos mantenimiento.',
  },
];

export type LegalBlock = { h: string; p: string };

export const LEGAL: Record<'privacidad' | 'terminos', { h1: string; crumb: string; blocks: LegalBlock[] }> = {
  privacidad: {
    crumb: 'Política de privacidad',
    h1: 'Política de privacidad',
    blocks: [
      {
        h: 'Qué datos tomamos',
        p: 'Cuando pedís un presupuesto o nos escribís, tomamos solo lo que hace falta para responderte: tu nombre, tu teléfono y lo que nos cuentes de la obra. No pedimos datos que no vayamos a usar.',
      },
      {
        h: 'Para qué los usamos',
        p: 'Los usamos únicamente para contactarte y armar tu presupuesto. No los vendemos ni los cedemos a terceros.',
      },
      {
        h: 'WhatsApp',
        p: 'El presupuesto se arma como un mensaje y se envía por WhatsApp desde tu propio teléfono. Ese mensaje lo mandás vos, no queda guardado en un servidor de este sitio.',
      },
      {
        h: 'Contacto',
        p: 'Si querés que borremos tus datos o tenés una consulta sobre esto, escribinos al WhatsApp 387 572-2206.',
      },
    ],
  },
  terminos: {
    crumb: 'Términos y condiciones',
    h1: 'Términos y condiciones',
    blocks: [
      {
        h: 'Sobre este sitio',
        p: 'Este sitio muestra las obras y los servicios de Todo Áridos Salta. La información de obras publicadas es a título informativo.',
      },
      {
        h: 'Presupuestos',
        p: 'Los presupuestos se confirman por WhatsApp según cada obra. Un presupuesto no es un contrato hasta que las dos partes lo acuerden por escrito.',
      },
      {
        h: 'Precios y plazos',
        p: 'Los precios y plazos dependen de cada obra, del terreno y de los materiales, y se informan al armar el presupuesto.',
      },
      {
        h: 'Contacto',
        p: 'Ante cualquier duda, escribinos al WhatsApp 387 572-2206.',
      },
    ],
  },
};

export const LEGAL_UPDATED = 'agosto de 2026';

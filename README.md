# Todo Áridos Salta · Norte Piscinas

Sitio institucional de **Todo Áridos Salta**: construcción de piscinas de hormigón y de fibra de vidrio, venta de áridos y movimiento de suelos en Salta, Argentina.

Construido por [LCS DESING](https://lcsdesign.vercel.app/).

---

## Stack

| Pieza | Elección |
|---|---|
| Framework | Next.js 16 · App Router · React 19 |
| Lenguaje | TypeScript en modo estricto |
| Estilos | CSS propio con tokens (`app/globals.css`), sin dependencias de UI |
| Tipografías | Archivo + Inter vía `next/font` (self-hosted, sin request a Google en runtime) |
| Imágenes | `next/image` sobre WebP, con AVIF/WebP servidos según el navegador |
| Deploy | Vercel (cero configuración) |

Todas las rutas se prerenderizan como HTML estático. No hay base de datos, backend ni variables de entorno: los formularios arman un mensaje y abren WhatsApp.

## Correr en local

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # build de producción
npm start          # sirve el build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Estructura

```
app/
  layout.tsx                     header, footer, fuentes, metadata y JSON-LD
  page.tsx                       home
  piscinas/                      comparativa + [tipo] (hormigón / fibra de vidrio)
  obras/                         listado con filtros + [slug] de cada obra
  aridos-y-movimiento-de-suelos/
  clubes-e-instituciones/
  presupuesto/                   asistente de 4 pasos que termina en WhatsApp
  privacidad/  terminos/
  sitemap.ts  robots.ts  not-found.tsx
components/                      Header, Footer, ObraCard, formularios, Reveal
lib/site.ts                      única fuente de datos: obras, textos, contacto
public/
  img/                           hero, áridos, procesos, OG
  obras/                         4 fotos por obra: antes, terminada, detalle, entorno
docs/                            brief y material interno (ignorado por git)
```

## Cómo editar el contenido

Casi todo el texto y los datos viven en **`lib/site.ts`**. Para el trabajo habitual no hace falta tocar los componentes:

- **Teléfono, WhatsApp, redes** → objeto `BRAND`.
- **Agregar una obra** → sumá un item a `OBRAS` y subí sus cuatro fotos a `public/obras/` con el nombre `<slug>-antes.webp`, `<slug>-terminada.webp`, `<slug>-detalle.webp` y `<slug>-entorno.webp`. La ficha, el sitemap y los filtros se actualizan solos.
- **Medidas y plazos** → campos `medidas` y `plazo` de cada obra. Van como `A confirmar` hasta tener el dato real; no se inventan.
- **Materiales y servicios de áridos** → `MATERIALES` y `SERVICIOS`.
- **Textos de hormigón / fibra, pasos y FAQ** → `TIPOS`.
- **Legales** → `LEGAL`.

## Antes de publicar

1. **`SITE_URL`** en `lib/site.ts` apunta a `https://todoaridossalta.vercel.app`. Si el sitio sale sobre otro dominio, cambialo ahí: de ese valor salen el sitemap, los canónicos y las tarjetas de OpenGraph.
2. **Las fotos son generadas con IA** y están puestas como referencia para que el sitio se vea completo. Reemplazalas por fotos reales de las obras antes de mostrarlo como definitivo — en construcción la foto propia es lo que sostiene la credibilidad. Los nombres de archivo ya están definidos, alcanza con pisar los `.webp` de `public/obras/` y `public/img/`.
3. **Dirección y horario** figuran como "a confirmar" en el footer. Completalos cuando estén.
4. Los perfiles de Instagram y Facebook del footer salen de `BRAND`.

## Deploy en Vercel

```bash
git init && git add . && git commit -m "Sitio Todo Áridos Salta"
git remote add origin <tu-repo>
git push -u origin main
```

Después, en Vercel: **Add New → Project → importar el repo**. Framework detectado automáticamente (Next.js), sin variables de entorno ni ajustes de build.

## Notas técnicas

- **SEO**: metadata por página, canónicos, `sitemap.xml`, `robots.txt`, JSON-LD de `LocalBusiness` en el layout y de `FAQPage` en las páginas de hormigón y fibra.
- **Accesibilidad**: navegación por teclado completa, foco visible, `aria-pressed` en filtros y opciones, errores de formulario asociados al campo, link de salto al contenido y respeto por `prefers-reduced-motion`.
- **Sin JavaScript** el sitio se lee entero: las animaciones de entrada se desactivan con un `noscript`.
- **Headers de seguridad** (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) en `next.config.ts`.

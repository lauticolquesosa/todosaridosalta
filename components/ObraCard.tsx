import Image from 'next/image';
import Link from 'next/link';
import { obraImg, tipoLabel, type Obra } from '@/lib/site';

export default function ObraCard({ obra, priority = false }: { obra: Obra; priority?: boolean }) {
  return (
    <Link href={`/obras/${obra.slug}`} className="card reveal">
      <div className="card__media">
        <Image
          src={obraImg(obra.slug, 'terminada')}
          alt={`${obra.barrio}, ${tipoLabel(obra.tipo)} en ${obra.zona}`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 400px"
          priority={priority}
        />
      </div>
      <div className="card__body">
        <h3>{obra.barrio}</h3>
        <p>
          {tipoLabel(obra.tipo)} · {obra.zona}
        </p>
      </div>
    </Link>
  );
}

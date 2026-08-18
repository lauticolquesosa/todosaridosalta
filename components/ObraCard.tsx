import Image from 'next/image';
import Link from 'next/link';
import { obraImg, tipoLabel, type Obra } from '@/lib/site';

type Props = {
  obra: Obra;
  priority?: boolean;
  /** Las listas que se filtran en el cliente no animan: el observer solo corre al cambiar de ruta. */
  animate?: boolean;
};

export default function ObraCard({ obra, priority = false, animate = true }: Props) {
  return (
    <Link href={`/obras/${obra.slug}`} className={animate ? 'card reveal' : 'card'}>
      <div className="card__media">
        <Image
          src={obraImg(obra.slug, 'terminada')}
          alt={`${obra.barrio}, ${tipoLabel(obra.tipo)} en ${obra.zona}`}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 380px"
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

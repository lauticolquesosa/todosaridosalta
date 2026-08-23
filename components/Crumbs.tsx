import Link from 'next/link';
import { Fragment } from 'react';

export type Crumb = { label: string; href?: string };

export default function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Migas de pan">
      <Link href="/">Inicio</Link>
      {items.map((c) => (
        <Fragment key={c.label}>
          <span aria-hidden="true">/</span>
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}

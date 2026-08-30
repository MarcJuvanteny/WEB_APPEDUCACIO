import type { ReactNode } from "react";

export function LegalPage({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl leading-tight text-ink md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-ink-soft/70">{meta}</p>
        <div className="mt-10 flex flex-col gap-8">{children}</div>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl text-ink">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

export function LegalUl({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-1.5 pl-5 [&>li]:list-disc">{children}</ul>;
}

export function LegalTable({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-ink/10">
      <table className="w-full min-w-[420px] border-collapse text-left text-[0.85rem]">
        <thead>
          <tr className="bg-cream">
            {head.map((h) => (
              <th key={h} className="border-b border-ink/10 px-3 py-2 font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-ink/8 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top text-ink-soft">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

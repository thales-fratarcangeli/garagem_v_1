import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { withBasePath } from "@/lib/utils";

type NewsItem = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  imageSrc: string;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "Lançamentos",
    title: "Os 5 SUVs mais aguardados de 2026",
    excerpt:
      "Descubra os modelos que vão chegar ao mercado e prometem revolucionar o segmento.",
    date: "12 abr 2026",
    href: "#noticia-1",
    imageSrc: "/img/noticia1.jpg",
  },
  {
    id: 2,
    category: "Dicas",
    title: "Como avaliar o estado de um carro usado",
    excerpt:
      "Checklist completo do que verificar antes de fechar negócio em uma compra de seminovo.",
    date: "08 abr 2026",
    href: "#noticia-2",
    imageSrc: "/img/noticia2.jpg",
  },
  {
    id: 3,
    category: "Mercado",
    title: "Carros elétricos: vale a pena em 2026?",
    excerpt:
      "Análise do custo-benefício, autonomia e infraestrutura de recarga no Brasil.",
    date: "02 abr 2026",
    href: "#noticia-3",
    imageSrc: "/img/noticia3.jpg",
  },
];

export function NewsGrid() {
  return (
    <section className="bg-soft py-10 md:py-14">
      <div className="container">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-xl font-bold text-ink md:text-2xl">
            Últimas novidades
          </h2>
          <p className="text-sm text-muted">
            Notícias, dicas e tendências do mundo automotivo.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={withBasePath(item.imageSrc)}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-xs text-muted">{item.date}</span>
                </div>
                <h3 className="text-base font-semibold leading-snug text-ink group-hover:text-brand-600">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {item.excerpt}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                  Ler mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

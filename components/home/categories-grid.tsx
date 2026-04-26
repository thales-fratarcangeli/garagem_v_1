import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/utils";

type Category = {
  id: string;
  label: string;
  href: string;
  imageSrc: string;
};

const CATEGORIES: Category[] = [
  { id: "suv", label: "SUV", href: "/carros?categoria=suv", imageSrc: "/img/suv.jpg" },
  { id: "sedan", label: "Sedan", href: "/carros?categoria=sedan", imageSrc: "/img/sedan.jpg" },
  { id: "hatch", label: "Hatch", href: "/carros?categoria=hatch", imageSrc: "/img/hatch.jpg" },
  { id: "picape", label: "Picape", href: "/carros?categoria=picape", imageSrc: "/img/picape.jpg" },
  { id: "eletrico", label: "Elétrico", href: "/carros?categoria=eletrico", imageSrc: "/img/eletrico.jpg" },
  { id: "esportivo", label: "Esportivo", href: "/carros?categoria=esportivo", imageSrc: "/img/esportivo.jpg" },
];

export function CategoriesGrid() {
  return (
    <section className="container py-10 md:py-14">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl font-bold text-ink md:text-2xl">
          Encontre por tipo de carro
        </h2>
        <p className="text-sm text-muted">
          Selecione uma categoria para ver os modelos disponíveis.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-slate-100">
              <Image
                src={withBasePath(cat.imageSrc)}
                alt={`Categoria ${cat.label}`}
                fill
                sizes="64px"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-sm font-semibold text-ink group-hover:text-brand-600">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

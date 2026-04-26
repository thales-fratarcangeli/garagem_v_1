import Image from "next/image";
import Link from "next/link";
import { Calendar, Gauge, Fuel } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FUELS } from "@/lib/filter-options";
import { formatBRL, formatKm, withBasePath } from "@/lib/utils";
import type { Car } from "@/types/car";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  const fuelLabel = FUELS.find((f) => f.value === car.fuel)?.label ?? car.fuel;
  const imageSrc = withBasePath(
    Number(car.id) % 2 === 0 ? "/img/carro2.jpg" : "/img/carro1.jpg"
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
      <div className="relative">
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={imageSrc}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        {car.condition === "novo" ? (
          <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
            0 km
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute left-3 top-3">
            Seminovo
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2 text-xs text-muted">
          <span className="font-medium uppercase tracking-wide text-brand-600">
            {car.brand}
          </span>
        </div>
        <h3 className="text-base font-semibold leading-tight text-ink">
          {car.model}
        </h3>
        {car.version && (
          <p className="mt-0.5 line-clamp-1 text-xs text-muted">{car.version}</p>
        )}

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
          <li className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {car.year}
          </li>
          <li className="inline-flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {formatKm(car.km)}
          </li>
          <li className="inline-flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {fuelLabel}
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <span className="block text-xs text-muted">A partir de</span>
            <span className="text-xl font-bold text-brand-600">
              {formatBRL(car.price)}
            </span>
          </div>
          <Button asChild size="sm">
            <Link href={`#carro-${car.id}`}>Ver detalhes</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

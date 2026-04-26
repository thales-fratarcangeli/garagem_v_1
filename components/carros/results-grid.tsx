import { SearchX } from "lucide-react";

import { CarCard } from "./car-card";
import type { Car } from "@/types/car";

type ResultsGridProps = {
  cars: Car[];
};

export function ResultsGrid({ cars }: ResultsGridProps) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-soft p-10 text-center">
        <SearchX className="h-10 w-10 text-slate-400" />
        <h3 className="mt-3 text-base font-semibold text-ink">
          Nenhum carro encontrado
        </h3>
        <p className="mt-1 max-w-sm text-sm text-muted">
          Tente ajustar os filtros para ampliar a sua busca.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

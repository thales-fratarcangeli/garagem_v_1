"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersPanel } from "@/components/carros/filters-panel";
import { FiltersDrawer } from "@/components/carros/filters-drawer";
import { ResultsGrid } from "@/components/carros/results-grid";
import {
  type CarFilters,
  type SortOption,
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  applyFilters,
  sortCars,
} from "@/lib/car-filters";
import { MOCK_CARS } from "@/lib/mock-cars";

export default function CarrosPage() {
  const [filters, setFilters] = React.useState<CarFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortOption>("relevancia");

  const filtered = React.useMemo(
    () => sortCars(applyFilters(MOCK_CARS, filters), sort),
    [filters, sort]
  );

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-ink md:text-3xl">
          Encontre seu carro
        </h1>
        <p className="text-sm text-muted">
          Use os filtros para refinar sua busca entre {MOCK_CARS.length} veículos disponíveis.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-slate-200 bg-white scrollbar-thin">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-sm font-semibold text-ink">Filtros</h2>
            </div>
            <FiltersPanel filters={filters} onChange={setFilters} />
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <FiltersDrawer
                  filters={filters}
                  onChange={setFilters}
                  resultCount={filtered.length}
                />
              </div>
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "carro encontrado" : "carros encontrados"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted sm:block">Ordenar:</span>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ResultsGrid cars={filtered} />
        </div>
      </div>
    </div>
  );
}

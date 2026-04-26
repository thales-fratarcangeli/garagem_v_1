"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  type CarFilters,
  countActiveFilters,
} from "@/lib/car-filters";

import { FiltersPanel } from "./filters-panel";

type FiltersDrawerProps = {
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
  resultCount: number;
};

export function FiltersDrawer({
  filters,
  onChange,
  resultCount,
}: FiltersDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const active = countActiveFilters(filters);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {active > 0 && (
            <Badge className="ml-1 h-5 min-w-5 px-1.5">{active}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[88%] max-w-sm flex-col p-0"
      >
        <SheetHeader className="px-4">
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <FiltersPanel filters={filters} onChange={onChange} />
        </div>
        <div className="border-t border-slate-200 bg-white p-4">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Ver {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

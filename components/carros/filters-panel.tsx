"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  BRANDS,
  COLORS,
  CONDITIONS,
  DOORS_OPTIONS,
  FEATURES,
  FUELS,
  KM_RANGE,
  MAX_YEAR,
  MIN_YEAR,
  PLATE_ENDS,
  PRICE_RANGE,
} from "@/lib/filter-options";
import {
  type CarFilters,
  DEFAULT_FILTERS,
} from "@/lib/car-filters";
import { cn, formatBRL } from "@/lib/utils";

type FiltersPanelProps = {
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
  className?: string;
};

export function FiltersPanel({
  filters,
  onChange,
  className,
}: FiltersPanelProps) {
  const update = <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleArrayValue = <T,>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const reset = () => onChange(DEFAULT_FILTERS);

  const yearOptions = React.useMemo(() => {
    const arr: number[] = [];
    for (let y = MAX_YEAR; y >= MIN_YEAR; y--) arr.push(y);
    return arr;
  }, []);

  return (
    <aside className={cn("flex flex-col bg-white", className)}>
      <Accordion
        type="multiple"
        defaultValue={["condicao", "marca", "preco"]}
        className="px-4"
      >
        <AccordionItem value="condicao">
          <AccordionTrigger>Condição</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {CONDITIONS.map((c) => (
                <li key={c.value}>
                  <Label
                    checked={filters.conditions.includes(c.value)}
                    onChange={() =>
                      update(
                        "conditions",
                        toggleArrayValue(filters.conditions, c.value)
                      )
                    }
                  >
                    {c.label}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="marca">
          <AccordionTrigger>Marca</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-1 gap-2">
              {BRANDS.map((brand) => (
                <li key={brand}>
                  <Label
                    checked={filters.brands.includes(brand)}
                    onChange={() =>
                      update(
                        "brands",
                        toggleArrayValue(filters.brands, brand)
                      )
                    }
                  >
                    {brand}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ano">
          <AccordionTrigger>Ano</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="mb-1 block text-xs text-muted">De</span>
                <Select
                  value={String(filters.yearMin)}
                  onValueChange={(v) => update("yearMin", Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <span className="mb-1 block text-xs text-muted">Até</span>
                <Select
                  value={String(filters.yearMax)}
                  onValueChange={(v) => update("yearMax", Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="preco">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Slider
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                step={PRICE_RANGE.step}
                value={[filters.priceMin, filters.priceMax]}
                onValueChange={([min, max]) => {
                  onChange({
                    ...filters,
                    priceMin: min,
                    priceMax: max,
                  });
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="mb-1 block text-xs text-muted">Mínimo</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={filters.priceMin}
                    min={PRICE_RANGE.min}
                    max={filters.priceMax}
                    step={PRICE_RANGE.step}
                    onChange={(e) =>
                      update(
                        "priceMin",
                        clamp(
                          Number(e.target.value),
                          PRICE_RANGE.min,
                          filters.priceMax
                        )
                      )
                    }
                  />
                </div>
                <div>
                  <span className="mb-1 block text-xs text-muted">Máximo</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={filters.priceMax}
                    min={filters.priceMin}
                    max={PRICE_RANGE.max}
                    step={PRICE_RANGE.step}
                    onChange={(e) =>
                      update(
                        "priceMax",
                        clamp(
                          Number(e.target.value),
                          filters.priceMin,
                          PRICE_RANGE.max
                        )
                      )
                    }
                  />
                </div>
              </div>
              <p className="text-xs text-muted">
                {formatBRL(filters.priceMin)} — {formatBRL(filters.priceMax)}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="km">
          <AccordionTrigger>Quilometragem</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Slider
                min={KM_RANGE.min}
                max={KM_RANGE.max}
                step={KM_RANGE.step}
                value={[filters.kmMin, filters.kmMax]}
                onValueChange={([min, max]) => {
                  onChange({ ...filters, kmMin: min, kmMax: max });
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="mb-1 block text-xs text-muted">Mínimo</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={filters.kmMin}
                    min={KM_RANGE.min}
                    max={filters.kmMax}
                    step={KM_RANGE.step}
                    onChange={(e) =>
                      update(
                        "kmMin",
                        clamp(
                          Number(e.target.value),
                          KM_RANGE.min,
                          filters.kmMax
                        )
                      )
                    }
                  />
                </div>
                <div>
                  <span className="mb-1 block text-xs text-muted">Máximo</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={filters.kmMax}
                    min={filters.kmMin}
                    max={KM_RANGE.max}
                    step={KM_RANGE.step}
                    onChange={(e) =>
                      update(
                        "kmMax",
                        clamp(
                          Number(e.target.value),
                          filters.kmMin,
                          KM_RANGE.max
                        )
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="itens">
          <AccordionTrigger>Itens</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-1 gap-2">
              {FEATURES.map((feat) => (
                <li key={feat.value}>
                  <Label
                    checked={filters.features.includes(feat.value)}
                    onChange={() =>
                      update(
                        "features",
                        toggleArrayValue(filters.features, feat.value)
                      )
                    }
                  >
                    {feat.label}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cor">
          <AccordionTrigger>Cor</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => {
                const active = filters.colors.includes(c.value);
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() =>
                      update("colors", toggleArrayValue(filters.colors, c.value))
                    }
                    aria-pressed={active}
                    title={c.label}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-slate-200 bg-white text-ink hover:border-slate-300"
                    )}
                  >
                    <span
                      className="inline-block h-4 w-4 rounded-full border border-slate-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="portas">
          <AccordionTrigger>Portas</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {DOORS_OPTIONS.map((d) => {
                const active = filters.doors.includes(d.value);
                return (
                  <Chip
                    key={d.value}
                    active={active}
                    onClick={() =>
                      update("doors", toggleArrayValue(filters.doors, d.value))
                    }
                  >
                    {d.label}
                  </Chip>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="placa">
          <AccordionTrigger>Final da placa</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {PLATE_ENDS.map((n) => {
                const active = filters.plateEnds.includes(n);
                return (
                  <Chip
                    key={n}
                    active={active}
                    onClick={() =>
                      update(
                        "plateEnds",
                        toggleArrayValue(filters.plateEnds, n)
                      )
                    }
                    className="w-10 justify-center"
                  >
                    {n}
                  </Chip>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="combustivel">
          <AccordionTrigger>Combustível</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {FUELS.map((f) => (
                <li key={f.value}>
                  <Label
                    checked={filters.fuels.includes(f.value)}
                    onChange={() =>
                      update("fuels", toggleArrayValue(filters.fuels, f.value))
                    }
                  >
                    {f.label}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="sticky bottom-0 mt-2 border-t border-slate-200 bg-white p-4">
        <Button variant="outline" className="w-full" onClick={reset}>
          Limpar filtros
        </Button>
      </div>
    </aside>
  );
}

function Label({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-ink hover:text-brand-700">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span>{children}</span>
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-brand-500 bg-brand-50 text-brand-700"
          : "border-slate-200 bg-white text-ink hover:border-slate-300",
        className
      )}
    >
      {children}
    </button>
  );
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

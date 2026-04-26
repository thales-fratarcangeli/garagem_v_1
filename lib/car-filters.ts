import type {
  Car,
  CarColor,
  CarCondition,
  CarFeature,
  CarFuel,
} from "@/types/car";
import { KM_RANGE, MAX_YEAR, MIN_YEAR, PRICE_RANGE } from "@/lib/filter-options";

export type CarFilters = {
  conditions: CarCondition[];
  brands: string[];
  yearMin: number;
  yearMax: number;
  priceMin: number;
  priceMax: number;
  kmMin: number;
  kmMax: number;
  features: CarFeature[];
  colors: CarColor[];
  doors: (2 | 4)[];
  plateEnds: number[];
  fuels: CarFuel[];
};

export const DEFAULT_FILTERS: CarFilters = {
  conditions: [],
  brands: [],
  yearMin: MIN_YEAR,
  yearMax: MAX_YEAR,
  priceMin: PRICE_RANGE.min,
  priceMax: PRICE_RANGE.max,
  kmMin: KM_RANGE.min,
  kmMax: KM_RANGE.max,
  features: [],
  colors: [],
  doors: [],
  plateEnds: [],
  fuels: [],
};

export type SortOption =
  | "relevancia"
  | "menor-preco"
  | "maior-preco"
  | "menor-km"
  | "mais-novo";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "menor-km", label: "Menor quilometragem" },
  { value: "mais-novo", label: "Mais novos" },
];

export function applyFilters(cars: Car[], filters: CarFilters): Car[] {
  return cars.filter((car) => {
    if (filters.conditions.length && !filters.conditions.includes(car.condition))
      return false;
    if (filters.brands.length && !filters.brands.includes(car.brand))
      return false;
    if (car.year < filters.yearMin || car.year > filters.yearMax) return false;
    if (car.price < filters.priceMin || car.price > filters.priceMax)
      return false;
    if (car.km < filters.kmMin || car.km > filters.kmMax) return false;
    if (filters.fuels.length && !filters.fuels.includes(car.fuel)) return false;
    if (filters.colors.length && !filters.colors.includes(car.color))
      return false;
    if (filters.doors.length && !filters.doors.includes(car.doors)) return false;
    if (filters.plateEnds.length && !filters.plateEnds.includes(car.plateEnd))
      return false;
    if (filters.features.length) {
      const hasAll = filters.features.every((f) => car.features.includes(f));
      if (!hasAll) return false;
    }
    return true;
  });
}

export function sortCars(cars: Car[], sort: SortOption): Car[] {
  const list = [...cars];
  switch (sort) {
    case "menor-preco":
      return list.sort((a, b) => a.price - b.price);
    case "maior-preco":
      return list.sort((a, b) => b.price - a.price);
    case "menor-km":
      return list.sort((a, b) => a.km - b.km);
    case "mais-novo":
      return list.sort((a, b) => b.year - a.year);
    default:
      return list;
  }
}

export function countActiveFilters(filters: CarFilters): number {
  let n = 0;
  n += filters.conditions.length;
  n += filters.brands.length;
  n += filters.fuels.length;
  n += filters.colors.length;
  n += filters.doors.length;
  n += filters.plateEnds.length;
  n += filters.features.length;
  if (filters.yearMin !== MIN_YEAR || filters.yearMax !== MAX_YEAR) n += 1;
  if (
    filters.priceMin !== PRICE_RANGE.min ||
    filters.priceMax !== PRICE_RANGE.max
  )
    n += 1;
  if (filters.kmMin !== KM_RANGE.min || filters.kmMax !== KM_RANGE.max) n += 1;
  return n;
}

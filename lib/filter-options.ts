import type {
  CarColor,
  CarCondition,
  CarFeature,
  CarFuel,
} from "@/types/car";

export const BRANDS: string[] = [
  "Chevrolet",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Renault",
  "Toyota",
  "Volkswagen",
];

export const CONDITIONS: { value: CarCondition; label: string }[] = [
  { value: "novo", label: "Novo" },
  { value: "usado", label: "Usado" },
];

export const FUELS: { value: CarFuel; label: string }[] = [
  { value: "flex", label: "Flex" },
  { value: "gasolina", label: "Gasolina" },
  { value: "diesel", label: "Diesel" },
  { value: "hibrido", label: "Híbrido" },
  { value: "eletrico", label: "Elétrico" },
];

export const COLORS: { value: CarColor; label: string; hex: string }[] = [
  { value: "preto", label: "Preto", hex: "#0f172a" },
  { value: "branco", label: "Branco", hex: "#f8fafc" },
  { value: "prata", label: "Prata", hex: "#cbd5e1" },
  { value: "cinza", label: "Cinza", hex: "#64748b" },
  { value: "vermelho", label: "Vermelho", hex: "#dc2626" },
  { value: "azul", label: "Azul", hex: "#2563eb" },
  { value: "verde", label: "Verde", hex: "#16a34a" },
  { value: "amarelo", label: "Amarelo", hex: "#eab308" },
];

export const FEATURES: { value: CarFeature; label: string }[] = [
  { value: "ar-condicionado", label: "Ar-condicionado" },
  { value: "direcao-eletrica", label: "Direção elétrica" },
  { value: "cambio-automatico", label: "Câmbio automático" },
  { value: "airbag", label: "Airbag" },
  { value: "abs", label: "ABS" },
  { value: "multimidia", label: "Multimídia" },
  { value: "sensor-re", label: "Sensor de ré" },
  { value: "camera-re", label: "Câmera de ré" },
  { value: "vidros-eletricos", label: "Vidros elétricos" },
];

export const DOORS_OPTIONS: { value: 2 | 4; label: string }[] = [
  { value: 2, label: "2 portas" },
  { value: 4, label: "4 portas" },
];

export const PLATE_ENDS = Array.from({ length: 10 }, (_, i) => i);

export const MIN_YEAR = 1990;
export const MAX_YEAR = new Date().getFullYear() + 1;

export const PRICE_RANGE = { min: 0, max: 500_000, step: 5_000 };
export const KM_RANGE = { min: 0, max: 250_000, step: 1_000 };

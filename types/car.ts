export type CarCondition = "novo" | "usado";

export type CarFuel =
  | "flex"
  | "gasolina"
  | "diesel"
  | "hibrido"
  | "eletrico";

export type CarColor =
  | "preto"
  | "branco"
  | "prata"
  | "cinza"
  | "vermelho"
  | "azul"
  | "verde"
  | "amarelo";

export type CarFeature =
  | "ar-condicionado"
  | "direcao-eletrica"
  | "cambio-automatico"
  | "airbag"
  | "abs"
  | "multimidia"
  | "sensor-re"
  | "camera-re"
  | "vidros-eletricos";

export type Car = {
  id: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  price: number;
  km: number;
  condition: CarCondition;
  fuel: CarFuel;
  color: CarColor;
  doors: 2 | 4;
  plateEnd: number;
  features: CarFeature[];
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Caminhos em `public/` (ex: `/img/x.jpg`) precisam do prefixo quando
 * `NEXT_PUBLIC_BASE_PATH` está definida (ex: GitHub Pages em subpasta).
 */
export function withBasePath(path: string) {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!raw) return p;
  const segment = `/${raw.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  return `${segment}${p}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value) + " km";
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToStringDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

export const formatCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, 14);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};


export const toArray = <T>(val?: T[] | T): T[] => {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
};

export function slugify(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_")
}
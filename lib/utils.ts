import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { readFile, writeFile } from "fs/promises";

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

export const getFileJSONToArray = async <T>(
  path: string
): Promise<T[]> => {
  const file = await readFile(path, 'utf-8');

  return JSON.parse(file) as T[];
};

export const saveArrayToJSON = async <T>(path: string, data:T[]) => {
  await writeFile(path, JSON.stringify(data));
}

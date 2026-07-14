import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToStringDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR')
}
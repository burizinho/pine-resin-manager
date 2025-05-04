
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formata a data para o formato brasileiro (DD/MM/YYYY)
export function formatDate(date: string | Date): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
}

// Calcula a idade em anos a partir de uma data
export function calculateAge(date: string | Date): number {
  if (!date) return 0;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
}

// Gera uma cor baseada em uma string (para uso em avatares/ícones)
export function stringToColor(str: string): string {
  if (!str) return '#000000';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

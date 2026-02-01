import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const pastDate = new Date(date);
  const diffMs = now.getTime() - pastDate.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "agora";
  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 30) return `${diffDays}d atrás`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mês${diffMonths > 1 ? 'es' : ''} atrás`;
  
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}ano${diffYears > 1 ? 's' : ''} atrás`;
}

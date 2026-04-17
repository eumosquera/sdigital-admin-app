/**
 * Formatea fecha para mostrar en UI
 * Ej: 04 jul 2026
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formatea fecha para guardar en base de datos
 * Ej: 2026-07-04
 */
export function formatDateToSave(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Calcula cuantos días faltan para una fecha
 */
export function daysLeft(dateString?: string): number {
  if (!dateString) return 0;

  const today = new Date();
  const target = new Date(dateString);

  const diff = Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return diff;
}

/**
 * Determina si una cuenta está vencida
 */
export function isExpired(dateString?: string): boolean {
  if (!dateString) return false;

  return daysLeft(dateString) < 0;
}

/**
 * Determina si una cuenta está por vencer
 * por defecto 3 días
 */
export function isExpiringSoon(dateString?: string, days: number = 3): boolean {
  if (!dateString) return false;

  const diff = daysLeft(dateString);

  return diff >= 0 && diff <= days;
}

/**
 * Texto amigable para mostrar en UI
 */
export function getExpirationText(dateString?: string): string {
  if (!dateString) return "";

  const diff = daysLeft(dateString);

  if (diff < 0) return "Vencida";

  if (diff === 0) return "Vence hoy";

  if (diff === 1) return "Vence mañana";

  return `Faltan ${diff} días`;
}

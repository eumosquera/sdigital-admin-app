export function getCuentaStatus(cuenta: any) {

  const hoy = new Date();
  const vence = new Date(cuenta.fechaVencimiento);

  const diff = Math.ceil(
    (vence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) {
    return { label: "VENCIDA", color: "#f97316" };
  }

  if (cuenta.stock === 0) {
    return { label: "AGOTADA", color: "#ef4444" };
  }

  if (diff <= 3) {
    return { label: "POR VENCER", color: "#f59e0b" };
  }

  return { label: "DISPONIBLE", color: "#22c55e" };
}
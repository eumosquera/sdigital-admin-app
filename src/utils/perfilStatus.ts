export function getPerfilStatus(estado: string) {
  switch (estado) {
    case "en_soporte":
      return {
        label: "En soporte",
        color: "#a855f7",
      };

    case "libre":
      return {
        label: "Libre",
        color: "#22c55e",
      };

    case "vendido":
      return {
        label: "Vendido",
        color: "#ef4444",
      };

    case "renovado":
      return {
        label: "Renovado",
        color: "#3b82f6",
      };

    case "vencido":
      return {
        label: "Vencido",
        color: "#f97316",
      };

    default:
      return {
        label: "Desconocido",
        color: "#6b7280",
      };
  }
}

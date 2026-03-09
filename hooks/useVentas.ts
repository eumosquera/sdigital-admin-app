import { useQuery } from "@tanstack/react-query";
import { getVentas } from "../src/services/ventas.service";

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"],
    queryFn: getVentas,
  });
};
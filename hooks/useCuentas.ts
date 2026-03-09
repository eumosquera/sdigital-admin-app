import { useQuery } from "@tanstack/react-query";
import { getCuentas } from "../src/services/cuentas.service";

export const useCuentas = () => {
  return useQuery({
    queryKey: ["cuentas"],
    queryFn: getCuentas,
  });
};
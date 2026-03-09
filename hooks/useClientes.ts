import { useQuery } from "@tanstack/react-query";
import { getClientes } from "../src/services/clientes.service";

export const useClientes = () => {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });
};
import { useQuery } from "@tanstack/react-query";
import { api } from "@/src/api/axios";

export const useCuenta = (id?: string | string[]) => {

  return useQuery({

    queryKey: ["cuenta", id],

    queryFn: async () => {

      if (!id) return null;

      const { data } = await api.get(`/cuentas/${id}`);

      return data;

    },

    enabled: !!id, 

  });

};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { api } from "@/src/api/axios";

export const useRenovarCuenta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cuentaId,
      dias,
      precioCompra,
    }: {
      cuentaId: string;
      dias: number;
      precioCompra: number;
    }) => {
      const res = await api.post(`/cuentas/${cuentaId}/renovar`, {
        dias,
        precioCompra,
      });

      return res.data;
    },

    onSuccess: (_, variables) => {
      Toast.show({
        type: "success",
        text1: "Cuenta renovada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: ["cuentas"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cuenta", variables.cuentaId],
      });
    },
  });
};
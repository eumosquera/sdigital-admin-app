import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { api } from "@/src/api/axios";

export const useDeleteCuenta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cuentaId: string) => {
      const res = await api.delete(`/cuentas/${cuentaId}`);
      return res.data;
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Cuenta eliminada correctamente",
      });

      queryClient.invalidateQueries({
        queryKey: ["cuentas"],
      });
    },
  });
};
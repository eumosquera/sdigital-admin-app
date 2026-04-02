import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message"

import { api } from "@/src/api/axios";

export const useCreatePerfil = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async ({
      cuentaId,
      perfil,
    }: {
      cuentaId: string;
      perfil: {
        perfil: string;
        pin: string;
        estado: string;
      };
    }) => {

      const res = await api.post(
        `/cuentas/${cuentaId}/detalles`,
        perfil
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
      Toast.show({ type: "success", text1: "Perfil creado correctamente." });

      queryClient.invalidateQueries({
        queryKey: ["cuenta", variables.cuentaId],
      });
    },

  });
};
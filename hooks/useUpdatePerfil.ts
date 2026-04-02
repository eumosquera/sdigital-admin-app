import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/api/axios";
import Toast from "react-native-toast-message";

export const useUpdatePerfil = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async ({
      cuentaId,
      perfilId,
      perfil,
    }: {
      cuentaId: string;
      perfilId: string;
      perfil: {
        perfil: string;
        pin: string;
        estado: string;
      };
    }) => {

      const res = await api.put(
        `/cuentas/${cuentaId}/detalles/${perfilId}`,
        perfil
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
            Toast.show({ type: "success", text1: "Perfil actualizado." });
      queryClient.invalidateQueries({
        queryKey: ["cuenta", variables.cuentaId],
      });
    },

  });
};
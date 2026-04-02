import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { api } from "@/src/api/axios";

export const useDeletePerfil = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async ({
      cuentaId,
      perfilId,
    }: {
      cuentaId: string;
      perfilId: string;
    }) => {

      const res = await api.delete(
        `/cuentas/${cuentaId}/detalles/${perfilId}`
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
      Toast.show({ type: "success", text1: "Perfil eliminado." });
      queryClient.invalidateQueries({
        queryKey: ["cuenta", variables.cuentaId],
      });
    },

  });
};
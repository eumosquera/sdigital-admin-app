import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlataforma } from "../src/services/plataformas.service";
import Toast from "react-native-toast-message";

export const useDeletePlataforma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlataforma,

    onSuccess: () => {
      Toast.show({ type: "success", text1: "Plataforma eliminada" });
      queryClient.invalidateQueries({
        queryKey: ["Plataformas"],
      });
    },
  });
};

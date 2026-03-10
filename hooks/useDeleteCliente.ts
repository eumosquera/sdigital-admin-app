import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCliente } from "../src/services/clientes.service";
import Toast from "react-native-toast-message"

export const useDeleteCliente = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCliente,

    onSuccess: () => {
      Toast.show({type: "success",
        text1: "Cliente eliminado"
      })
      queryClient.invalidateQueries({
        queryKey: ["clientes"]
      });
    }
  });

};
import { useQuery } from "@tanstack/react-query";
import { getPlataformas } from "../src/services/plataformas.service";

export const usePlataformas = () => {
  return useQuery({
    queryKey: ["plataformas"],
    queryFn: getPlataformas,
  });
};
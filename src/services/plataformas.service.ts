import { api } from "../api/axios";

export const getPlataformas = async () => {
  const { data } = await api.get("/plataformas");
  return data;
};
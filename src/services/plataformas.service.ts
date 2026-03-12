import { api } from "../api/axios";

export const getPlataformas = async () => {
  const { data } = await api.get("/plataformas");
  return data;
};

export const createPlataforma = async (plataforma: any) => {
  const { data } = await api.post("/plataformas", plataforma);
  return data;
};

export const updatePlataforma = async (id: string, plataforma: any) => {
  const { data } = await api.put(`/plataformas/${id}`, plataforma);
  return data;
};

export const deletePlataforma = async (id: string) => {
  const { data } = await api.delete(`/plataformas/${id}`);
  return data;
};

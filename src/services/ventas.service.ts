import { api } from "../api/axios";

export const getVentas = async () => {
  const { data } = await api.get("/ventas");
  return data;
};
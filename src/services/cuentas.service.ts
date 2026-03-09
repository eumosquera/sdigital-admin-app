import { api } from "../api/axios";

export const getCuentas = async () => {
  const { data } = await api.get("/cuentas");
  return data;
};
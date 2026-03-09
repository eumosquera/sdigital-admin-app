import { api } from "../api/axios";

export const getClientes = async () => {
  const { data } = await api.get("/clientes");
  return data;
};
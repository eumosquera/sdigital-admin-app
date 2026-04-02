import { api } from "../api/axios";

export const getCuentas = async () => {
  const { data } = await api.get("/cuentas");
  return data;
};

export const createCuenta = async (cuenta: any) => {
  const { data } = await api.post("/cuentas", cuenta);
  return data;
};

export const updateCuenta = async (id: string, cuenta: any) => {
  const { data } = await api.put(`/cuentas/${id}`, cuenta);
  return data;
};

export const deleteCuenta = async (id: string) => {
  const { data } = await api.delete(`/cuentas/${id}`);
  return data;
};
import { api } from "../api/axios";

export const getClientes = async () => {
  const { data } = await api.get("/clientes");
  return data;
};

export const createCliente = async (cliente:any) => {
  const { data } = await api.post("/clientes", cliente);
  return data;
};

export const updateCliente = async (id:string, cliente:any) => {
  const { data } = await api.put(`/clientes/${id}`, cliente);
  return data;
};

export const deleteCliente = async (id:string) => {
  const { data } = await api.delete(`/clientes/${id}`);
  return data;
};
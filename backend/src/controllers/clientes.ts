import { ClienteModel } from '../models/cliente'

export const getClientes = () => ClienteModel.getAll()
export const getClienteById = (id: number) => ClienteModel.getById(id)
export const createCliente = (data: Parameters<typeof ClienteModel.create>[0]) => ClienteModel.create(data)
export const updateCliente = (id: number, data: Parameters<typeof ClienteModel.update>[1]) => ClienteModel.update(id, data)
export const deleteCliente = (id: number) => ClienteModel.delete(id)

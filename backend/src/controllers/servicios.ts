import { ServicioModel } from '../models/servicio'
import type { Servicio } from '../types'

export const getServicios = async () => {
  return await ServicioModel.getAll()
}

export const getServicioById = async (id: number) => {
  return await ServicioModel.getById(id)
}

export const createServicio = async (data: Servicio) => {
  return await ServicioModel.create(data)
}

export const updateServicio = async (id: number, data: Partial<Servicio>) => {
  return await ServicioModel.update(id, data)
}

export const deleteServicio = async (id: number) => {
  return await ServicioModel.delete(id)
}
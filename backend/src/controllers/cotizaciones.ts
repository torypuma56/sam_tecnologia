import { CotizacionModel } from '../models/cotizacion'
import type { Cotizacion } from '../types'

export const getCotizaciones = async () => {
  return await CotizacionModel.getAll()
}

export const getCotizacionById = async (id: number) => {
  return await CotizacionModel.getById(id)
}

export const createCotizacion = async (data: Cotizacion) => {
  return await CotizacionModel.create(data)
}

export const updateEstadoCotizacion = async (id: number, estado: string) => {
  return await CotizacionModel.updateEstado(id, estado)
}

export const deleteCotizacion = async (id: number) => {
  return await CotizacionModel.delete(id)
}
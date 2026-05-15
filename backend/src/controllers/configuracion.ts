import { ConfiguracionModel } from '../models/configuracion'
import type { Configuracion } from '../types'

export const getConfiguracion = async () => {
  return await ConfiguracionModel.get()
}

export const updateConfiguracion = async (data: Partial<Configuracion>) => {
  return await ConfiguracionModel.update(data)
}
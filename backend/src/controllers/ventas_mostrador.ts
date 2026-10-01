import { VentaMostradorModel } from '../models/venta_mostrador'

export const getVentasMostrador = () => VentaMostradorModel.getAll()
export const getVentaMostradorById = (id: number) => VentaMostradorModel.getById(id)
export const createVentaMostrador = (data: Parameters<typeof VentaMostradorModel.create>[0]) => VentaMostradorModel.create(data)
export const deleteVentaMostrador = (id: number) => VentaMostradorModel.delete(id)

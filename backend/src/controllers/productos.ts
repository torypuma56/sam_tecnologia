import { ProductoModel } from '../models/producto'
import type { Producto } from '../types'

export const getProductos = async () => {
  return await ProductoModel.getAll()
}

export const getProductosNuevos = async () => {
  return await ProductoModel.getNuevos()
}

export const getProductoById = async (id: number) => {
  return await ProductoModel.getById(id)
}

export const createProducto = async (data: Producto) => {
  return await ProductoModel.create(data)
}

export const updateProducto = async (id: number, data: Partial<Producto>) => {
  return await ProductoModel.update(id, data)
}

export const deleteProducto = async (id: number) => {
  return await ProductoModel.delete(id)
}
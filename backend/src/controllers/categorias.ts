import { CategoriaModel } from '../models/categoria'

export const getCategorias = async () => {
  return await CategoriaModel.getAll()
}

export const getCategoriaById = async (id: number) => {
  return await CategoriaModel.getById(id)
}

export const createCategoria = async (nombre: string) => {
  return await CategoriaModel.create(nombre)
}

export const updateCategoria = async (id: number, nombre: string) => {
  return await CategoriaModel.update(id, nombre)
}

export const deleteCategoria = async (id: number) => {
  return await CategoriaModel.delete(id)
}
import { PedidoModel } from '../models/pedido'
import type { Pedido } from '../types'

export const getPedidos = async () => {
  return await PedidoModel.getAll()
}

export const getPedidoById = async (id: number) => {
  return await PedidoModel.getById(id)
}

export const createPedido = async (data: Pedido) => {
  return await PedidoModel.create(data)
}

export const updateEstadoPedido = async (id: number, estado: string) => {
  return await PedidoModel.updateEstado(id, estado)
}

export const deletePedido = async (id: number) => {
  return await PedidoModel.delete(id)
}
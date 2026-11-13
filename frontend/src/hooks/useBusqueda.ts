import { useContext } from 'react'
import { BusquedaContext } from '../context/busquedaStore'

export function useBusqueda() {
  const context = useContext(BusquedaContext)
  if (!context) throw new Error('useBusqueda debe usarse dentro de BusquedaProvider')
  return context
}

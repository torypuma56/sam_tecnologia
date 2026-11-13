import { useState } from 'react'
import type { ReactNode } from 'react'
import { BusquedaContext } from './busquedaStore'

export function BusquedaProvider({ children }: { children: ReactNode }) {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null)

  return (
    <BusquedaContext.Provider value={{
      busqueda,
      setBusqueda,
      categoriaSeleccionada,
      setCategoriaSeleccionada
    }}>
      {children}
    </BusquedaContext.Provider>
  )
}

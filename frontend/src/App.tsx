import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/carritoContext'
import { BusquedaProvider } from './context/busquedaContext'
import Home from './pages/home'
import Login from './admin/login'
import Dashboard from './admin/dashboard'
import Privacidad from './pages/privacidad'

function App() {
  return (
    <CarritoProvider>
      <BusquedaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/privacidad" element={<Privacidad />} />
          </Routes>
        </BrowserRouter>
      </BusquedaProvider>
    </CarritoProvider>
  )
}

export default App
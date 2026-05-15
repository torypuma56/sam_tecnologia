import Navbar from '../components/navbar/navbar'
import Hero from '../components/hero/hero'
import Servicios from '../components/servicios/servicios'
import Productos from '../components/productos/productos'
import Cotizacion from '../components/cotizacion/cotizacion'
import Contacto from '../components/contacto/contacto'
import Footer from '../components/footer/footer'
import Carrito from '../components/carrito/carrito'
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Servicios />
      <Productos />
      <Cotizacion />
      <Contacto />
      <Footer />
      <Carrito />
    </div>
  )
}

export default Home
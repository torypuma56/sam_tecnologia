import { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Hero from "../components/hero/hero";
import Servicios from "../components/servicios/servicios";
import Productos from "../components/productos/productos";
import Cotizacion from "../components/cotizacion/cotizacion";
import FormularioCotizacion from "../components/formularioCotizacion/formularioCotizacion";
import Contacto from "../components/contacto/contacto";
import Footer from "../components/footer/footer";
import Carrito from "../components/carrito/carrito";
import WhatsappFlotante from "../components/whatsapp/whatsapp";
import styles from "./home.module.css";

function Home() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  return (
    <div>
      <Navbar onAbrirCarrito={() => setCarritoAbierto(true)} />
      <Hero />
      <Servicios />
      <Productos />
      <Cotizacion />
      <FormularioCotizacion />
      <Contacto />
      <Footer />
      <Carrito
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
      />
      <WhatsappFlotante />

      {/* Botón flotante carrito solo en móvil */}
      <button
        className={styles.carritoFlotante}
        onClick={() => setCarritoAbierto(true)}
      >
        <img src="/icon/carrito.gif" alt="Carrito" className={styles.iconoCarritoFlotante} />
        {/* badge */}
      </button>
    </div>
  );
}

export default Home;

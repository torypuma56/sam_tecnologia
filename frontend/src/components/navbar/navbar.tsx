import { useState, useEffect } from "react";
import { useCarrito } from "../../hooks/useCarrito";
import { useBusqueda } from "../../hooks/useBusqueda";
import { API } from "../../config/api";
import styles from "./navbar.module.css";

type Categoria = {
  id: number;
  nombre: string;
};

type NavbarProps = {
  onAbrirCarrito: () => void;
};

function Navbar({ onAbrirCarrito }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [temaOscuro, setTemaOscuro] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [inputBusqueda, setInputBusqueda] = useState("");
  const { setBusqueda, setCategoriaSeleccionada } = useBusqueda();
  const { totalItems } = useCarrito();

  useEffect(() => {
    fetch(`${API}/categorias`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategorias(data.data);
      })
      .catch(() => {});
  }, []);

  const toggleTema = () => {
    setTemaOscuro(!temaOscuro);
    document.documentElement.setAttribute(
      "data-theme",
      temaOscuro ? "light" : "dark",
    );
  };

  const irAProductos = () => {
    document
      .getElementById("productos")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBusqueda = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputBusqueda.trim()) {
      setBusqueda(inputBusqueda);
      setCategoriaSeleccionada(null);
      irAProductos();
    }
  };

  const handleCategoria = (id: number) => {
    setCategoriaSeleccionada(id);
    setBusqueda("");
    setInputBusqueda("");
    setCategoriasAbiertas(false);
    irAProductos();
  };

  return (
    <header className={styles.header}>
      {/* NIVEL 1 */}
      <div className={styles.navbar}>
        <div className={styles.navbarContenido}>
          <a href="#inicio" className={styles.logo}>
            <img
              src="/logo2.png"
              alt="SAM-TECNOLOGÍA"
              className={styles.logoImg}
            />
            <span className={styles.logoText}>
              SAM-<span className={styles.logoAccent}>TECNOLOGÍA</span>
            </span>
          </a>

          <form onSubmit={handleBusqueda} className={styles.buscador}>
            <input
              type="text"
              id="busqueda"
              name="busqueda"
              value={inputBusqueda}
              onChange={(e) => setInputBusqueda(e.target.value)}
              placeholder="Buscar producto..."
              className={styles.buscadorInput}
            />
            <button type="submit" className={styles.buscadorBtn}>
              🔍
            </button>
          </form>

          <div className={styles.navDerecha}>
            <button className={styles.temaBtn} onClick={toggleTema}>
              {temaOscuro ? "☀️" : "🌙"}
            </button>
            <a href="/admin/login" className={styles.btnAdmin}>
              👤 Admin
            </a>
            <button
              className={styles.hamburger}
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {menuAbierto ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* NIVEL 2 */}
      <div className={styles.navbar2}>
        <div className={styles.navbar2Contenido}>
          <div className={styles.categoriasWrapper}>
            <button
              className={styles.categoriasBtn}
              onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
            >
              ☰ Categorías
            </button>
            {categoriasAbiertas && (
              <div className={styles.categoriasDropdown}>
                {categorias.map((cat) => (
                  <a
                    key={cat.id}
                    href="#productos"
                    className={styles.categoriaItem}
                    onClick={() => handleCategoria(cat.id)}
                  >
                    {cat.nombre}
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className={styles.navLinks}>
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#productos">Productos</a>
            <a href="#cotizacion">Cotización</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <button className={styles.carritoBtn} onClick={onAbrirCarrito}>
            <img
              src="/icon/carrito.gif"
              alt="Carrito"
              className={styles.iconoCarrito}
            />
            <span className={styles.carritoBadge}>{totalItems}</span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className={styles.menuMovil}>
          <form onSubmit={handleBusqueda} className={styles.buscadorMovil}>
            <input
              type="text"
              id="busquedaMovil"
              name="busquedaMovil"
              value={inputBusqueda}
              onChange={(e) => setInputBusqueda(e.target.value)}
              placeholder="Buscar producto..."
            />
            <button type="submit">🔍</button>
          </form>
          <ul>
            <li>
              <a href="#inicio" onClick={() => setMenuAbierto(false)}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#servicios" onClick={() => setMenuAbierto(false)}>
                Servicios
              </a>
            </li>
            <li>
              <a href="#productos" onClick={() => setMenuAbierto(false)}>
                Productos
              </a>
            </li>
            <li>
              <a href="#cotizacion" onClick={() => setMenuAbierto(false)}>
                Cotización
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={() => setMenuAbierto(false)}>
                Contacto
              </a>
            </li>
            {categorias.map((cat) => (
              <li key={cat.id}>
                <a href="#productos" onClick={() => handleCategoria(cat.id)}>
                  📦 {cat.nombre}
                </a>
              </li>
            ))}
          </ul>
          <button className={styles.temaMovil} onClick={toggleTema}>
            {temaOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro"}
          </button>
          <a href="/admin/login" className={styles.btnAdminMovil}>
            👤 Admin
          </a>
        </div>
      )}

      {/* Navbar inferior móvil */}
      <div className={styles.navbarInferior}>
        <a href="#inicio" className={styles.navInferiorItem}>
          🏠
          <span>Inicio</span>
        </a>
        <a href="#servicios" className={styles.navInferiorItem}>
          🔧
          <span>Servicios</span>
        </a>
        <a href="#productos" className={styles.navInferiorItem}>
          📦
          <span>Productos</span>
        </a>
        
        <a href="#contacto" className={styles.navInferiorItem}>
          📞
          <span>Contacto</span>
        </a>
      </div>
    </header>
  );
}

export default Navbar;

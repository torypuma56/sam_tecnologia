import { useState, useEffect, useMemo } from "react";
import { useCarrito } from "../../hooks/useCarrito";
import { useBusqueda } from "../../hooks/useBusqueda";
import { API } from "../../config/api";
import styles from "./productos.module.css";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  categoria: string;
  categoria_id: number;
};

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const { agregarItem } = useCarrito();
  const { busqueda, categoriaSeleccionada } = useBusqueda();

  useEffect(() => {
    fetch(`${API}/productos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProductos(data.data);
      })
      .catch(() => {});
  }, []);

  const filtrados = useMemo(() => {
    let resultado = productos;

    if (busqueda.trim()) {
      resultado = resultado.filter(
        (p) =>
          p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(busqueda.toLowerCase()),
      );
    }

    if (categoriaSeleccionada) {
      resultado = resultado.filter(
        (p) => p.categoria_id === categoriaSeleccionada,
      );
    }

    return resultado;
  }, [busqueda, categoriaSeleccionada, productos]);

  const todosProductos = useMemo(() => {
    if (categoriaSeleccionada) {
      return productos.filter((p) => p.categoria_id === categoriaSeleccionada);
    }
    return productos;
  }, [categoriaSeleccionada, productos]);

  const handleAgregar = (producto: Producto) => {
    agregarItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
      stock: producto.stock,
    });
  };

  const renderProductos = (items: Producto[], titulo?: string) => (
    <>
      {titulo && (
        <div className={styles.subheader}>
          <h3>{titulo}</h3>
        </div>
      )}
      <div className={styles.grid}>
        {items.length === 0 ? (
          <p className={styles.vacio}>
            {busqueda
              ? `No se encontraron productos para "${busqueda}"`
              : "No hay productos disponibles."}
          </p>
        ) : (
          items.map((producto) => (
            <div key={producto.id} className={styles.card}>
              <div className={styles.imgContainer}>
                {producto.stock === 0 && (
                  <span className={styles.sinStock}>Sin stock</span>
                )}
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className={styles.img}
                  />
                ) : (
                  <div className={styles.sinImagen}>📷</div>
                )}
              </div>
              <div className={styles.info}>
                <span className={styles.categoria}>{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className={styles.footer}>
                  <span className={styles.precio}>Bs. {producto.precio}</span>
                  <button
                    className={styles.btnDetalle}
                    disabled={producto.stock === 0}
                    onClick={() => handleAgregar(producto)}
                  >
                    {producto.stock === 0 ? "Sin stock" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );

  // Productos que no están en los filtrados
  const productosOtros = todosProductos.filter(
    (p) => !filtrados.some((f) => f.id === p.id),
  );

  return (
    <section className={styles.productos} id="productos">
      <div className={styles.header}>
        <h2>
          Productos <span className={styles.accent}>Destacados</span>
        </h2>
        <p>Equipos de alta calidad para tu sistema de seguridad</p>
      </div>

      {/* Mostrar resultados de búsqueda si hay búsqueda activa */}
      {(busqueda.trim() || categoriaSeleccionada) && filtrados.length > 0 && (
        <div className={styles.seccion}>
          {renderProductos(
            filtrados,
            `Resultados de búsqueda (${filtrados.length})`,
          )}
        </div>
      )}

      {/* Mostrar otros productos si hay búsqueda y quedan otros productos */}
      {(busqueda.trim() || categoriaSeleccionada) &&
        productosOtros.length > 0 && (
          <div className={styles.seccion}>
            {renderProductos(
              productosOtros,
              `Otros productos (${productosOtros.length})`,
            )}
          </div>
        )}

      {/* Si no hay búsqueda, mostrar todos los productos normalmente */}
      {!busqueda.trim() && !categoriaSeleccionada && (
        <div className={styles.seccion}>{renderProductos(todosProductos)}</div>
      )}

      {/* Mensaje si no hay nada */}
      {filtrados.length === 0 && (busqueda.trim() || categoriaSeleccionada) && (
        <p className={styles.vacio}>
          {busqueda
            ? `No se encontraron productos para "${busqueda}"`
            : "No hay productos en esta categoría."}
        </p>
      )}
    </section>
  );
}

export default Productos;

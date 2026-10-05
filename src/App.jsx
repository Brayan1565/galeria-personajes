import { useState, useEffect } from "react";
import "./App.css";
// Importamos los componentes que acabamos de crear
import Tarjeta from "./components/Tarjeta";
import Modal from "./components/Modal";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState("");
  // NUEVO: estado elegido en el filtro ("" = todos, o "alive", "dead", "unknown")
  const [estado, setEstado] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [seleccionado, setSeleccionado] = useState(null);

  // Efecto del debounce (igual que antes)
  useEffect(() => {
    const temporizador = setTimeout(() => {
      setBusquedaDebounced(busqueda);
      setPagina(1);
    }, 500);

    return () => clearTimeout(temporizador);
  }, [busqueda]);

  // Efecto que pide los datos
  useEffect(() => {
    async function cargarPersonajes() {
      setCargando(true);
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        // NUEVO: agregamos &status=... a la URL (si está vacío, la API lo ignora)
        const respuesta = await fetch(
          `https://rickandmortyapi.com/api/character?name=${encodeURIComponent(busquedaDebounced)}&status=${estado}&page=${pagina}`
        );

        if (respuesta.status === 404) {
          setPersonajes([]);
          setTotalPaginas(1);
          return;
        }

        if (!respuesta.ok) {
          throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setPersonajes(datos.results);
        setTotalPaginas(datos.info.pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarPersonajes();
  }, [busquedaDebounced, estado, pagina]); // NUEVO: "estado" también dispara el efecto

  // NUEVO: al cambiar el filtro, guardamos el valor y volvemos a la página 1
  function manejarEstado(e) {
    setEstado(e.target.value);
    setPagina(1);
  }

  return (
    <div>
      <input
        className="buscador"
        type="text"
        placeholder="Buscar personaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* NUEVO: lista desplegable controlada por el estado "estado" */}
      <select className="filtro" value={estado} onChange={manejarEstado}>
        <option value="">Todos los estados</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      {cargando && <p className="mensaje">Cargando...</p>}
      {error && <p className="mensaje">Ocurrió un error: {error}</p>}
      {!cargando && !error && personajes.length === 0 && (
        <p className="mensaje">No se encontraron personajes.</p>
      )}

      <div className="galeria">
        {personajes.map((p) => (
          // Ahora cada tarjeta es un componente: le pasamos los datos por props
          <Tarjeta key={p.id} personaje={p} onSeleccionar={setSeleccionado} />
        ))}
      </div>

      <div className="paginacion">
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          Anterior
        </button>

        <span>
          Página {pagina} de {totalPaginas}
        </span>

        <button
          onClick={() => setPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
        >
          Siguiente
        </button>
      </div>

      {/* El modal solo se dibuja si hay un personaje seleccionado */}
      {seleccionado && (
        <Modal
          personaje={seleccionado}
          onCerrar={() => setSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default App;
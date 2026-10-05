import { useEffect } from "react";

// onCerrar es una función que nos pasa el padre para cerrar el modal
function Modal({ personaje, onCerrar }) {
  // El efecto de la tecla Escape ahora vive aquí, porque pertenece al modal.
  // Como este componente solo existe mientras está abierto, ya no necesitamos el "if (!seleccionado)"
  useEffect(() => {
    function manejarTecla(e) {
      if (e.key === "Escape") {
        onCerrar();
      }
    }

    document.addEventListener("keydown", manejarTecla);
    // Limpieza: se ejecuta cuando el modal se cierra (el componente desaparece)
    return () => document.removeEventListener("keydown", manejarTecla);
  }, [onCerrar]);

  return (
    // Clic en el fondo oscuro cierra el modal
    <div className="modal-fondo" onClick={onCerrar}>
      {/* stopPropagation evita que un clic dentro del modal lo cierre */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onCerrar}>
          ✕
        </button>

        <img src={personaje.image} alt={personaje.name} />
        <h2>{personaje.name}</h2>

        <ul>
          <li><strong>Estado:</strong> {personaje.status}</li>
          <li><strong>Especie:</strong> {personaje.species}</li>
          <li><strong>Género:</strong> {personaje.gender}</li>
          <li><strong>Origen:</strong> {personaje.origin.name}</li>
          <li><strong>Ubicación:</strong> {personaje.location.name}</li>
          <li><strong>Episodios:</strong> {personaje.episode.length}</li>
        </ul>
      </div>
    </div>
  );
}

export default Modal;
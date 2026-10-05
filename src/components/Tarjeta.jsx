// Un componente es una función que recibe "props" (un objeto con los datos que le pasa el padre)
// Aquí desestructuramos las props directamente: { personaje, onSeleccionar }
function Tarjeta({ personaje, onSeleccionar }) {
  return (
    <div
      className="tarjeta"
      // Al hacer clic, avisamos al padre (App) cuál personaje se eligió
      onClick={() => onSeleccionar(personaje)}
    >
      <img src={personaje.image} alt={personaje.name} />
      <h3>{personaje.name}</h3>
      <p>{personaje.status}</p>
    </div>
  );
}

// "export default" permite importar este componente desde otros archivos
export default Tarjeta;
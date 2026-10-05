# Galería de personajes de Rick and Morty
🔗 **Demo en vivo:** [galeria-personajes.vercel.app](https://galeria-personajes-seven.vercel.app)

Aplicación web hecha con **React** y **Vite** que consume la API pública de [Rick and Morty](https://rickandmortyapi.com/) para explorar a los personajes de la serie.

## Funcionalidades

- Galería de personajes en cuadrícula responsive
- Búsqueda por nombre con *debounce* (espera a que dejes de escribir para consultar la API)
- Filtro por estado: Alive, Dead o Unknown
- Paginación con botones Anterior y Siguiente
- Ventana de detalle con especie, género, origen, ubicación y episodios; se cierra con la ✕, haciendo clic fuera o con la tecla Esc
- Manejo de estados de carga, errores y búsquedas sin resultados

## Tecnologías

- React (hooks: `useState` y `useEffect`)
- Vite
- CSS (Grid y Flexbox)
- API REST de Rick and Morty

## Cómo ejecutarlo

1. Clona el repositorio:
```bash
   git clone https://github.com/Brayan1565/galeria-personajes.git
```
2. Entra a la carpeta e instala las dependencias:
```bash
   cd galeria-personajes
   npm install
```
3. Inicia el servidor de desarrollo:
```bash
   npm run dev
```
4. Abre en el navegador la dirección que muestre la terminal (normalmente `http://localhost:5173`).

## Estructura

```
src/
├── components/
│   ├── Tarjeta.jsx   # tarjeta de cada personaje
│   └── Modal.jsx     # ventana de detalle
├── App.jsx           # estado, llamadas a la API y búsqueda/filtro/paginación
└── App.css           # estilos
```
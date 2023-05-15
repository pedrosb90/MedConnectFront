export default function SearchBar() {
  return (
    <div>
      <h3>Busqueda</h3>
      <div>
        <select placeHolder="Medico.." id="medicos"></select>
      </div>
      <div>
        <h5>Ordena:</h5>
        <button>Experiencia</button>
        <button>Nombre</button>
      </div>
      <div>
        <h3>Busca por especialidad: </h3>
        <select placeHolder="Especialistas en.." id="especialidad"></select>
      </div>
    </div>
  );
}

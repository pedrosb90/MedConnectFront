export default function SearchBar() {
  return (
    <div className="bg-gray-200 py-2 px-6 flex items-center space-x-4">
      <h3 className="text-lg text-white bg-gray-400 rounded-md font-sans py-2 px-4">
        Busca tu especialidad:
      </h3>
      <div className="flex mr-auto space-x-4">
        <select className="border border-gray-300 rounded-md py-3 px-2">
          <option value="name">Selecciona una especialidad...</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <h5 className="flex items-center self-center text-white">Ordenar:</h5>
        <button className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-2 px-4 rounded">
          Disponibilidad
        </button>
        <button className="bg-cimPallete-600 hover:bg-cimPallete-gold text-white font-bold py-2 px-4 rounded">
          Alfabetico{" "}
        </button>
      </div>
    </div>
  );
}

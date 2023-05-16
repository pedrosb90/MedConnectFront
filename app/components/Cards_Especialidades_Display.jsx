import Card_Especialidad from "./Card_Especialidad.jsx";
import Search_Bar_Especs from "./Search_Bar_Especs";

export default function Cards_Especialidades_Display({ especialidad }) {
  return (
    <div>
      <Search_Bar_Especs />
      <div className="text-white font-sans max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px] container">
        {especialidad.map(({ name, url, description, id }, index) => {
          return (
            <Card_Especialidad
              id={id}
              key={index}
              name={name}
              image={url}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
}

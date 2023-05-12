import Card2 from "./Card2";

export default function Cards({ especialidad }) {
  
    return (
        <div className=" max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px] container">

            {especialidad.map(({ name, url, description, id}, index) => {

                return <Card2 
                id= {id}
                key={index}
                name={name} 
                image={url} 
                description={description} />;
            })}
        </div>
        )
}

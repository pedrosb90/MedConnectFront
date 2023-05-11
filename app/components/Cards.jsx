import Card2 from "./Card2";

export default function Cards({ especialidad }) {
    return (
        <div className="max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px] container">
            {especialidad.map(({ name, image, description }, index) => {
                return <Card2 
                key={index}
                name={name} 
                image={image} 
                description={description} />;
            })}
        </div>
    );
}

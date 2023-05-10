import Card from "./Card";

export default function Cards({ especialidad }) {
    return (
        <div className="px-5 py-24 container mx-auto w-full">
            {especialidad.map(({ name, image, description }, index) => {
                return <Card 
                key={index}
                name={name} 
                image={image} 
                description={description} />;
            })}
        </div>
    );
}

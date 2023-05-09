import Card from "./Card";

export default function Cards({ especialidad }) {
    return (
        <div className="flex  items-center justify-center min-h-screen container mx-auto">
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

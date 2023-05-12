import Card from "./Card";

export default function Cards({ especialidad }) {
    return (
        <div className="flex flex-wrap w-full flex-row  items-center justify-center min-h-screen container mx-auto">
            {especialidad.map(({ name,url, description }, index) => {
                return <Card 
                key={index}
                name={name} 
                image={url} 
                description={description} />;
            })}
        </div>
    );
}

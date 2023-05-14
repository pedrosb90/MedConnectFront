import CardObras from "./CardObras";

export default function CardsObras({ obras }) {
  return (
    <div className=" font-sans max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px] container">
      {obras.map(({ img }, index) => {
        return <CardObras key={index} img={img} />;
      })}
    </div>
  );
}

import Card_Obras from "./Card_Obras";

export default function Cards_Obras_Display({ obras }) {
  return (
    <div className=" font-sans max-w-[1320px] mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-[20px] container">
      {obras.map(({ img }, index) => {
        return <Card_Obras key={index} img={img} />;
      })}
    </div>
  );
}

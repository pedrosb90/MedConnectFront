import Image from "next/image";

export default function Card_Obras({ name, img, index }) {
  return (
    <div key={index}>
      {/* GRID */}
      <div>
        {/* CARD */}
        <div>
          <div className="border-2 border-gray-800 border-opacity-60 rounded-lg overflow-hidden h-40 w-30 hover:transform hover:scale-110 hover:translate-y-[-10px] transition-transform duration-300 ease-in-out">
            <Image className="h-full w-full " src={img} alt="" />
          </div>
        </div>
      </div>
      {/* END:GRID */}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
export default function Card_Especialidad({
  name,
  image,
  description,
  id,
  index,
}) {
  return (
    <div key={index}>
      <div className="h-full border-2 border-transparent  rounded-lg overflow-hidden ">
        <Image
          className="lg:h-72 md:h-48 w-full object-cover object-center"
          src={image}
          alt=""
          width={500}
          height={100}
        />
        <div className="p-4 bg-cimPallete-300 ">
          <h1 className="text-grey text-2xl mb-4 font-sans">{name}</h1>
          <h3 className="text-white text-left">{description}</h3>
          <div className=" text-white font-sans flex border-t border-solid border-slate-400 justify-between pt-3 mt-3 items-center hover:translate-y-[-4px]">
            <Link href={`/specializations/${id}`}>
              <button>Conocer mas </button>
            </Link>
            <button>Ver Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Card2({ name, image, description, index }) {
  return (
    <div key={index}>
      <div className="h-full border-2 border-gray-800 border-opacity-60 rounded-lg overflow-hidden ">
        <img
          className="lg:h-72 md:h-48 w-full object-cover object-center"
          src={image}
          alt=""
        />
        <div className="p-4 bg-cimPallete-300 ">
          <h1 className="text-cimPallete-200 text-2xl mb-4 font-bold">
            {name}
          </h1>
          <h3 className="text-cimPallete-900 text-left">{description}</h3>
          <div className="flex border-t border-solid border-slate-400 justify-between pt-3 mt-3 items-center ">
            <Link href="/Detail">
              <button>Conocer mas </button>
            </Link>
            <button>Ver Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}

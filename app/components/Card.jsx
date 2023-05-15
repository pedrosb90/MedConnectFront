import Link from "next/link";

export default function Card({ name, url, description, index }) {
  return (
    <div key={index}>
      {/* GRID */}

      <div className="flex flex-wrap -m-4">
        {/* CARD */}
        <div className="p-4 sm:w-1/2 lg:w-1/3">
          <div className="h-full border-2 border-gray-800 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-72 md:h-48 w-full object-cover object-center"
              src={url}
              alt="img"
            />
            <div>
              <h1>{name}</h1>
              <h3>{description}</h3>
              <Link href="/Detail">
                <button>Conocer mas</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* END:GRID */}
    </div>
  );
}

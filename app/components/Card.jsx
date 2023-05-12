import Link from "next/link";

export default function Card({ name, url, description, index }) {
  return (
    <div key={index}>
        {/* GRID */}
      <div >

        {/* CARD */}
          <div className=" rounded-xl shadow-lg">
            <div className="p-5 flex flex-col w-80 border-2 border-gray-200 rounded-lg overflow-hidden">
              
            <div className="rounded-xl overflow-hidden ">
              <img
                className="lg:h-72 md:h-48 w-full object-cover object-center"
                src={url}
                alt="img"
                />
            </div>

            <div>
              <h2>{name}</h2>
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

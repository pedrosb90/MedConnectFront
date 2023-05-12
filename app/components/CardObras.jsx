export default function CardObras({ name, img, index }) {
    return (
      <div key={index}>
        {/* GRID */}
        <div  >
          {/* CARD */}
          <div >
            <div className=" border-2 border-gray-800 border-opacity-60 rounded-lg overflow-hidden h-40 w-30"  >
              <img
              className="h-full w-full "
                src={img}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* END:GRID */}
      </div>
    );
  }
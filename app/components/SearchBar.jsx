import { useState } from "react";

export default function SearchBar() {

    const [name, setName] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        setName(event.target.value)
      };

    const dispatchName = (e) => {
        e.preventDefault();
    dispatch(searchBar(name))
      
      };

  return (
    <div>
        <form>
        <input
          type="text"
          placeholder="ESPECIALIDAD"
          onChange={handleSearch}
          value={name}
          className={style.input}
        />
        <button className={style.button} onClick={(e) => dispatchName(e)}>SEARCH</button>
      </form>
    </div>
  )
}

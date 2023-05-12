import { useState } from "react";
import data from "../../MOCK_DATA.json";

export default function HomeSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((medic) =>
    medic.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by last name"
      />
      <ul>
        {filteredData.map((medic) => (
          <li key={medic.id}>
            {medic.first_name} {medic.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

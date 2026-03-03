import React, { useState } from "react";

const DisplaySearchtextbox = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const items = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Grapes",
    "Strawberry",
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <ul> */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item, idx) => <li key={idx}>{item}</li>)
      ) : (
        <li>No results found</li>
      )}
      {/* </ul> */}
    </div>
  );
};

export default DisplaySearchtextbox;

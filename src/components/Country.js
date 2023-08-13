import React, { useState } from "react";
import Leaflet from "./Leaflet";
import DisplayCountry from "./DisplayCountry";

const Country = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <div className="CountryMAin">
      <div className="CountryMAinMap">
        <Leaflet setSelectedCountry={setSelectedCountry} />
      </div>
      <div className="CountryMAinResult">
        <DisplayCountry country={selectedCountry} />
      </div>
    </div>
  );
};

export default Country;

import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countriesGeoJSON from "./countries.json";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

const Leaflet = ({ setSelectedCountry }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleCountryClick = async (e) => {
    const countryCode = e.target.feature.properties.ISO_A3;
    console.log("countryCode", countryCode);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3/alpha/${countryCode}`
      );
      if (response.data && response.data.length > 0) {
        const countryCode = response.data[0].cca3;
        const feature = countriesGeoJSON.features.find(
          (f) => f.properties.ISO_A3 === countryCode
        );
        console.log("countryCodecountryCode=>", response.data[0]);
        setSelectedFeature(feature);
        setSelectedCountry(response.data[0]);
      } else {
        setSelectedFeature(null);
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };
  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3/name/${encodeURIComponent(searchQuery)}`
        );

        if (response.data && response.data.length > 0) {
          const countryCode = response.data[0].cca3;
          const feature = countriesGeoJSON.features.find(
            (f) => f.properties.ISO_A3 === countryCode
          );
          console.log("countryCodecountryCode=>", response.data[0]);
          setSelectedFeature(feature);
          setSelectedCountry(response.data[0]);
        } else {
          setSelectedFeature(null);
        }
      } catch (error) {
        console.error("Error searching for country:", error);
      }
    } else {
      setSelectedFeature(null);
    }
  };
  return (
    <>
      <div className="LeafletInputField">
        <div className="LeafletInput">
          <input
            type="text"
            placeholder="Search for a country"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AiOutlineSearch className="AiOutlineSearch" onClick={handleSearch} />
        </div>
      </div>

      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          data={countriesGeoJSON}
          style={(feature) => ({
            fillColor: selectedFeature === feature ? "#00008b" : "#4caf50",
            color: "#333",
            weight: 1,
          })}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: handleCountryClick,
            });
          }}
        />
      </MapContainer>
    </>
  );
};

export default Leaflet;
// https://github.com/apilayer/restcountries
//https://leafletjs.com/examples/chorople
//https://datahub.io/core/geo-countries#data
//https://react-leaflet.js.org/docs/api-map/
//https://www.npmjs.com/package/react-leaflet
//https://www.npmjs.com/package/leaflet

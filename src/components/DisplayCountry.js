import React from "react";

const NameValue = ({ name, value, language }) => {
  return (
    <div className=" NameValueMAin">
      <div className="NameValueMAinh4">
        <h4>{name}</h4>
      </div>
      <div className="NameValueMAinp">
        {language == true ? (
          <>
            {Object.keys(value).map((key, index) => (
              <span key={index} className="NameValueMainLanguage">
                {value[key]}
              </span>
            ))}
          </>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  );
};
const DisplayCountry = ({ country }) => {
  console.log("country", country);

  return (
    <>
      {country ? (
        <div className="DisplayCountryMain">
          <h1>{country?.name?.common.toUpperCase()}</h1>
          <img src={country?.flags[1]} alt=" flag..." />
          <NameValue name="Capital" value={country?.capital[0]} />
          {Object.keys(country?.currencies).map((code, index) => {
            const { name, symbol } = country?.currencies[code];
            return (
              <NameValue
                key={index}
                name="Currency"
                value={`${symbol},${name}`}
              />
            );
          })}
          <NameValue name="Population" value={country?.population} />
          {country?.latlng.map((ele) => (
            <NameValue name="Latlang" value={`${ele},${ele}`} />
          ))}

          <NameValue
            name="Language"
            value={country?.languages}
            language={true}
          />

          <NameValue name="Area" value={country?.area} />
          <NameValue name="Area" value={country?.area} />
          <NameValue name="TimeZone" value={country?.timezones[0]} />
          <NameValue name="Region" value={country?.region} />
        </div>
      ) : (
        <div className="DisplayCountryMain">
          <h4>Please select or Search Region</h4>
        </div>
      )}
    </>
  );
};

export default DisplayCountry;

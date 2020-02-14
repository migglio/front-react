import React, { useState } from "react";
import Selector from "../selector/Selector";
import { useEffect } from "react";

const CitySearcher = ({ onComplete, defaultValue, placeholder, label }) => {
  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(label);
    console.log("see");
  }, [onComplete, defaultValue, placeholder, label]);

  const handleChange = value => {
    setValue(value);

    var request = {
      input: value,
      types: ["(cities)"],
      componentRestrictions: { country: "ar" },
      language: "es"
    };

    if (value)
      service.getPlacePredictions(request, (predictions, status) => {
        if (status === "OK" && predictions && predictions.length > 0) {
          const options = predictions.map(city => {
            return {
              id: city.id,
              placeId: city.place_id,
              label: city.description,
              value: city.description
            };
          });
          setOptions(options);
        }
      });
  };

  const handleComplete = value => {
    setValue(value.label);
    if (onComplete) onComplete(value);
  };

  return (
    <>
      <Selector
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        options={options}
      />
    </>
  );
};

export default CitySearcher;

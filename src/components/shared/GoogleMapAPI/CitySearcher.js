import React, { useState } from "react";
import Selector from "../selector/Selector";

const CitySearcher = ({ onComplete, defaultValue }) => {
  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState([]);

  const handleChange = value => {
    const types = ["(cities)"];
    setValue(value);

    var request = {
      input: value,
      types,
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
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        options={options}
      />
    </>
  );
};

export default CitySearcher;
/*
 CitySearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { lat: undefined, lng: undefined },
      name: this.props.name,
      //control no repeated elements
      error: false
    };
    this.updateLocation = this.updateLocation.bind(this);
    this.changeName = this.changeName.bind(this);
    this.isCity = this.isCity.bind(this);
  }

  isCity(name, list) {
    if (name === "") return false;
    for (let index = 0; index < list.length; index++) {
      if (list[index].name === name) {
        this.setState({ error: true });
        return true;
      }
    }

    this.setState({ error: false });
    return false;
  }

  changeName = e => {
    this.updateLocation({ lat: undefined, lng: undefined }, e.target.value);
    this.setState({ name: e.target.value });
    if (this.state.name === "") this.setState({ error: true });
    else this.setState({ error: false });
    this.getError();
  };

  updateLocation(loc_par, name, shortName) {
    if (!this.isCity(name, this.props.steps)) {
      this.setState({ location: loc_par, name: name });
      if (!this.props.idx)
        this.props.callback({
          location: this.state.location,
          name: name,
          shortName
        });
      else this.props.callback(this.state.location, this.props.idx, name);
    }
  }

  getError() {
    if (this.state.error) return "Ciudad ya seleccionada";
    //if (!this.state.name) return "Requerido";
    return "";
  }

  render() {
    const error = this.getError();
    return (
      <div>
        <PlacesWithStandaloneSearchBox
          changeLoc={this.updateLocation}
          name={this.props.name}
          steps={this.props.steps}
          error={error}
          changeName={this.changeName}
        />
      </div>
    );
  }
}
*/

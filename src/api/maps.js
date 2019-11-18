import axios from "axios";

const url = "http://maps.googleapis.com/maps/api/place/autocomplete/json";
const key = "AIzaSyDw6XjBV9dEHkRt_T4ChYB5Nklc2-YiN9M";

const hardcoded =
  "https://maps.googleapis.com/maps/api/place/autocomplete?key=AIzaSyDw6XjBV9dEHkRt_T4ChYB5Nklc2-YiN9M";
const maps = () => {
  return {
    getCities: async cityName => {
      const parameters = `?input=${cityName}+Amphitheatre&key=${key}`;
      const response = await axios.get(url + parameters, {
        headers: { "Content-Type": "application/json" }
      });
      //const response = await axios.get("https://dog.ceo/api/breeds/list/all");
      //await axios.get(hardcoded);
      return response;
    }
  };
};

export default maps;

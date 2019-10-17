import axios from "axios";
import url from "../config";

const trips = () => {
  return {
    getTrip: async (id, data) => {
      const response = await axios.get(url.api + "trips/" + id);
      console.log("primero");
      return response.data;
    }
  };
};

export { trips };

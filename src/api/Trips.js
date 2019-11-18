import axios from "axios";
import url from "../config";

const trips = () => {
  return {
    getTrip: async (id, data) => {
      const response = await axios.get(url.api + "trips/" + id);
      return response.data;
    },
    getTrips: async data => {
      const response = await axios.get(url.api + "trips");
      return response.data;
    },
    getOwnTrip: async (id, data) => {
      const response = await axios.get(url.api + "trips/ownTrips", {
        params: data
      });
      return response.data;
    },
    getBookedTrip: async (id, data) => {
      const response = await axios.get(url.api + "trips/bookedTrips", {
        params: data
      });
      return response.data;
      /*.then(
        (response) => (response.data) 
      )
          .catch(error => {
            handleServerResponse(
              error,
              "An error occured when getting the trips data"
            );
          });
          */
    }
  };
};

export { trips };

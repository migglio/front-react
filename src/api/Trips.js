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
    },
    postTrips: async data => {
      data.steps[0].date = data.date;
      data.steps[0].time = data.time;
      data.steps[0].price = data.price;
      data.steps[0].passengers.total = data.seats;
      const userData = {
        owner: data.owner,
        steps: data.steps,
        description: data.details,
        vehiculo: data.car,
        automaticReservation: data.reservation,
        food: data.food,
        mate: data.mate
      };

      try {
        await axios.post(url.socket + "api/trips", userData, url.config);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }
  };
};

export { trips };

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
      const response = await axios.get(
        url.api +
          `trips/user/${id}?isOwner={true}
      `,
        {
          params: data
        }
      );
      return response.data;
    },
    getBookedTrip: async id => {
      const response = await axios.get(
        url.api + `trips/user/${id}?isPassenger=true`
      );
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
    },
    putTrips: async (id, data) => {
      data.steps[0].date = data.date;
      data.steps[0].time = data.time;
      data.steps[0].price = data.price;
      data.steps[0].passengers.total =
        data.seats - data.steps[0].passengers.users.length;
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
        await axios.put(url.api + "trips/" + id, userData, url.config);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    },
    deleteTrip: async id => {
      try {
        await axios.delete(url.api + "trips/" + id);
        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false };
      }
    }
  };
};

export { trips };

/*
      //when a trip is modified, every passenger must be notified
      const users = userData.steps[0].passengers.users.concat(
        userData.steps[0].passengers.pendingUsers
      );

      axios
        .put(url.socket + "api/trips/updateTrip", userData, url.config)
        .then(response => {
          this.addNotification("success", this.props.success);
          this.props.updateSavedState(true);
          //save a notification, only if there's any user to be nofified
          if (users.length > 0)
            notifications.postNotification(
              this.props.tripData.owner,
              id,
              tripEdited,
              users
            );
        })
        .catch(error => {
          this.addNotification("error", this.props.error);
          this.props.updateSavedState(false);
          console.log(error);
        });
*/

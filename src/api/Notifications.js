import axios from "axios";
import url from "../config";
import handleServerResponse from "../response";

const notifications = () => {
  return {
    getNotifications: async id => {
      try {
        const response = await axios.get(url.api + `notifications/user/${id}`);
        return response.data;
      } catch (error) {
        handleServerResponse(
          error,
          "An error occured when getting the notification data"
        );
      }
    },
    getNotificationsNotRead: async id => {
      try {
        const response = await axios.get(
          url.api + `notifications/user/${id}?notRead=true`
        );
        return response.data;
      } catch (error) {
        handleServerResponse(
          error,
          "An error occured when getting the notification data"
        );
      }
    },
    postNotification: async (owner, idTrip, type, users) => {
      try {
        const userData = {
          owner: owner,
          idTrip: idTrip,
          type: type,
          users: users
        };
        const response = await axios.post(
          url.api + "/notifications",
          userData,
          url.config
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    putNotification: async (idNotification, users) => {
      try {
        const userData = {
          idNotification: idNotification,
          read: users
        };
        const response = await axios.post(
          url.api + "api/notifications/" + idNotification,
          userData,
          url.config
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export { notifications };

/*
  loadTripList() {
    return axios
      .get(url.api + "notifications", { params: { userId: Auth.getUserID() } })
      .catch(error => {
        handleServerResponse(
          error,
          "An error occured when getting the trips data"
        );
      });
  }

  //mark every notifications as read
  markAsRead() {
    this.state.notifications.map(notification => {
      const users = notification.read;
      if (users.indexOf(Auth.getUserID()) === -1) {
        users.push(Auth.getUserID());
        console.log(users);
        notifications.markAsRead(notification._id, users);
      }
      return true;
    });
  }
*/

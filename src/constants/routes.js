export const NOTIFICATION_PATH = "NotificationPath";
export const NOTIFICATION_WITH_ID_PATH = "NotificationWithIdPath";

export const TRIP_PATH = "TripPath";
export const TRIP_CREATOR_PATH = "TripCreatorPath";
export const TRIP_WITH_ID_PATH = "TripWithIdPath";

export const USER_PATH = "UserPath";
export const USER_WITH_ID_PATH = "UserWithIdPath";

const routes = () => {
  return {
    notificacions: {
      [NOTIFICATION_PATH]: "/Notifications",
      [NOTIFICATION_WITH_ID_PATH]: "/Notification"
    },
    trips: {
      [TRIP_PATH]: "/Trips",
      [TRIP_CREATOR_PATH]: "/TripCreator",
      [TRIP_WITH_ID_PATH]: "/Trip"
    },
    users: {
      [USER_PATH]: "/Users",
      [USER_WITH_ID_PATH]: "/User"
    }
  };
};

export default routes;

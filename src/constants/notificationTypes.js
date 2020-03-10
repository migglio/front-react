//type constants
//to passengers
export const tripEdited = 0;
export const tripDeleted = 1;
export const tripAccepted = 2;
export const tripDenied = 3;
//to driver
export const userPending = 4;
export const userJoined = 5;

//type descriptions
//to passengers
export const tripEditedDescription =
  "ha modificado un viaje en el que te encuentras registrado";
export const tripDeletedDescription =
  "ha eliminado un viaje en el que te encuentras registrado";
export const tripAcceptedDescription =
  "ha aceptado tu solicitud para incoporarte en su viaje. ¡Disfruta el viaje!";
export const tripDeniedDescription =
  "ha rechazado tu solicitud para incoporarte en su viaje";
//to driver
export const userPendingDescription = "ha solicitado unirse en tu viaje";
export const userJoinedDecription = "se ha unido en tu viaje";

export const notificationDescriptionsManager = {
  [tripEdited]: tripEditedDescription, //means the user has changed the trip conditions
  [tripDeleted]: tripDeletedDescription, //means the user has deleted a trip
  [tripAccepted]: tripAcceptedDescription, //means the user has accepted a passenger to travel
  [tripDenied]: tripDeniedDescription, //means the user has refused a passenger request

  [userPending]: userPendingDescription, //means the user is waiting to join to the trip
  [userJoined]: userJoinedDecription
};

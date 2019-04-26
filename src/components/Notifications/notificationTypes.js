class NotificationTypes {

    //type constants
    //to passengers
    static tripEdited = 0;
    static tripDeleted = 1;
    static tripAccepted = 2;
    static tripDenied = 3;
    //to driver
    static userPending = 4;
    static userJoined = 5;
    
    static getNotificationTripEdited(){
        return "ha modificado un viaje en el que te encuentras registrado. ¡Confirma que aún estas interesado en viajar!";
    }

    static getNotificationTripDeleted(){
        return "ha eliminado un viaje en el que te encuentras registrado";
    }

    static getNotificationTripAccepted(){
        return "ha aceptado tu solicitud para incoporarte en su viaje. ¡Disfruta el viaje!";
    }

    static getNotificationTripDenied(){
      return "ha rechazado tu solicitud para incoporarte en su viaje";
    }

    static getNotificationUserPending(){
      return "ha solicitado unirse en tu viaje";
    }

    static getNotificationUserJoined(){
      return "se ha unido en tu viaje";
    }

    static getNotificationText(type){
        switch (type) {
            case 0:
              //type 0 means the user has changed the trip conditions
              return this.getNotificationTripEdited();
            case 1:
              //type 1 means the user has deleted the trip conditions
              return this.getNotificationTripDeleted();
            case 2:
              //type 2 means the user has deleted the trip conditions
              return this.getNotificationTripAccepted();
            case 3:
              //type 2 means the user has deleted the trip conditions
              return this.getNotificationTripDenied();
            case 4:
              //type 2 means the user has deleted the trip conditions
              return this.getNotificationUserPending();
            case 5:
              //type 2 means the user has deleted the trip conditions
              return this.getNotificationUserJoined();

          }
    }

  }
  
  export default NotificationTypes
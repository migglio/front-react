import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PassengerView from "../views/TripDetails/PassengerView";
import { trips } from "../../api/Trips";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { notifications } from "../../api/Notifications";
import Auth from "../Auth/Auth";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

const ViewWaitingPassengers = ({ classes }) => {
  const location = useLocation();

  const { id } = queryString.parse(location.search);

  const [data, setData] = useState(null);
  const [steps, setSteps] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getTrip = async id => {
    const response = await trips().getTrip(id);
    response.price = response.steps[0].price;
    console.log(response);
    setData(response);
    setSteps(response.steps);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getTrip(id);
  }, [id]);

  const putTrips = async (id, data) => {
    console.log("data", data);
    //await trips().putTrips(id, data);
    setLoaded(true);
  };

  const postNotification = async (owner, idTrip, type, users) => {
    await notifications().postNotification(owner, idTrip, type, users);
    setLoaded(true);
  };

  const handleStepsChange = (steps, users, notificationType) => {
    console.log(steps);
    setSteps({ ...steps });
    data.steps = steps;
    console.log("sent", data, steps);
    putTrips(id, data);
    postNotification(Auth.getUserID(), id, notificationType, users);
    console.log("notification", Auth.getUserID(), id, notificationType, users);
  };

  return (
    <div className={classes.root}>
      {loaded ? (
        <PassengerView
          onChange={handleStepsChange}
          request={true}
          steps={steps}
        />
      ) : null}
    </div>
  );
};

export default withStyles(styles)(ViewWaitingPassengers);

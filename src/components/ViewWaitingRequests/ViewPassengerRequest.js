import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PassengerView from "../views/TripDetails/PassengerView";
import { trips } from "../../api/Trips";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

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
    await trips().putTrips(id, data);
    setLoaded(true);
  };

  const handleStepsChange = steps => {
    setSteps({ ...steps });
    data.steps = steps;
    putTrips(id, data);
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

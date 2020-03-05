import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PassengerView from "../views/TripDetails/PassengerView";
import { trips } from "../../api/Trips";

const queryString = require("query-string");

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const ViewWaitingPassengers = ({ classes, location }) => {
  const idTrip = queryString.parse(location.search);
  //const [checked, setChecked] = useState([]);
  const [steps, setSteps] = useState([]);
  const [passengers, setPassengers] = useState([]);
  //const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);

  //Carga de Datos
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await trips().getTrip(idTrip.id);
      setSteps(response.steps);
      setPassengers(response.steps[0].passengers);
      setLoaded(true);
    };
    asyncFunction();
  }, [idTrip]);

  console.log("entra");

  return (
    <div style={{ display: "flex", textAlign: "center", alignItems: "center" }}>
      {loaded ? (
        <PassengerView
          idTrip={idTrip.id}
          tripData={{ steps: steps }}
          request={true}
          passengers={passengers}
        />
      ) : null}
    </div>
  );
};

export default withStyles(styles)(ViewWaitingPassengers);

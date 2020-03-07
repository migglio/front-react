import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PassengerView from "../views/TripDetails/PassengerView";
import { trips } from "../../api/Trips";
import { useLocation } from "react-router-dom";
import { useGetPath } from "../../libs/urlParams";
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

  //const [checked, setChecked] = useState([]);
  //const [data, setData] = useState(null);
  const [steps, setSteps] = useState(null);
  const [loaded, setLoaded] = useState(false);

  console.log(useGetPath(1), useGetPath(0));
  const getTrip = async id => {
    const response = await trips().getTrip(id);

    setSteps(response.steps);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getTrip(id);
  }, [id]);

  const handleStepsChange = steps => {
    console.log("entra steps change", steps);
    setSteps({ ...steps });
    //TODO: ACTUALIZAR DB
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

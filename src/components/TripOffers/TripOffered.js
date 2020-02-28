import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TabOwnTrips from "./TabOwnTrips";
import Auth from "../Auth/Auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { trips } from "../../api/Trips";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

const TripOffered = () => {
  const data = { owner: Auth.getUserID() };
  const [tripsList, setTripList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getTrips = async () => {
    const response = await trips().getTrips(data);
    setTripList(response);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    if (!loaded) getTrips();
  }, [getTrips]);

  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        paddingTop: "2%",
        paddingLeft: "20%",
        paddingRight: "20%"
      }}
    >
      <Paper>
        <Typography
          variant="title"
          gutterBottom
          style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
        >
          Viajes Publicados
        </Typography>
      </Paper>
      {loaded ? <TabOwnTrips trips={tripsList} /> : <CircularProgress />}
    </div>
  );
};

export default withStyles(styles)(TripOffered);

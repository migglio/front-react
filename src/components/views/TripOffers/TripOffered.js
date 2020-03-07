import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TabOwnTrips from "./TabOwnTrips";
import Auth from "../../Auth/Auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { trips } from "../../../api/Trips";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: "2%",
    width: "100%",
    "@media (min-width:768px)": {
      width: "80%"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

const TripOffered = ({ classes }) => {
  const owner = Auth.getUserID();
  const [tripsList, setTripList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getTrips = async () => {
    const response = await trips().getOwnTrip(owner);
    setTripList(response);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    if (!loaded) getTrips();
    //eslint-disable-next-line
  }, [loaded]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
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
    </div>
  );
};

export default withStyles(styles)(TripOffered);

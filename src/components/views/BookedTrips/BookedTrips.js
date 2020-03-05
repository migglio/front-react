import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TabBookedTrips from "./TabBookedTrips";
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

const BookedTrips = ({ classes }) => {
  const [bookedTrips, setBookedTrips] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //Carga de Datos
  useEffect(() => {
    const asyncFunction = async () => {
      const id = Auth.getUserID();

      const response = await trips().getBookedTrip(id);
      setBookedTrips(response);
      setLoaded(true);
    };
    asyncFunction();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper>
          <Typography
            variant="title"
            gutterBottom
            style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
          >
            Reservas
          </Typography>
        </Paper>
        {loaded ? <TabBookedTrips trips={bookedTrips} /> : <CircularProgress />}
      </div>
    </div>
  );
};

export default withStyles(styles)(BookedTrips);

import React from "react";
import { withStyles } from "material-ui/styles";
import RegisterNewTrip from "./NewTripSection";
import Background from "../../../images/driver-woman.jpeg";
import TripSearcher from "../../shared/TripSearcher/TripSearcher";

const styles = theme => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    overflow: "hidden",
    minHeight: "320px"
  },
  searcher: {
    flexGrow: 1,
    marginTop: "25%"
  }
});

const HomeView = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.root}>
        <div className={classes.searcher}>
          <TripSearcher />
        </div>
      </div>
      <RegisterNewTrip />
    </>
  );
};

export default withStyles(styles)(HomeView);

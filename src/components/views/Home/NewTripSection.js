import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import driverImage from "../../../images/driver.jpg";

const styles = theme => ({
  root: {
    display: "flex",
    padding: "4%",
    justifyContent: "center",
    textAlign: "center"
  },
  imageContainer: {
    display: "none",
    "@media (min-width:768px)": {
      display: "flex"
    }
  },
  paper2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "90%",
    color: theme.palette.text.secondary
  },
  button: {
    marginTop: "20px",
    textAlign: "center",
    margin: theme.spacing.unit
  },
  demo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute"
  }
});

const NewTripSection = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img alt="" src={driverImage} />
      </div>
      <div className={classes.paper2}>
        <Typography variant="display1">¿Cansado de viajar solo?</Typography>
        <Typography variant="display1">
          Encuentra una compañia de viaje..
        </Typography>
        <div style={{ paddingTop: 20, paddingBottom: 20, maxWidth: "300px" }}>
          <Typography variant="headline">
            Conoce nueva gente, convierte tu viaje más divertido y económico.
          </Typography>
        </div>
        <Button
          component={Link}
          to="/TripCreator"
          className={classes.button}
          variant="raised"
          color="primary"
        >
          Nuevo viaje
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NewTripSection);

import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import driverImage from "../../../images/driver.jpg";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import Auth from "../../Auth/Auth";

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
  //new trip section
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "auto",
    padding: 20,
    paddingTop: 80,
    paddingBottom: 80
  },
  title: {
    color: "#2f2f81",
    fontWeight: "bold",
    paddingBottom: 8,
    fontSize: "2.5rem"
  },
  subtitle: {
    color: "#45459c",
    textAlign: "center",
    fontSize: "1.6rem",
    maxWidth: 300,
    paddingBottom: 30
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
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const NewTripSection = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img alt="" src={driverImage} />
      </div>
      <div className={classes.container}>
        <Typography variant={"h4"} className={classes.title}>
          ¿Cansado de viajar solo?
        </Typography>
        <Typography variant={"h6"} className={classes.subtitle}>
          Conoce nueva gente, convierte tu viaje más divertido y económico.
        </Typography>

        <Button
          component={Link}
          to={Auth.getUserID() ? "/TripCreator" : "/login"}
          className={classes.button}
          variant="raised"
          color="primary"
        >
          Nuevo viaje
          <CardTravelIcon className={classes.rightIcon} />
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NewTripSection);

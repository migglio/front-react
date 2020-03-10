import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import routes, {
  TRIP_WITH_ID_PATH,
  TRIP_CREATOR_PATH
} from "../../constants/routes";
import Auth from "../Auth/Auth";
import { tripDeleted } from "../../constants/notificationTypes";
import { notifications } from "../../api/Notifications";

const styles2 = theme => ({
  root: {
    padding: "1%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    height: 25,
    width: 25
  },
  details: {
    padding: "1%",
    justifyContent: "space-between"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  separator: {
    borderRight: `2px solid ${theme.palette.divider}`
  },
  paddingTrip: {
    padding: "1% 3% 1% 1%"
  },
  columnFlex1: {
    "flex-grow": "1"
  },
  columnFlex4: {
    "flex-grow": "3",
    "text-align": "left",
    marginLeft: "2%"
  },
  button: {
    background: "#EB1B00",
    color: "white",
    marginRight: "3%"
  }
});

const ButtonPanel = ({ classes, tripData, newTrips }) => {
  const postNotification = async (owner, idTrip, type, users) => {
    await notifications().postNotification(owner, idTrip, type, users);
  };

  const handleDeleteById = async () => {
    //await trips().deleteTrip(tripData._id);
    console.log(tripData);
    const users =
      tripData.steps[0].passengers.users.concat[
        tripData.steps[0].passengers.pendingUsers
      ];
    console.log(users);
    postNotification(Auth.getUserID(), tripData._id, tripDeleted, users);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        component={Link}
        to={routes().trips[TRIP_WITH_ID_PATH] + "/" + tripData._id}
        className={classes.button}
        variant="raised"
        id="detalles-button"
      >
        Detalles
      </Button>
      {newTrips && !tripData.reservation && (
        <Button
          href={"ViewWaitingPassengers?id=" + tripData._id}
          tripData={tripData}
          className={classes.button}
          variant="raised"
        >
          Solicitudes
        </Button>
      )}
      {newTrips && (
        <>
          <Button
            component={Link}
            to={routes().trips[TRIP_CREATOR_PATH] + "/" + tripData._id}
            className={classes.button}
            variant="raised"
          >
            Editar
          </Button>
          <Button
            onClick={handleDeleteById}
            className={classes.button}
            variant="raised"
          >
            Borrar
          </Button>
        </>
      )}
    </div>
  );
};

export default withStyles(styles2)(ButtonPanel);

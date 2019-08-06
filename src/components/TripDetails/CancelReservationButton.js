import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Cancel from "@material-ui/icons/Cancel";

const styles = theme => ({
  button: {
    background: "#EB1B00",
    color: "white",
    marginRight: "3%"
  }
});

function getType(automatic) {
  if (automatic) return "Join to the trip";
  return "Send Request";
}

function CancelReservationButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        className={classes.button}
        variant="raised"
        onClick={props.cancelReservation}
      >
        <Cancel />
        Cancelar Reserva
      </Button>
    </div>
  );
}

CancelReservationButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CancelReservationButton);

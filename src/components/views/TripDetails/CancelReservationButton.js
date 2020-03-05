import React from "react";
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
  if (automatic) return "Unirse";
  return "Enviar Solicitud";
}

const CancelReservationButton = ({ classes }) => {
  return (
    <Button
      className={classes.button}
      variant="raised"
      onClick={props.cancelReservation}
    >
      <Cancel />
      Cancelar Reserva
    </Button>
  );
};

export default withStyles(styles)(CancelReservationButton);

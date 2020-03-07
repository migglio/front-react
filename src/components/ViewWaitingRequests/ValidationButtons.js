import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles2 = theme => ({
  root: {
    padding: "1%"
  },
  button: {
    background: "#EB1B00",
    color: "white",
    marginRight: "3%"
  }
});

const ValidationButtons = ({
  classes,
  confirmPassengers,
  denyPassengers,
  disabled
}) => {
  return (
    <div className={classes.root}>
      <Button
        disabled={disabled}
        onClick={confirmPassengers}
        className={classes.button}
        variant="raised"
      >
        Aceptar
      </Button>
      <Button
        disabled={disabled}
        onClick={denyPassengers}
        className={classes.button}
        variant="raised"
      >
        Rechazar
      </Button>
    </div>
  );
};

export default withStyles(styles2)(ValidationButtons);

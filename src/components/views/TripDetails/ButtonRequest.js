import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PersonAdd from "@material-ui/icons/PersonAdd";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

const ButtonRequest = ({
  classes,
  joinToTheTrip,
  automatic,
  completed,
  past
}) => {
  return (
    <Button
      disabled={completed || past}
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={joinToTheTrip}
    >
      <PersonAdd />
      {automatic ? "Unirse" : "Enviar Solicitud"}
    </Button>
  );
};

export default withStyles(styles)(ButtonRequest);

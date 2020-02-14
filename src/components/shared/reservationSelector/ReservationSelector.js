import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Security from "@material-ui/icons/Security";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  icon: {
    height: 30,
    width: 30
  }
});

const ReservationSelector = ({ classes, onChange }) => {
  const [reservation, setReservation] = useState(false);

  const handleChange = () => {
    setReservation(!reservation);
    if (onChange) onChange(!reservation);
  };

  const title = reservation ? "Reserva Automática" : "Reserva Segura";
  return (
    <Button name="reservation" onClick={handleChange}>
      <Tooltip title={title} placement="top">
        <div style={{ display: "flex" }}>
          <Security
            className={classes.icon}
            style={{
              color: reservation ? green[900] : red[900]
            }}
          />
        </div>
      </Tooltip>
    </Button>
  );
};

export default withStyles(styles)(ReservationSelector);

import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonOutline from "@material-ui/icons/PersonOutline";

const styles = theme => ({
  input: {
    paddingTop: "2vh",
    paddingBottom: "2vh",
    width: "60%"
  }
});

const errorMessage = "Número de pasajeros invalido";

const SeatSelector = ({ classes, label, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const [touch, setTouch] = useState(false);

  const handleBlur = () => {
    setTouch(true);
  };

  const handleChange = event => {
    setTouch(false);
    setValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  const showError = touch && (!value || value < 0);
  return (
    <div className={classes.input}>
      <TextField
        fullWidth
        name="seats"
        label={label}
        type="number"
        placeholder="Ejemplo: 3"
        min="1"
        id="inputSeats"
        defaultValue={value}
        onChange={handleChange}
        onBlur={handleBlur}
        InputProps={{
          min: "1",
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutline />
            </InputAdornment>
          )
        }}
        endAdornment={<InputAdornment position="end">Pasajeros</InputAdornment>}
        error={showError}
        required
        helperText={showError ? errorMessage : ""}
      />
    </div>
  );
};

export default withStyles(styles)(SeatSelector);

import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";

const styles = theme => ({
  input: {
    paddingTop: "2vh",
    paddingBottom: "2vh",
    width: "60%"
  }
});

const errorMessage = "Requerido";

const CarSelector = ({ classes, label, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const [touch, setTouch] = useState(false);

  const handleBlur = () => {
    setTouch(true);
  };

  const handleValue = event => {
    setTouch(false);
    setValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  const showError = touch && !value;
  return (
    <div className={classes.input}>
      <TextField
        fullWidth
        label={label}
        onBlur={handleBlur}
        onChange={handleValue}
        name="car"
        type="text"
        placeholder="Ejemplo: Ford Focus"
        id="inputCar"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DirectionsCarIcon />
            </InputAdornment>
          )
        }}
        defaultValue={value}
        error={showError}
        required
        helperText={showError ? errorMessage : ""}
      />
    </div>
  );
};

export default withStyles(styles)(CarSelector);

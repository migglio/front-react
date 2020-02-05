import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AttachMoney from "@material-ui/icons/AttachMoney";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  subtitle: {
    paddingTop: "2vh",
    paddingBottom: "2vh"
  },
  input: {
    paddingTop: "2vh",
    paddingBottom: "2vh",
    width: "60%"
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  preferencesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "2vh"
  },
  details: {
    padding: "2vw"
  },
  icon: {
    height: 30,
    width: 30
  }
});

const errorMessage = "Precio invalido";

const PriceSelector = ({ classes, label, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const [touch, setTouch] = useState(false);

  const handleBlur = () => {
    setTouch(true);
  };

  const handleValue = event => {
    setTouch(false);
    setValue(event.target.value);
  };

  const showError = touch && (!value || value < 0);
  return (
    <div className={classes.input}>
      <TextField
        fullWidth
        label={label}
        onBlur={handleBlur}
        onChange={handleValue}
        name="price"
        type="number"
        placeholder="Ejemplo: $200"
        min="1"
        id="inputPrice"
        defaultValue={value}
        InputProps={{
          min: "1",
          startAdornment: (
            <InputAdornment position="start">
              <AttachMoney />
            </InputAdornment>
          )
        }}
        endAdornment={
          <InputAdornment position="end">Precio por pasajero</InputAdornment>
        }
        error={showError}
        required
        helperText={showError ? errorMessage : ""}
      />
    </div>
  );
};

export default withStyles(styles)(PriceSelector);

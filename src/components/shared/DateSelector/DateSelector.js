import React, { useState } from "react";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import TextField from "@material-ui/core/TextField";
import DateRange from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  dateSelector: {
    width: "100%"
  }
});

const DateSelector = ({ date, onChange, classes }) => {
  const [value, setValue] = useState(date);

  console.log("vlaue", value);

  const handleDateChange = event => {
    setValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale="ar">
      <TextField
        className={classes.dateSelector}
        id="date"
        type="date"
        label="Fecha del viaje"
        value={value}
        onChange={handleDateChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRange />
            </InputAdornment>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(DateSelector);

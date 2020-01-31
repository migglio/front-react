import React from "react";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import AccessTime from "@material-ui/icons/AccessTime";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  dateSelector: {
    paddingBottom: "3vh",
    width: "100%"
  }
});

const TimeSelector = ({ classes, label, onChange, value }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TextField
        className={classes.dateSelector}
        id="time"
        label={label}
        type="time"
        onChange={event => onChange(event.target.value)}
        value={value ? value : null}
        InputProps={{
          step: 300, // 5 min
          startAdornment: (
            <InputAdornment position="start">
              <AccessTime />
            </InputAdornment>
          )
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(TimeSelector);

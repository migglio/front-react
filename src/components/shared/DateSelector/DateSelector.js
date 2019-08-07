import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateSelector from "../../DateSelector";

const useStyles = makeStyles({
  grid: {
    width: "60%"
  }
});

DateSelector = () => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  const classes = useStyles();
  return (
    <KeyboardDatePicker
      margin="normal"
      id="date-Selector"
      label="Date picker"
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default DateSelector;

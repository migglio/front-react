import React from "react";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import TextField from "@material-ui/core/TextField";
import DateRange from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";

const styles2 = theme => ({
  dateSelector: {
    width: "100%"
  }
});

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.date
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = e => {
    this.setState({ selectedDate: e.target.value });
    this.props.callback(e.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TextField
          className={classes.dateSelector}
          id="date"
          type="date"
          label="Trip date"
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
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
  }
}

export default withStyles(styles2)(DateSelector);

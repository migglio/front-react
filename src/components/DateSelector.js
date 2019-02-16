import React from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

class DateSelector extends React.Component{
  constructor(props) {
      super(props)
      this.state={
        selectedDate: props.date
      }
      this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date){
    this.setState({
      selectedDate: date,
    });
    this.props.callback(date);
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Trip Date"
        clearable
        required
        value={this.state.selectedDate}
        onChange={this.handleDateChange}
      />
      </MuiPickersUtilsProvider>

    );
  }
}

export default DateSelector;
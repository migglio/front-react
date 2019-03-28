
import React from 'react';
import { Grid } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import MySearchPlaceComponent from '../GoogleMapAPI/CitySearcher.js'
import Button from "@material-ui/core/Button";
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import blue from '@material-ui/core/colors/blue';
import DateSelector from '../../DateSelector'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import AccessTime from '@material-ui/icons/AccessTime';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles2 = theme => ({
	icon: {
	  height: 30,
	  width: 30,
	},
  });

const moment = require('moment');

class MeetingDataView extends React.Component {
	constructor(props) {
        super(props);

        this.updateDate = this.updateDate.bind(this);
		this.updateFrom = this.updateFrom.bind(this);
        this.updateTo = this.updateTo.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.changeOrder = this.changeOrder.bind(this);

    }

    	//Callbacks functions
	updateDate(date){
		this.props.updateDate(date);
	}

	updateFrom(fromUpdated){
        this.props.updateFrom(fromUpdated);
	}

	updateTo(toUpdated){
        this.props.updateTo(toUpdated);
	}

	updateTime = (e) => {
        this.props.updateTime(e.target.value);
    }
    
    changeOrder(){
        this.props.changeOrder();
    }



    render(){
        const { classes } = this.props;
        return(
            <div >
                <Grid container spacing={24}>
                    <Grid class ='centerRow' item xs={10}>  
                        <br/>
                        <FormLabel component="legend">Schedule</FormLabel>
                    </Grid>
                <Grid class ='centerRow' item xs={12} >
                    <MySearchPlaceComponent callback={this.updateFrom} name={this.props.tripData.steps[0].name} steps={this.props.tripData.steps}/>
                    <Button onClick={this.changeOrder}>
                        <SwapVerticalCircle className={classes.icon} style={{ color:blue[900]}}/>
                    </Button>
                    <MySearchPlaceComponent callback={this.updateTo} name={this.props.tripData.steps[1].name} steps={this.props.tripData.steps}/>
                </Grid> 				
                <Grid class ='centerRow' item xs={12} >
                    <br/>
                    <hr/>
                    <FormLabel component="legend">Date and time</FormLabel>
                    <br/>
                </Grid>
                <Grid container spacing={40} direction="column" alignItems="center" justify="center" item xs={12}>
                    <DateSelector label='Trip date' callback={this.updateDate} date={moment(this.props.tripData.steps[0].date).format('YYYY-MM-DD')}/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TextField id="time" label="Trip Time" type="time" onChange={this.updateTime} value={moment(this.props.tripData.steps[0].date).format("HH:mm")}
                            InputProps={{
                                step: 300, // 5 min
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccessTime />
                                  </InputAdornment>
                                ),
                              }}
                  
                        />
                    </MuiPickersUtilsProvider>
            </Grid>

            </Grid>
            <br/>
        </div>
        );					
    }
}

export default withStyles(styles2)(MeetingDataView);
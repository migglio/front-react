
import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../index.css'
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Restaurant from '@material-ui/icons/Restaurant';
import Security from '@material-ui/icons/Security';
import LocalCafe from '@material-ui/icons/LocalCafe';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles2 = theme => ({
	icon: {
	  height: 30,
	  width: 30,
	},
  });


class MeetingDataView extends React.Component {
	constructor(props) {
        super(props);
    }

    	//Get value entered by user
	handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.props.handleUserInput(name, value);
	}

	handleReservation = (e) => {
        this.props.handleReservation();
	}

	handleFood = (e) => {
        this.props.handleFood();
	}

	handleMate = (e) => {
        this.props.handleMate();
	}

	handleDetails = (e) => {
        this.props.handleDetails(e.target.value);
	}


render(){
    const { classes } = this.props;

    return(
		<div>
			<div>
			<Grid container spacing={40}>
				<Grid class ='centerRow' item xs={10}>
					<br/><br/>
					<FormLabel component="legend">Car specifications</FormLabel>		
				</Grid>
				<Grid container spacing={40} direction="row" alignItems="center" justify="center" item xs={10}>
					<TextField
								name='price'
								label='Price'
								type="number"
								placeholder='Example: $200'
								min="1"
								id="inputPrice"
								defaultValue={this.props.tripData.steps[0].price}
								onChange={this.handleUserInput}
								inputProps={{ min: "1" }}
								endAdornment={<InputAdornment position="end">Precio por pasajero</InputAdornment>}
								error={this.props.tripData.errors['price']}
								required
								helperText={this.props.tripData.errors['price']}		
							/>
					<TextField
								name='seats'
								label='Seats'
								type="number"
								placeholder='Example: 3'
								min="1"
								id="inputSeats"
								defaultValue={this.props.tripData.seats}
								onChange={this.handleUserInput}
								inputProps={{ min: "1" }}
								endAdornment={<InputAdornment position="end">Passengers</InputAdornment>}
								error={this.props.tripData.errors['seats']}
								required
								helperText={this.props.tripData.errors['seats']}				
							/>
					<TextField
							name='car'
							label='Car'
							type="text"
							placeholder='Example: Ford Focus'
							id="inputCar"
							defaultValue={this.props.tripData.car}
							onChange={this.handleUserInput}
							error={this.props.tripData.errors['car']}
							required
							helperText={this.props.tripData.errors['car']}				
						/>	
				</Grid>
				<br/>

				<Grid class ='centerRow' item xs={10}>
					<hr/>
					<FormLabel component="legend">Driver's Preferences</FormLabel>
				</Grid>
				<br/>
				<Grid container spacing={40} direction="row" alignItems="center" justify="center" item xs={10}>

					<Button name='reservation'  onClick={this.handleReservation}>
						<Tooltip title={this.props.tripData.reservation ? "Automatic Reservation": "Secure Reservation"} placement="top">
							<div style={{ display: 'flex'}}>
								<Security className={classes.icon} style={{ color: this.props.tripData.reservation ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
					</Button>

					<Button name='food'  onClick={this.handleFood}>
						<Tooltip title={this.props.tripData.food ? "Food Allowed": "Food not Allowed"} placement="top">
							<div style={{ display: 'flex'}}>
								<Restaurant className={classes.icon} style={{ color: this.props.tripData.food ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
					</Button>

					<Button name='mate'  onClick={this.handleMate}>
						<Tooltip title={this.props.tripData.mate ? "Mate Allowed": "Mate not Allowed"} placement="top">
							<div style={{ display: 'flex'}}>
								<LocalCafe className={classes.icon} style={{ color: this.props.tripData.mate ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
					</Button>
				</Grid>
				

				<Grid class ='centerRow' item xs={12} >
				<hr/>

					<TextField  
						id="inputDetails"
						name='details' 
						value={this.props.tripData.details}
						onChange={this.handleDetails}
						label="Details"
						multiline
						rows={4}
						rowsMax="4"
						margin="normal"		  
						fullWidth
						placeholder="Details..." />
				</Grid>

			</Grid>
			<br/>

			</div>


		</div>
    );					
    }
}

export default withStyles(styles2)(MeetingDataView);
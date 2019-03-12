import React from 'react';
import MySearchPlaceComponent from './GoogleMapAPI/CitySearcher.js'
import MyMapComponent from "./GoogleMapAPI/Map.js"
import StepListView from './ComponentView/StepListView.js';
import TripSaver from './ComponentView/OptionView.js';
import TextField from '@material-ui/core/TextField';
import './index.css'
import DateSelector from '../DateSelector'
import axios from 'axios'
import url from '../../config.js'
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from "@material-ui/core/InputAdornment";
import TravelSteps from './TravelSteps.js'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import DetailedStepPanel from './StepCreator.js'
import Button from "@material-ui/core/Button";
import { Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import ResumeTrip from './ComponentView/ResumeTrip.js';
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
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
  
class OfferARide extends React.Component {
	constructor(props, context) {
		super(props, context)
		
		const origin = this.getStepEmpty();
		const destination = this.getStepEmpty();

		this.state = {
			//each step should have a name, location, price and time
			steps:[ origin, destination], 
			//attributes in common both main and step trip but specially after a reservation 
			seats: undefined,
			//attributes in common both main and step trip 
			date: undefined,
			reservation: false,
			food: false,
			mate: false,
			car: '',
			details: '',
			errors:{
				seats:'',
				car:''
			}
		}

		//Callbacks functions
		this.updateDate = this.updateDate.bind(this);
		this.updateFrom = this.updateFrom.bind(this);
		this.updateTo = this.updateTo.bind(this);
		this.addStep = this.addStep.bind(this);
		this.updateStep = this.updateStep.bind(this);
		this.deleteStep = this.deleteStep.bind(this);	
		this.changeOrder = this.changeOrder.bind(this);
		
		//Validation Methods
		this.validateStep = this.validateStep.bind(this);
		
		//db methods
		this.processForm = this.processForm.bind(this);

		//UI function
		this.getSection = this.getSection.bind(this);
		
		//init default value easily
		this.getStepEmpty= this.getStepEmpty.bind(this);
	}

	//Returns a new step with default values
	getStepEmpty(){
		return ( {
			location:{lat:undefined, lng:undefined},
			name:undefined, 
			price:undefined, 
			time:'',
			date:false, 
			passengers: {total:1, users:[] }
			});
	}

	//update Value for each step
	updateStepsInfo(){
		let list = this.state.steps;
		for (let index = 0; index < list.length; index++){
			list[index].passengers.total = this.state.seats;
			list[index].date = this.state.date;
		}
		this.setState({steps:list}) 
	}

	//Get value entered by user
	handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value
		const errs = this.state.errors;
		errs[name]= this.getError(value);

		const list = this.state.steps;
		this.setState({[name]: value, errors:errs, steps:list})
	}

	handleReservation = (e) => {
		this.setState({reservation: !this.state.reservation})
	}

	handleFood = (e) => {
		this.setState({food: !this.state.food})
	}

	handleMate = (e) => {
		this.setState({mate: !this.state.mate})
	}

	handleDetails = (e) => {
		this.setState({details: e.target.value})
	}

	//Callbacks functions
	updateDate(date){
		this.setState({date:date});
	}

	updateFrom(fromUpdated){
		const list = this.state.steps;
		list[0].name = fromUpdated.name;
		list[0].location = fromUpdated.location;
		this.setState({steps:list});
	}

	updateTo(toUpdated){
		const list = this.state.steps;
		list[list.length-1].name = toUpdated.name;
		list[list.length-1].location = toUpdated.location;
		this.setState({steps:list});
	}

	updateTime = (e) => {
		const list = this.state.steps;
		//update just the time from the first step
		list[0].time = e.target.value;
		this.setState({steps:list});
	}

	addStep(step){
		const list = this.state.steps;
		const newStep = this.getStepEmpty();
		newStep.location = step.location;
		newStep.name = step.name; 
		list.splice(list.length-1, 0, newStep);
		this.setState({steps:list});
	}

	updateStep(step, index){
		const list = this.state.steps;
		//delete one element in index position and insert step in the same pos
		list.splice(index, 1, step);
		this.setState({steps:list});
	}

	deleteStep(index){
		const list = this.state.steps;
		//delete one element in index position 
		list.splice(index+1, 1);
		this.setState({steps:list});
	}
	
	changeOrder(){
		const list = this.state.steps
		const first = list[0];
		const last = list[list.length-1];
		list[0] = last;
		list[list.length-1] = first;
		this.setState({steps:list})

	}

	//Validation methods
	validateFistStep(){
		return false;
		if (this.state.steps[0].location.lat===undefined || this.state.steps[this.state.steps.length-1].location.lat===undefined)
			return true;
		if (this.state.steps[0].time==='')
			return true;
		return false;
	}

	validateSecondStep(){
		return false; //borrar linea desp de terminar
		if (this.state.seats == undefined  || this.getError(this.state.seats) )
			return true;

		if ( (this.state.date == undefined) )
			return true

		for (let index = 0; index < this.state.steps.length-1; index++) {
			if ( (this.state.steps[index].price == undefined) || this.getError(this.state.steps[index].price) )
				return true
			if ( (this.state.steps[index].time == undefined) )
				return true
			
		}
		return false;
	}

	validateStep(step){
		switch(step){
			case 0: 
				return this.validateFistStep();
				break
			case 1: 
				return this.validateSecondStep();
				break
			case 2: 
				return (this.state.car == '')
				break
			default:
				break
		}
	}

	getError(value){
		if (!value)
			return 'Field required'	
		else
		if (value<1)
			return 'It must be a positive number'
		else
			return ''
	}

	//Returns View for select each city of the one trip
	getFirstStepView(){
		const { classes } = this.props;

		return(
			<div >
				<Grid container spacing={24}>
					<Grid class ='centerRow' item xs={10}>  
						<br/>
						<FormLabel component="legend">Schedule</FormLabel>
					</Grid>
				<Grid class ='centerRow' item xs={12} >
					<MySearchPlaceComponent callback={this.updateFrom} name={this.state.steps[0].name} steps={this.state.steps}/>
					<Button onClick={this.changeOrder}>
						<SwapVerticalCircle className={classes.icon} style={{ color:blue[900]}}/>
					</Button>
					<MySearchPlaceComponent callback={this.updateTo} name={this.state.steps[this.state.steps.length-1].name} steps={this.state.steps}/>
					<hr/>
				</Grid> 				
				<Grid class ='centerRow' item xs={12} >
					<FormLabel component="legend">Date and time</FormLabel>
				</Grid>
				<Grid class='centerRow' item xs={10} sm={6}>
					<DateSelector label='Trip date' callback={this.updateDate} date={this.state.date}/>
					<TextField id="time" label="Trip Time" type="time" onChange={this.updateTime} value={this.state.steps[0].time}
						inputProps={{ step: 300 }} // 5 min 
					/>
			</Grid>

			</Grid>
			<br/>
		</div>
		);					
	}
		
	//Returns View for select date, seats and price of trip
	getSecondStepView(){
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
								defaultValue={this.state.price}
								onChange={this.handleUserInput}
								inputProps={{ min: "1" }}
								endAdornment={<InputAdornment position="end">Precio por pasajero</InputAdornment>}
								error={this.state.errors['price']}
								required
								helperText={this.state.errors['price']}				
							/>

					<TextField
								name='seats'
								label='Seats'
								type="number"
								placeholder='Example: 3'
								min="1"
								id="inputSeats"
								defaultValue={this.state.seats}
								onChange={this.handleUserInput}
								inputProps={{ min: "1" }}
								endAdornment={<InputAdornment position="end">Passengers</InputAdornment>}
								error={this.state.errors['seats']}
								required
								helperText={this.state.errors['seats']}				
							/>
					<TextField
							name='car'
							label='Car'
							type="text"
							placeholder='Example: Ford Focus'
							id="inputCar"
							defaultValue={this.state.car}
							onChange={this.handleUserInput}
							error={this.state.errors['car']}
							required
							helperText={this.state.errors['car']}				
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
						<Tooltip title={this.state.reservation ? "Automatic Reservation": "Secure Reservation"} placement="top">
							<div style={{ display: 'flex'}}>
								<Security className={classes.icon} style={{ color: this.state.reservation ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
					</Button>

					<Button name='food'  onClick={this.handleFood}>
						<Tooltip title={this.state.reservation ? "Food Allowed": "Food not Allowed"} placement="top">
							<div style={{ display: 'flex'}}>
								<Restaurant className={classes.icon} style={{ color: this.state.food ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
					</Button>

					<Button name='mate'  onClick={this.handleMate}>
						<Tooltip title={this.state.mate ? "Mate Allowed": "Mate not Allowed"} placement="top">
							<div style={{ display: 'flex'}}>
								<LocalCafe className={classes.icon} style={{ color: this.state.mate ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
					</Button>
				</Grid>
				

				<Grid class ='centerRow' item xs={12} >
				<hr/>

					<TextField  
						id="inputDetails"
						name='details' 
						value={this.state.details}
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

	getThirdStepView(){
		return(
			<div>
				<ResumeTrip tripData={this.state}></ResumeTrip>
			</div>
			
		);
	}	
	

	//Return a view for each step. UI method
	getSection(step){
		switch(step) {
			case 0:
				return this.getFirstStepView();
				break;
			case 1:
				return this.getSecondStepView();
				break;
			case 2:
				return this.getThirdStepView();
				break;
			default:
				break;
		}
	}

	//Save a new trip into db 
	processForm(event) {
		//Copy number of passengers and date before saving the trip
		this.updateStepsInfo();
		// prevent default action. in this case, action is the form submission event
		event.preventDefault()

		const userData = {
			steps: this.state.steps,
			description: this.state.details,
			vehiculo: this.state.car,
			automaticReservation: this.state.reservation,
		}

		axios.post(url.socket + 'api/trips', userData, url.config)
		.then((response) => {
			this.addNotification('success', 'You successfully added')
		})
		.catch((error) => {
			console.log(error)}
		)
	}

	render(){
		return(
			<div style={{paddingLeft:"10%", paddingRight:"10%"}} >
				<h1>Offer a ride</h1>
				<Grid container spacing={40} class ='row rowCenter'>
					<Grid item xs={12} >
						<TripSaver getSection={this.getSection} validateStep={this.validateStep} callback={this.processForm}/>
					</Grid>
					<Grid item xs={12} >
						<h3>View of our travel</h3>
						<MyMapComponent steps={this.state.steps}/>
					</Grid>
				</Grid>
			</div>
			);
	}

}

export default withStyles(styles2)(OfferARide);

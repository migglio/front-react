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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from "@material-ui/core/InputAdornment";
import TravelSteps from './TravelSteps.js'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import DetailedStepPanel from './StepCreator.js'
import Button from "@material-ui/core/Button";
import { Grid } from '@material-ui/core';

export default class OfferARide extends React.Component {
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
			details: undefined,
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
			time:undefined,
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
	
	handleUserCheck = (e) => {
        const name = e.target.name
		const value = e.target.checked
		this.setState({[name]: value})
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
		if (this.state.steps[0].location.lat==undefined || this.state.steps[this.state.steps.length-1].location.lat==undefined)
			return true;
		return false;
	}

	validateSecondStep(){
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
		return(
			<div>
				<div class='row centerRow' fullWidth>
					<MySearchPlaceComponent callback={this.updateFrom} name={this.state.steps[0].name} steps={this.state.steps}/>
					<Button onClick={this.changeOrder}>swap</Button>
					<MySearchPlaceComponent callback={this.updateTo} name={this.state.steps[this.state.steps.length-1].name} steps={this.state.steps}/>
				</div>
				<DetailedStepPanel steps={this.state.steps} newStep={this.getStepEmpty} callback={this.addStep}/> <br/> <br/>
				<TravelSteps steps={this.state.steps} newStep={this.getStepEmpty} addStep={this.updateStep} deleteStep={this.deleteStep}/>
			</div>
			);					
	}
		
	//Returns View for select date, seats and price of trip
	getSecondStepView(){
		return(
			<div> <hr/>
				<FormControl fullWidth class="inline fields">
					<DateSelector label='Trip date' callback={this.updateDate} date={this.state.date}/>
					<FormControl>
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
					</FormControl> <br/>

				</FormControl> <br/>
				<StepListView steps={this.state.steps} updateStep={this.updateStep}/>
		</div>
		);

	}

	getThirdStepView(){
		return(
			<div>
				<FormControl component="fieldset">
					<FormLabel component="legend">Driver's Preferences</FormLabel>
					<FormGroup>
					<FormControlLabel
						control={
						<Switch
							name='reservation'
							checked={this.state.reservation}
							onChange={this.handleUserCheck}
						/>
						}
						label="Automatic Reservation"
					/>
					<FormControlLabel
						control={
						<Switch
							name='food'	
							checked={this.state.food}
							onChange={this.handleUserCheck}
						/>
						}
						label="Food Allowed"
					/>
					<FormControlLabel
						control={
						<Switch
							name='mate'
							checked={this.state.mate}
							onChange={this.handleUserCheck}
						/>
						}
						label="Mate allowed"
					/>
					</FormGroup>
				</FormControl> <br/>
				<FormControl>
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
				</FormControl> <br/>

						
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
			<div >
				<h1>Offer a ride</h1>
				<div class='row'>
					<div class='column'>
						<Grid>
						<TripSaver getSection={this.getSection} validateStep={this.validateStep} callback={this.processForm}/>
						</Grid>
					</div>

					<div class='column'>
						<h3>View of our travel</h3>
						<MyMapComponent steps={this.state.steps}/>
					</div>
				</div>
			</div>

			);
	}

}


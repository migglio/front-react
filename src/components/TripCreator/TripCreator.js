import React from 'react';
import MyMapComponent from "./GoogleMapAPI/Map.js"
import OptionView from './ComponentView/OptionView.js';
import './index.css'
import { Grid } from '@material-ui/core';
import ResumeTrip from './ComponentView/ResumeTrip.js';
import { withStyles } from '@material-ui/core/styles';
import MeetingDataView from './ComponentView/MeetingDataView'
import PreferencesView from './ComponentView/PreferencesView'

const styles2 = theme => ({
	icon: {
	  height: 30,
	  width: 30,
	},
  });

  const moment = require('moment');
  var NotificationSystem = require('react-notification-system')

  
class OfferARide extends React.Component {
	constructor(props, context) {
		super(props, context)
		
		const origin = this.getStepEmpty();
		const destination = this.getStepEmpty();

		this.state = {
			//each step should have a name, location, price and time
			steps:[ origin, destination], 
			//attributes in common both main and step trip but specially after a reservation 
			seats: '',
			//attributes in common both main and step trip 
			date: '',
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

		//Callback functions
		//Callback functions from MeetingDataView
		this.updateDate = this.updateDate.bind(this);
		this.updateFrom = this.updateFrom.bind(this);
		this.updateTo = this.updateTo.bind(this);
		this.updateTime = this.updateTime.bind(this);
		this.changeOrder = this.changeOrder.bind(this);


		//Callback functions from PreferencesView
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleReservation = this.handleReservation.bind(this);
		this.handleMate = this.handleMate.bind(this);
		this.handleFood = this.handleFood.bind(this);
		this.handleDetails = this.handleDetails.bind(this);


		this.addStep = this.addStep.bind(this);
		this.updateStep = this.updateStep.bind(this);
		this.deleteStep = this.deleteStep.bind(this);	
		
		//Validation Methods
		this.validateStep = this.validateStep.bind(this);
		
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
			price:'', 
			time:'',
			date:'', 
			passengers: {total:1, users:[] }
			});
	}

	//Get value entered by user
	handleUserInput = (name, value) => {
		const errs = this.state.errors;
		errs[name]= this.getError(value);

		const list = this.state.steps;

		if (name === 'price'){
			list[0].price = value;
			this.setState({ errors:errs, steps:list});
		}
		else
			this.setState({[name]: value, errors:errs, steps:list})
	}

	handleReservation = () => {
		this.setState({reservation: !this.state.reservation})
	}

	handleFood = () => {
		this.setState({food: !this.state.food})
	}

	handleMate = () => {
		this.setState({mate: !this.state.mate})
	}

	handleDetails = (value) => {
		this.setState({details: value})
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

	updateTime(value) {
		const list = this.state.steps;
		//update just the time from the first step
		list[0].time = value;
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
//		return false; //borrar linea desp de terminar
		if (this.state.steps[0].location.lat===undefined || this.state.steps[this.state.steps.length-1].location.lat===undefined)
			return true;
		if (this.state.steps[0].time==='')
			return true;
		if (this.state.date==='')
			return true;
		return false;
	}

	validateSecondStep(){
//		return false; //borrar linea desp de terminar
		if (this.state.seats == ''  || this.getError(this.state.seats) )
			return true;

		if (this.state.car == '' )
			return true;


		for (let index = 0; index < this.state.steps.length-1; index++) {
			if ( (this.state.steps[index].price === '') || this.getError(this.state.steps[index].price) )
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
				return false;
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
		return (
			<MeetingDataView tripData={this.state} updateDate={this.updateDate} updateFrom={this.updateFrom} updateTo={this.updateTo} updateTime={this.updateTime} changeOrder={this.changeOrder}></MeetingDataView>
		);
	}

	//Returns View for select date, seats and price of trip
	getSecondStepView(){
		return(
			<PreferencesView tripData={this.state} handleUserInput={this.handleUserInput} handleReservation={this.handleReservation} handleMate={this.handleMate} handleFood={this.handleFood} handleDetails={this.handleDetails}></PreferencesView>
		);
	}

	getThirdStepView(){
		return(
			<ResumeTrip tripData={this.state}></ResumeTrip>			
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


	render(){
		return(
			<div style={{paddingLeft:"10%", paddingRight:"10%"}} >
				<h1>Offer a ride</h1>
				<Grid container spacing={24} class ='row'>
					<Grid item xs={12} >
						<OptionView tripData={this.state} getSection={this.getSection} validateStep={this.validateStep} callback={this.processForm}/>
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

import React from 'react';
import MyMapComponent from "./GoogleMapAPI/Map.js"
import OptionView from './ComponentView/OptionView.js';
import './index.css'
import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Auth from '../Auth/Auth.js';
import axios from 'axios'
import url from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress';

const queryString = require('query-string');

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
			//TODO: owner harcoded CHANGEEE!!!!!
			owner: Auth.getUserID(), 
			//each step should have a name, location, price and time
			steps:[ origin, destination], 
			//attributes in common both main and step trip but specially after a reservation 
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
			},
			idTrip: queryString.parse(this.props.location.search),
			loaded: false,
			toUpdate: false
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
	}

		//Carga de Datos
		componentDidMount() {
			if (this.state.idTrip.id !== undefined)
				axios.get(url.api+'trips/'+this.state.idTrip.id)
				.then((response)=>{
					this.setState({
						steps: response.data.steps,
						reservation: response.data.automaticReservation,
						food: response.data.food,
						mate: response.data.mate,
						car: response.data.vehiculo,
						details: response.data.description,
						owner: response.data.owner,
						loaded:true,
						toUpdate: true
					});
					this.state.steps[0].date = new Date(this.state.steps[0].date);					
				})
			else
				this.setState({loaded:true})
		}	


	//Returns a new step with default values
	getStepEmpty(){
		//init default value easily
		return ( {
			location:{lat:undefined, lng:undefined},
			name:undefined, 
			price:'', 
			time:'',
			date:'', 
			passengers: {total:'', users:[], pendingUsers: [] }
			});
	}

	//Get value entered by user
	handleUserInput = (name, value) => {
		const errs = this.state.errors;
		errs[name]= this.getError(value);

		const list = this.state.steps;

		if (name === 'seats'){
			list[0].passengers.total = value;
			this.setState({ errors:errs, steps:list});
		}
		else
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
		const list = this.state.steps;
		list[0].date = new Date(moment(date,'YYYY-MM-DD'));
		if (this.state.steps[0].time !== ''){
			const timeValue = moment(this.state.steps[0].time, 'HH:mm');
			list[0].date.setHours(timeValue.hours(),timeValue.minutes());	
		}
		this.setState({date:date, steps:list});
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

		//update the time if the date field has already been changed
		if (this.state.steps[0].date !== ''){
			list[0].date = new Date(moment(list[0].date,'YYYY-MM-DD'));
			const timeValue = moment(value, 'HH:mm');
			list[0].date.setHours(timeValue.hours(),timeValue.minutes()) ;	
		}

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
		const list = this.state.steps;
		const first = {};
		const last = {};
		//copy objects
		Object.assign(first, list[0] );
		Object.assign(last, list[list.length-1] );

		//change names and locations
		list[0].location = last.location;
		list[0].name = last.name;
		list[list.length-1].location = first.location;
		list[list.length-1].name = first.name;
		this.setState({steps:list})

	}

	//VER SI VA ACA
	getError(value){
        if (!value)
          return 'Field required'	
        else
        if (value<1)
          return 'It must be a positive number'
        else
          return ''
      }



	render(){
		return(
			<div>
					{ this.state.loaded ? (
					<div style={{paddingLeft:"10%", paddingRight:"10%"}} >
						<Typography variant="title" gutterBottom style={{  color:'#616161', fontWeight: 700, padding: '1%'}} >
								PUBLICAR UN VIAJE	
						</Typography>

						<Grid container spacing={24} class ='row'>
							<Grid item xs={12} >
								<OptionView 
									tripData={this.state} updateDate={this.updateDate} updateFrom={this.updateFrom} updateTo={this.updateTo} updateTime={this.updateTime} changeOrder={this.changeOrder}
									handleUserInput={this.handleUserInput} handleReservation={this.handleReservation} handleMate={this.handleMate} handleFood={this.handleFood} handleDetails={this.handleDetails}
									/>
							</Grid>
							<Grid item xs={12} >
								<Paper>
									<Typography variant="title" gutterBottom style={{  color:'#616161', fontWeight: 700, padding: '1%'}} >
										View of my trip
									</Typography>

									<MyMapComponent steps={this.state.steps}/>
								</Paper>
							</Grid>
						</Grid>
						</div> )
				: <CircularProgress /> }
			</div>
			);
	}

}

export default withStyles(styles2)(OfferARide);

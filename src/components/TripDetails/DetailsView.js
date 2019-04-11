import React from 'react';
import MyMapComponent from "../TripCreator/GoogleMapAPI/Map.js"
import { Grid } from '@material-ui/core';
import ButtonRequest from './ButtonRequest.js';
import Chat from '../Chat/Chat.js';
import ResumeTrip from '../TripCreator/ComponentView/ResumeTrip.js';
import axios from 'axios'
import handleServerResponse from '../../response'
import url from '../../config'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProfileResume from '../Profile/ProfileResume'
import PassengerView from './PassengerView'
import TripSaver from '../TripSaver/TripSaver.js';
import Auth from '../Auth/Auth.js';
import ButtonPanel from '../TripList/ButtonPanel.js';


const queryString = require('query-string');


class DetailsView extends React.Component{

    constructor(props){
		super(props);
		let origin = this.getStepEmpty();
		let destination = this.getStepEmpty();

		
        origin = {location:{lat:undefined, lng:undefined}, name:'', price:0, time:'', passengers:{total:0, users:[]}};
        destination = {location:{lat:undefined, lng:undefined}, name:'', price:0, time:'', passengers:{total:0, users:[]}};

		this.state = {
			owner: undefined,
			//each step should have a name, location, price and time
			steps:[], 
			//attributes in common both main and step trip 
			date: undefined,
			reservation: false,
			food: true,
			mate: false,
			car: '',
			details: '',
			loaded:false,
			_id: queryString.parse(this.props.location.search).id,
			showMap: false,
			update: false
		}

		this.joinToTheTrip = this.joinToTheTrip.bind(this);
	}

	//Carga de Datos
	componentWillMount() {
		axios.get(url.api+'trips/'+this.state._id)
		.then((response)=>{
			this.setState({
				steps: response.data.steps,
				date: response.data.date,
				reservation: response.data.automaticReservation,
				food: response.data.food,
				mate: response.data.mate,
				car: response.data.vehiculo,
				details: response.data.description,
				owner: response.data.owner,
				loaded:true,
			})
			
		})
		}

	loadTripList(){
		return axios.get(url.api + 'trips', {params:this.state.data})
		.catch((error) => {
			handleServerResponse(error, 'An error occured when getting the trips data')
		})
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

	getStepsSelected(){
		const list = this.state.steps;
        return list;
	}
	
	joinToTheTrip(){
		const list = this.state.steps;
		//add the id of the new User
		if (this.state.reservation)
			list[0].passengers.users.push(Auth.getUserID());
		else
			list[0].passengers.pendingUsers.push(Auth.getUserID());		
		this.setState({update:true, steps: list});
	}

	checkPassengers(){
		const userLogged = Auth.getUserID();
		return this.state.owner !== userLogged && 
			this.state.steps[0].passengers.users.indexOf(userLogged) === -1 &&
			this.state.steps[0].passengers.pendingUsers.indexOf(userLogged) === -1 
	}


    render(){
		const { classes } = this.props;

		const list= this.state.steps;
        return (
			<div style={{"textAlign":"center",'background-color':'#efefef'}}>
				{this.state.loaded?(
					<div>
						<MyMapComponent steps={list}/>
						<div class='row' >
							<div class='column' >
								<Grid>
									<h3>Trip resume</h3>
									<Paper>
										<ResumeTrip tripData={this.state}></ResumeTrip>
										<hr/>
										<PassengerView tripData={this.state} request={false} update={this.state.update} passengers={this.state.steps[0].passengers}></PassengerView>
										<hr/>
										{ (this.checkPassengers()) ?
											<ButtonRequest past={new Date(this.state.steps[0].date) < new Date()} completed={this.state.steps[0].passengers.total===this.state.steps[0].passengers.users.length} automatic={this.state.reservation} joinToTheTrip={this.joinToTheTrip}/>
										: null	
										}
										{ (this.state.owner === Auth.getUserID()) ?
											<ButtonPanel newTrips={true} tripData={this.state} />
										: null	
										}									

									</Paper>
								</Grid>
							</div>
		
							<div class='column'>
								<h3>Driver Profile</h3>
								<ProfileResume tripData={this.state}></ProfileResume>
								<TripSaver success={'Your request has been sent. You will be redirect to home page soon'} error={'Sorry, Your request has not been sent.'} update={this.state.update} tripData={this.state} id={this.state._id}></TripSaver>
								<Chat/>
							</div>
						</div>
		
					</div>
				
				)
				:(<CircularProgress />)}
		 	</div>
         );
    }
}

export default DetailsView;

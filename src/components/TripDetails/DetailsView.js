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
			idTrip: queryString.parse(this.props.location.search),
			showMap: false
		}

		this.joinToTheTrip = this.joinToTheTrip.bind(this);
	}

	//Carga de Datos
	componentWillMount() {
		axios.get(url.api+'trips/'+this.state.idTrip.id)
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
				update: false
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
		list[0].passengers.users.push(Auth.getUserID());
		this.setState({update:true, steps: list});
	}


    render(){
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
										<PassengerView update={this.state.update} passengers={this.state.steps[0].passengers.users}></PassengerView>
										<hr/>
										<ButtonRequest completed={this.state.steps[0].passengers.total===this.state.steps[0].passengers.users.length} automatic={this.state.reservation} joinToTheTrip={this.joinToTheTrip}/>
									</Paper>
								</Grid>
							</div>
		
							<div class='column'>
								<h3>Driver Profile</h3>
								<ProfileResume tripData={this.state}></ProfileResume>
								<TripSaver update={this.state.update} tripData={this.state} id={this.state.idTrip.id}></TripSaver>
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


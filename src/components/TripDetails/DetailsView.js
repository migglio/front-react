import React from 'react';
import MyMapComponent from "../TripCreator/GoogleMapAPI/Map.js"
import CitySelector from './CitySelector.js'
import { Grid } from '@material-ui/core';
import DescriptionTable from './DescriptionTable.js';
import ButtonRequest from './ButtonRequest.js';
import Chat from '../Chat/Chat.js';
import ResumeTrip from '../TripCreator/ComponentView/ResumeTrip.js';

class DetailsView extends React.Component{

    constructor(props){
        super(props);
		let origin = this.getStepEmpty();
		let destination = this.getStepEmpty();

        origin = {location:{lat:-37.320480, lng:-59.132904}, name:'Tandil', price:100, seats:4, time:'15:00', passengers:{total:3, users:[]}};
        destination = {location:{lat:-37.8455555556, lng:-58.2577777778}, name:'Balcarce', price:100, time:'16:00', passengers:{total:1,users:['1']}};	

		this.state = {
			//each step should have a name, location, price and time
			steps:[ origin, destination], 
			//attributes in common both main and step trip but specially after a reservation 
			seats: 4,
			//attributes in common both main and step trip 
			date: undefined,
			reservation: false,
			food: true,
			mate: false,
			car: 'Corsa',
			details: '',
			errors:{
				seats:'',
				car:''
			}
		}
        const stepSelected = this.getStepsSelected();

        this.updateFrom = this.updateFrom.bind(this);
        this.updateTo = this.updateTo.bind(this);
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

    updateFrom(city){
        this.setState({from:city})
        this.stepSelected = this.getStepsSelected();
    }

    updateTo(city){
        this.setState({to:city})
        this.stepSelected = this.getStepsSelected();
    }

    getStepsSelected(){
        return this.state.steps;
    }

    render(){
        return (
            <div>
                <MyMapComponent steps={this.getStepsSelected()}/>
                <div class='row'>
					<div class='column'>
						<Grid>
                            <h3>Trip resume</h3>
                            <ResumeTrip tripData={this.state}></ResumeTrip>
                            <DescriptionTable steps={this.getStepsSelected()}/>
                            <ButtonRequest automatic={true}/>
                        </Grid>
					</div>

					<div class='column'>
						<h3>Driver Profile</h3>
                        <Chat/>
					</div>
				</div>
            </div>
        );
    }
}

export default DetailsView; 
import React from 'react';
import MyMapComponent from "../TripCreator/GoogleMapAPI/Map.js"
import CitySelector from './CitySelector.js'
import { Grid } from '@material-ui/core';
import DescriptionTable from './DescriptionTable.js';
import ButtonRequest from './ButtonRequest.js';
import Chat from '../Chat/Chat.js';

class DetailsView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            steps:[
				//origin city
				{location:{lat:-37.320480, lng:-59.132904}, name:'Tandil', price:100, time:'15:00', passengers:{total:3, users:[]}},	
				{location:{lat:-37.8455555556, lng:-58.2577777778}, name:'Balcarce', price:100, time:'16:00', passengers:{total:1,users:['1']}},	
				//last city
                {location:{lat:-37.979858, lng:-57.589794}, name:'Mar del Plata', price:undefined, time:'17:00', passengers:{total:2, users:[]}},	
            ],
            from: 0,
            to: 0
        }
        const stepSelected = this.getStepsSelected();

        this.updateFrom = this.updateFrom.bind(this);
        this.updateTo = this.updateTo.bind(this);
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
        const list = [];
        const listEmpty = [
            {location:{lat:undefined, lng:undefined}, passengers:{total:0}},	
            {location:{lat:undefined, lng:undefined}, passengers:{total:0}}
        ]	

        if (this.state.from >= this.state.to)
            return listEmpty;

        for (let index = this.state.from; index <= this.state.to; index++) {
            list.push(this.state.steps[index])
        }
        return list;
    }

    render(){
        return (
            <div>
                <h2>Trip Details</h2>
                <MyMapComponent steps={this.getStepsSelected()}/>
                <div class='row'>
					<div class='column'>
						<Grid>
                            <h3>Trip resume</h3>
                            <div class='row'>
                                <CitySelector steps={this.state.steps} callback={this.updateFrom} />
                                <CitySelector steps={this.state.steps} callback={this.updateTo} />
                                <ButtonRequest automatic={true}/>
                            </div>
                            <DescriptionTable steps={this.getStepsSelected()}/>
                        </Grid>
					</div>

					<div class='column'>
						<h3>User's information</h3>
                        <Chat/>
					</div>
				</div>
            </div>
        );
    }
}

export default DetailsView; 
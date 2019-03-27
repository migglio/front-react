import axios from 'axios'
import url from '../../config.js'
import React from 'react';
import { Redirect } from 'react-router-dom'
var NotificationSystem = require('react-notification-system')
const moment = require('moment');

class TripSaver extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //when it is true, processForm is called
            save: false,
            steps: props.tripData.steps,
            redirect: null
        }
		//db methods
		this.processForm = this.processForm.bind(this);
		this.updatePassengers = this.updatePassengers.bind(this);

		//notifications
        this.addNotification = this.addNotification.bind(this)
        this.redirect = this.redirect.bind(this)

	}

    componentDidMount = (event) => {
        this.notifications = this.refs.notificationSystem;
        if (this.props.save){
            this.processForm(event);
        }
        if (this.props.updateTrip){
            this.updateTrip(this.props.tripData, this.props.id);
        }

    }

    componentDidUpdate = (event) => {
        if (this.props.update){
            this.updatePassengers(this.props.tripData, this.props.id);
        }

    }


    notifications ;

    addNotification = ( type, message) => {
        const onRemove = (type === 'success') ? this.redirect : null
        this.notifications.addNotification({
          message: message,
          level: type,
          position: 'tc',
          autoDismiss: 4,
          onRemove: onRemove
        })
    }

    redirect(){
        this.setState({
            redirect: <Redirect to='/login'/>
        })
    }

    //update Value for each step
	updateStepsInfo(){
        let list = this.props.tripData.steps;
        const seats = list[0].passengers.total;  
        for (let index = 0; index < list.length; index++){
            list[index].passengers.total = seats;
            list[index].date = new Date(moment(this.props.tripData.date,'YYYY-MM-DD'));
            const timeValue = moment(this.props.tripData.steps[0].time, 'HH:mm');
            list[index].date.setHours(timeValue.hours(),timeValue.minutes()) ;
        }
		this.setState({steps:list}) 
	}


    updatePassengers(tripData, id){
		// prevent default action. in this case, action is the form submission event
        //event.preventDefault();
		const userData = {
            steps: tripData.steps,
            id: id
		}
		axios.put(url.socket + 'api/trips', userData, url.config)
		.then((response) => {
            this.addNotification( 'success', this.props.success);
        })
		.catch((error) => {
            this.addNotification( 'error', this.props.success);
            console.log(error)}
		)
	}

    updateTrip(tripData, id){
		// prevent default action. in this case, action is the form submission event
        //event.preventDefault();
		const userData = {
            owner: tripData.owner,
			steps: tripData.steps,
			description: tripData.details,
			vehiculo: tripData.car,
            automaticReservation: tripData.reservation,
            food: tripData.food,
            mate: tripData.steps.mate,
            id: id
		}
        console.log(userData.tripData)
		axios.put(url.socket + 'api/trips/updateTrip', userData, url.config)
		.then((response) => {
            this.addNotification( 'success', this.props.success);
        })
		.catch((error) => {
            this.addNotification( 'error', this.props.success);
            console.log(error)}
		)

	}


    //Save a new trip into db 
	processForm(event) {
		//Copy number of passengers and date before saving the trip
		this.updateStepsInfo();
		// prevent default action. in this case, action is the form submission event
		//event.preventDefault();
		const userData = {
            owner: this.props.tripData.owner,
			steps: this.props.tripData.steps,
			description: this.props.tripData.details,
			vehiculo: this.props.tripData.car,
            automaticReservation: this.props.tripData.reservation,
            food: this.props.tripData.food,
            mate: this.props.tripData.mate

		}

		axios.post(url.socket + 'api/trips', userData, url.config)
		.then((response) => {
            this.addNotification( 'success', this.props.success);
            this.props.updateSavedState(true);
        })
		.catch((error) => {
            this.addNotification( 'error', this.props.error);
            this.props.updateSavedState(false);
            console.log(error)}
		)
    }
    
    render(){
        return(
            <div>
                {this.props.update ? this.state.redirect: null}
                <NotificationSystem ref="notificationSystem" />
            </div>
        );

    }
}

    export default TripSaver;
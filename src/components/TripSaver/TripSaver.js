import axios from 'axios'
import url from '../../config.js'
import React from 'react';

var NotificationSystem = require('react-notification-system')
const moment = require('moment');

class TripSaver extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //when it is true, processForm is called
            save: false,
            steps: props.tripData.steps
        }
		//db methods
		this.processForm = this.processForm.bind(this);
		this.updatePassengers = this.updatePassengers.bind(this);

		//notifications
        this.addNotification = this.addNotification.bind(this)
	}

    componentDidMount = (event) => {
        this.notifications = this.refs.notificationSystem;
        if (this.props.save){
            this.processForm(event);
        }
    }

    componentDidUpdate = (event) => {
        if (this.props.update){
            this.updatePassengers(this.props.tripData, this.props.id);
        }
    }


    notifications ;

    addNotification = ( type, message) => {    

        this.notifications.addNotification({
            message: message,
            level: type,
            position: 'tc',
            autoDismiss: 3,
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
        alert(list[0].date)
		this.setState({steps:list}) 
	}


    updatePassengers(tripData, id){
		//Copy number of passengers and date before saving the trip
		// prevent default action. in this case, action is the form submission event
        //event.preventDefault();
		const userData = {
            steps: tripData.steps,
            id: id
		}
        console.log(userData.tripData)
		axios.put(url.socket + 'api/trips', userData, url.config)
		.then((response) => {
            this.addNotification( 'success', 'You successfully added');
        })
		.catch((error) => {
            this.addNotification( 'error', 'Sorry, Your trip was not successfully added');
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
            this.addNotification( 'success', 'You successfully added');
            this.props.updateSavedState(true);
        })
		.catch((error) => {
            this.addNotification( 'error', 'Sorry, Your trip was not successfully added');
            this.props.updateSavedState(false);
            console.log(error)}
		)
    }
    
    render(){
        return(
            <NotificationSystem ref="notificationSystem" />
        );

    }
}

    export default TripSaver;
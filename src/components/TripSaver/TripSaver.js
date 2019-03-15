import axios from 'axios'
import url from '../../config.js'
import React from 'react';

var NotificationSystem = require('react-notification-system')

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

		//notifications
        this.addNotification = this.addNotification.bind(this)
	}

    componentDidMount = (event) => {
        this.notifications = this.refs.notificationSystem;
        if (this.props.save){
            this.processForm(event);
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
		for (let index = 0; index < list.length; index++){
			list[index].passengers.total = this.props.tripData.seats;
            list[index].date = this.props.tripData.date;
            list[index].time = this.props.tripData.steps[0].time;
		}
		this.setState({steps:list}) 
	}


    //Save a new trip into db 
	processForm(event) {
		//Copy number of passengers and date before saving the trip
		this.updateStepsInfo();
		// prevent default action. in this case, action is the form submission event
		//event.preventDefault();
		const userData = {
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
        })
		.catch((error) => {
            this.addNotification( 'error', 'Sorry, Your trip was not successfully added');
			console.log(error)}
		)
    }
    
    test = (e) => {
        this.setState({save:!this.state.save});
        alert(this.state.save)
    }

    render(){
        return(
            <NotificationSystem ref="notificationSystem" />
        );

    }
}

    export default TripSaver;
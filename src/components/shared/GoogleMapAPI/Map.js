import React from "react";
import GoogleMapsWrapper from "./GoogleMapsWrapper.js";

export default class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.createMarkersList = this.createMarkersList.bind(this);
    this.createWaypointsList = this.createWaypointsList.bind(this);
  }

  createMarkersList() {
    const list = [];
    list.push(this.props.steps[0].location);
    list.push(this.props.steps[this.props.steps.length - 1].location);
    return list;
  }

  createWaypointsList() {
    const list = [];

    this.props.steps.forEach((step, index) => {
      if (index !== 0 && index !== this.props.steps.length - 1) {
        //const waypoint = new google.maps.LatLng(step.location.lat, step.location.lng)
        list.push({ location: step.location });
      }
    });

    return list;
  }

  render() {
    const markers = this.createMarkersList();
    const waypoints = this.createWaypointsList();
    console.log(markers);
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw6XjBV9dEHkRt_T4ChYB5Nklc2-YiN9M&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={4}
        defaultCenter={{ lat: -37.669651, lng: -59.807167 }}
        fromLat={markers[0].lat}
        fromLng={markers[0].lng}
        toLat={markers[1].lat}
        toLng={markers[1].lng}
        waypoints={waypoints}
      />
    );
  }
}

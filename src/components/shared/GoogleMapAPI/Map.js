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
    if (this.props.steps) {
      list.push(this.props.steps[0]);
      list.push(this.props.steps[this.props.steps.length - 1]);
    }
    return list;
  }

  createWaypointsList() {
    const list = [];

    this.props.steps &&
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
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw6XjBV9dEHkRt_T4ChYB5Nklc2-YiN9M&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={4}
        defaultCenter={{ lat: -37.669651, lng: -59.807167 }}
        origin={markers[0].placeId}
        destination={markers[1].placeId}
        waypoints={waypoints}
      />
    );
  }
}

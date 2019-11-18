import React from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

//it is needed because componentDidUpdate cannot use props for scoping problems
let origin = undefined;
let destination = undefined;
let waypoints = [];

//comunicate props with variables scoped by componentDidUpdate function
function updateValue(from, to, waypointsList) {
  origin = from;
  destination = to;
  waypoints = waypointsList;
}

//GoogleMap must be wraped
const GoogleMapsWrapper = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDw6XjBV9dEHkRt_T4ChYB5Nklc2-YiN9M&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    //este se necesita para la vista de tripCreator
    componentDidUpdate() {
      if (origin && destination) {
        const google = window.google;

        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route(
          {
            origin: { placeId: origin },
            destination: { placeId: destination },
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypoints
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result
              });
            }
          }
        );
      }
    },
    //componentDidUpdate no es llamado la primera vez cuando es montado. Por esto se usa este -tripDetails-
    componentDidMount() {
      if (origin && destination) {
        const google = window.google;

        const DirectionsService = new google.maps.DirectionsService();

        console.log("origin", origin, "destination", destination, this.props);

        DirectionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: waypoints
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result
              });
            }
          }
        );
      }
    }
  })
)(props => (
  <div>
    {updateValue(props.origin, props.destination, props.waypoints)}

    <GoogleMap {...props} ref={props.onMapMounted}>
      {props.children}
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  </div>
));

export default GoogleMapsWrapper;

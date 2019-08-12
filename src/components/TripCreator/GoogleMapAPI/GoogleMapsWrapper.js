import React from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  google
} = require("react-google-maps");

//it is needed because componentDidUpdate cannot use props for scoping problems
let fromLat = undefined;
let fromLng = undefined;
let toLat = undefined;
let toLng = undefined;
let waypoints = [];

//comunicate props with variables scoped by componentDidUpdate function
function updateValue(lat, lng, toLatitude, toLong, waypointsList) {
  fromLat = lat;
  fromLng = lng;
  toLat = toLatitude;
  toLng = toLong;
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
      if (fromLat && toLat) {
        const google = window.google;

        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route(
          {
            origin: new google.maps.LatLng(fromLat, fromLng),
            destination: new google.maps.LatLng(toLat, toLng),
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
      if (fromLat && toLat) {
        const google = window.google;

        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route(
          {
            origin: new google.maps.LatLng(fromLat, fromLng),
            destination: new google.maps.LatLng(toLat, toLng),
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
    {updateValue(
      props.fromLat,
      props.fromLng,
      props.toLat,
      props.toLng,
      props.waypoints
    )}

    <GoogleMap {...props} ref={props.onMapMounted}>
      {props.children}
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  </div>
));

export default GoogleMapsWrapper;

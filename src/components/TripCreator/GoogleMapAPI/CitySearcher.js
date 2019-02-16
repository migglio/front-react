import React from "react";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");


const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDw6XjBV9dEHkRt_T4ChYB5Nklc2-YiN9M&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          //Get the list of places from the searchbox 
          const places = refs.searchBox.getPlaces();
          this.setState({
            places:places,
          });
          //select the unique element of the list(city selected by user)
          const lat = this.state.places[0].geometry.location.lat();
          const lng = this.state.places[0].geometry.location.lng();
          this.props.changeLoc( {lat: lat, lng: lng}, places[0].name );
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
    <FormControl fullWidth>
    <TextField
        id="searcher"
        type="searchBox"
          InputLabelProps={{
            shrink: true,
          }}
        label="City field"
        errorText="This field is required"
        placeholder="Insert your city.."
        margin="normal"

        defaultValue= {props.name}
        error={props.error}
        required
        helperText={props.error}
      />
    </FormControl>
    </StandaloneSearchBox>
  </div>
);

export default class MySearchPlaceComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      location:{ lat: undefined, lng: undefined },
      name: this.props.name,
      //control no repeated elements
      error:false
    }
    this.updateLocation = this.updateLocation.bind(this);
    this.isCity = this.isCity.bind(this);
  }

  isCity(name, list){
    for (let index = 0; index < list.length; index++) {
      if (list[index].name == name){
        this.setState({error:true})
        return true
      }
    }

      this.setState({error:false})
    return false
  }

  updateLocation(loc_par, name){
    if (!this.isCity(name, this.props.steps)){
      this.setState({location: loc_par, name:name});
      if(this.props.idx == undefined)
        this.props.callback({location:this.state.location, name:name });
      else
        this.props.callback(this.state.location, this.props.idx, name);
    }
        
  }

  getError(){
    if (this.state.error)
      return 'That city is already defined'
    else
      if (this.state.name==undefined)
        return 'Field required'
    return ''
  }
 
  render(){
    const error = this.getError();
    return(
        <div>
          <PlacesWithStandaloneSearchBox
            changeLoc={this.updateLocation}
            name = {this.props.name}
            error ={error}
          />
        </div>
    )
  }
}
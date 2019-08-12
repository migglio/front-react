import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import handleServerResponse from "../../response";
import url from "../../config";
import PassengerView from "../TripDetails/PassengerView";

const queryString = require("query-string");

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class ViewWaitingPassengers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idTrip: queryString.parse(this.props.location.search),
      checked: [],
      passengers: [],
      total: 0,
      loaded: false
    };
  }

  //Carga de Datos
  componentWillMount() {
    axios.get(url.api + "trips/" + this.state.idTrip.id).then(response => {
      this.setState({
        steps: response.data.steps,
        passengers: response.data.steps[0].passengers,
        loaded: true
      });
    });
  }

  loadTripList() {
    return axios
      .get(url.api + "trips", { params: this.state.data })
      .catch(error => {
        handleServerResponse(
          error,
          "An error occured when getting the trips data"
        );
      });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    //const { classes } = this.props;

    return (
      <div
        style={{ display: "flex", textAlign: "center", alignItems: "center" }}
      >
        {this.state.loaded ? (
          <PassengerView
            idTrip={this.state.idTrip.id}
            tripData={this.state}
            request={true}
            update={this.state.update}
            passengers={this.state.passengers}
          />
        ) : null}
      </div>
    );
  }
}

ViewWaitingPassengers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewWaitingPassengers);

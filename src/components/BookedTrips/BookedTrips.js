import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TabBookedTrips from "./TabBookedTrips";
import axios from "axios";
import url from "../../config";
import handleServerResponse from "../../response";
import Auth from "../Auth/Auth";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

class BookedTrips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { idPassenger: Auth.getUserID() },
      trips: {},
      loaded: false
    };
  }

  //Carga de Datos
  componentWillMount() {
    axios.all([this.loadTripList()]).then(
      axios.spread(res1 => {
        if (res1 !== undefined) {
          this.setState({
            trips: res1.data,
            loaded: true
          });
        }
      })
    );
  }

  loadTripList() {
    return axios
      .get(url.api + "trips/bookedTrips", { params: this.state.data })
      .catch(error => {
        handleServerResponse(
          error,
          "An error occured when getting the trips data"
        );
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          paddingTop: "2%",
          paddingLeft: "20%",
          paddingRight: "20%"
        }}
      >
        <Paper>
          <Typography
            variant="title"
            gutterBottom
            style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
          >
            Reservas
          </Typography>
        </Paper>
        {this.state.loaded ? (
          <TabBookedTrips trips={this.state.trips} />
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(BookedTrips);

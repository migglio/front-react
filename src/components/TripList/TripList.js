import React from "react";
import handleServerResponse from "../../response";
import axios from "axios";
import url from "../../config";
import DrawerContainer from "./DrawerContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const queryString = require("query-string");
const styles = theme => ({
  root: {
    textAlign: "center",
    paddingLeft: "15%",
    paddingRight: "15%",
    "@media (max-width:768px)": {
      padding: "2%"
    },
    "background-color": "#efefef",
    paddingTop: "1%"
  }
});

class TripList extends React.Component {
  constructor(props) {
    super(props);
    //Default State
    this.state = {
      data: queryString.parse(this.props.location.search),
      trips: [],
      loaded: false
    };
  }
  //Carga de Datos
  componentWillMount() {
    axios.all([this.loadTripList()]).then(
      axios.spread(res1 => {
        if (res1 !== undefined)
          this.setState({
            trips: res1.data,
            loaded: true
          });
      })
    );
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

  //Render
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.loaded ? (
          <DrawerContainer trips={this.state.trips} data={this.state.data} />
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TripList);

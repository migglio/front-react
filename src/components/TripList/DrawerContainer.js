import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListElement from "./ListElement";
import Filters from "./Filters";
import { Paper, Typography } from "@material-ui/core";
import SearchBar from "../Home/SearchBar";
const moment = require("moment");

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  tripsContainer: {
    width: "80%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    minWidth: 0 // So the Typography noWrap works
  }
});

class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    //Default State
    this.state = {
      trips: this.props.trips,
      value: {
        min: Math.min.apply(
          null,
          this.props.trips.map(item => item.steps[0].price)
        ),
        max: Math.max.apply(
          null,
          this.props.trips.map(item => item.steps[0].price)
        )
      }
    };
    this.filterTrips = this.filterTrips.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SearchBar />
        <Paper style={{ margin: "1%" }} elevation={4}>
          <Typography
            variant="title"
            gutterBottom
            style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
          >
            {this.state.trips.length} viajes disponibles desde{" "}
            {this.props.data.from} hasta {this.props.data.to}
            el{" "}
            {moment(this.props.date)
              .locale("es")
              .format("LL")}
          </Typography>
        </Paper>
        <div className={classes.root}>
          <Filters
            trips={this.state.trips}
            max={Math.max.apply(
              null,
              this.props.trips.map(item => item.steps[0].price)
            )}
            min={Math.min.apply(
              null,
              this.props.trips.map(item => item.steps[0].price)
            )}
            value={this.state.value}
            filterTrips={this.filterTrips}
          />

          <div className={classes.tripsContainer}>
            {this.renderTrips(this.state.trips)}
          </div>
        </div>
      </div>
    );
  }

  renderTrips(trips) {
    return trips.map((trip, index) => (
      <ListElement key={index} tripData={trip} />
    ));
  }

  filterTrips(value, autRes, plazasDisp) {
    console.log(plazasDisp);
    var newTrips = this.props.trips;
    if (plazasDisp)
      newTrips = newTrips.filter(
        trip =>
          trip.steps[0].passengers.total -
            trip.steps[0].passengers.users.length >
          0
      );
    if (autRes) {
      console.log(newTrips);
      this.setState({
        trips: newTrips.filter(
          trip =>
            trip.steps[0].price >= value.min &&
            trip.steps[0].price <= value.max &&
            trip.automaticReservation === autRes
        )
      });
    } else
      this.setState({
        trips: newTrips.filter(
          trip =>
            trip.steps[0].price >= value.min && trip.steps[0].price <= value.max
        )
      });
  }
}

export default withStyles(styles)(DrawerContainer);

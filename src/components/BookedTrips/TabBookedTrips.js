import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ListElement from "../TripList/ListElement";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class TabBookedTrips extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  renderTrips(trips, emptyTabText) {
    const nowDate = new Date();
    const previous = [];

    for (let index = 0; index < trips.length; index++) {
      if (new Date(trips[index].steps[0].date) < nowDate)
        previous.push(trips[index]);
    }

    if (previous.length === 0)
      return (
        <Typography
          variant="subheading"
          gutterBottom
          style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
        >
          {emptyTabText}
        </Typography>
      );

    return previous.map((trip, index) => (
      <ListElement key={index} tripData={trip} />
    ));
  }

  renderNextTrips(trips, emptyTabText) {
    const nowDate = new Date();
    const next = [];

    for (let index = 0; index < trips.length; index++) {
      if (new Date(trips[index].steps[0].date) > nowDate)
        next.push(trips[index]);
    }

    if (next.length === 0)
      return (
        <Typography
          variant="subheading"
          gutterBottom
          style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
        >
          {emptyTabText}
        </Typography>
      );

    return next.map((trip, index) => (
      <ListElement key={index} tripData={trip} />
    ));
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Viajes Realizados" />
            <Tab label="Reservas Confirmadas" />
            <Tab label="Reservas a Confirmar" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme && theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme && theme.direction}>
            {" "}
            {this.renderTrips(
              this.props.trips.users,
              "No has realizado viajes hasta el momento"
            )}
          </TabContainer>
          <TabContainer dir={theme && theme.direction}>
            {this.renderNextTrips(
              this.props.trips.users,
              "No has realizado viajes hasta el momento"
            )}
          </TabContainer>
          <TabContainer dir={theme && theme.direction}>
            {this.renderNextTrips(
              this.props.trips.pendingUsers,
              "No tienes reservas por confirmar"
            )}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

TabBookedTrips.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles)(TabBookedTrips);

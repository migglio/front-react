import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import ListElement from "../../TripList/ListElement";
import { useState } from "react";

const TabContainer = ({ children, dir }) => {
  return <div dir={dir}>{children}</div>;
};

const styles = theme => ({});

const TabOwnTrips = ({ classes, theme, trips }) => {
  const [value, setValue] = useState(0);

  const renderTrips = trips => {
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
          style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
        >
          No has realizado viajes hasta el momento
        </Typography>
      );

    return previous.map((trip, index) => (
      <ListElement key={index} tripData={trip} />
    ));
  };

  const renderNextTrips = trips => {
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
          No tienes viajes publicados por hacer hasta el momento
        </Typography>
      );

    return next.map((trip, index) => (
      <ListElement key={index} tripData={trip} newTrips={true} />
    ));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(event, value) => setValue(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          centered
        >
          <Tab label="Viajes Realizados" />
          <Tab label="Viajes a Realizar" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme && theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={(event, index) => setValue(index)}
      >
        <TabContainer dir={theme && theme.direction}>
          {renderTrips(trips)}
        </TabContainer>
        <TabContainer dir={theme && theme.direction}>
          {renderNextTrips(trips)}
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default withStyles(styles)(TabOwnTrips);

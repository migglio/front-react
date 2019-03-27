import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListElement from '../TripList/ListElement';
import TripList from '../TripList/TripList';
import DrawerContainer from '../TripList/DrawerContainer';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class TabOwnTrips extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  renderTrips(trips) {
    const nowDate = new Date();
    const next = [];

    for (let index = 0; index < trips.length; index++) {
      if (new Date(trips[index].steps[0].date) < nowDate) 
          next.push(trips[index])        
    }

    return next.map((trip, index) => 
      <ListElement key={index} tripData={trip} />)
  }

  renderNextTrips(trips) {
      const nowDate = new Date();
      const next = [];

      for (let index = 0; index < trips.length; index++) {
        if (new Date(trips[index].steps[0].date) > nowDate) 
            next.push(trips[index])        
      }

      return next.map((trip, index) => 
        <ListElement key={index} tripData={trip} newTrips={true} />)
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
            <Tab label="Viajes a Realizar" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}> {this.renderTrips(this.props.trips)}</TabContainer>
          <TabContainer dir={theme.direction}>{this.renderNextTrips(this.props.trips)}</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

TabOwnTrips.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TabOwnTrips);

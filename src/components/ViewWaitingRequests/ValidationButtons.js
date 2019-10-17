import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TripSaver from "../TripSaver/TripSaver";

const styles2 = theme => ({
  root: {
    padding: "1%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    height: 25,
    width: 25
  },
  details: {
    padding: "1%",
    justifyContent: "space-between"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  separator: {
    borderRight: `2px solid ${theme.palette.divider}`
  },
  paddingTrip: {
    padding: "1% 3% 1% 1%"
  },
  columnFlex1: {
    "flex-grow": "1"
  },
  columnFlex4: {
    "flex-grow": "3",
    "text-align": "left",
    marginLeft: "2%"
  },
  button: {
    background: "#EB1B00",
    color: "white",
    marginRight: "3%"
  }
});

class ValidationButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: this.props.tripData.steps,
      update: false,
      accept: false,
      selected: []
    };
    this.saveConfirmedPassengers = this.saveConfirmedPassengers.bind(this);
    this.saveDeniedPassengers = this.saveDeniedPassengers.bind(this);

    //callbacks
    this.confirmPassengers = this.confirmPassengers.bind(this);
    this.denyPassengers = this.denyPassengers.bind(this);
    this.updateSavedState = this.updateSavedState.bind(this);
  }

  //callback receiving the passenger list and the passenger selected
  saveConfirmedPassengers(passengers, selected) {
    const list = this.state.steps;
    const listId = [];
    selected.map(value => {
      listId.push(passengers.pendingUsers[value]);
      passengers.users.push(passengers.pendingUsers[value]);
      passengers.pendingUsers.splice(value, 1);
      return true;
    });
    list[0].passengers = passengers;
    this.setState({
      steps: list,
      update: true,
      selected: listId,
      accept: true
    });
  }

  //callback receiving the passenger list and the passenger selected
  saveDeniedPassengers(passengers, selected) {
    const list = this.state.steps;
    const listId = [];

    selected.map(value => {
      listId.push(passengers.pendingUsers[value]);
      passengers.pendingUsers.splice(value, 1);
      return true;
    });
    list[0].passengers = passengers;
    this.setState({
      steps: list,
      update: true,
      selected: listId,
      accept: false
    });
  }

  //method called when the confirm button is clicked
  confirmPassengers() {
    this.props.getSelected(this.saveConfirmedPassengers);
  }

  //method called when the deny button is clicked
  denyPassengers() {
    this.props.getSelected(this.saveDeniedPassengers);
  }

  //set the boolean variables in false because it was successfully added
  updateSavedState() {
    this.setState({ update: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          disabled={this.props.disabled}
          onClick={this.confirmPassengers}
          className={classes.button}
          variant="raised"
        >
          Aceptar
        </Button>
        <Button
          disabled={this.props.disabled}
          onClick={this.denyPassengers}
          className={classes.button}
          variant="raised"
        >
          Rechazar
        </Button>
        <TripSaver
          success={"Your request has been saved"}
          error={"Sorry, Your request has not been sent."}
          updateSavedState={this.updateSavedState}
          updatePendingPassengers={this.state.update}
          selected={this.state.selected}
          accept={this.state.accept}
          tripData={this.state}
          id={this.props.idTrip}
        ></TripSaver>
      </div>
    );
  }
}

ValidationButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(ValidationButtons);

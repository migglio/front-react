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

const moment = require("moment");

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTrips: this.props.newTrips,
      delete: false
    };

    this.deleteById = this.deleteById.bind(this);
    this.updateDeleteState = this.updateDeleteState.bind(this);
  }

  deleteById() {
    this.setState({ delete: true });
  }

  updateDeleteState(value) {
    this.setState({ delete: value });
  }

  renderButtons(type) {
    const { classes } = this.props;

    if (this.state.newTrips) return this.renderNewTrips();
    else
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            href={"tripDetails?id=" + this.props.tripData._id}
            className={classes.button}
            variant="raised"
          >
            Detalles
          </Button>
        </div>
      );
  }

  renderNewTrips() {
    const { classes } = this.props;
    console.log(this.props.tripData);
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {!this.props.tripData.reservation ? (
          <Button
            href={"ViewWaitingPassengers?id=" + this.props.tripData._id}
            tripData={this.props.tripData}
            className={classes.button}
            variant="raised"
          >
            Solicitudes
          </Button>
        ) : null}
        <Button
          href={"TripCreator?id=" + this.props.tripData._id}
          className={classes.button}
          variant="raised"
        >
          Editar
        </Button>
        <Button
          onClick={this.deleteById}
          className={classes.button}
          variant="raised"
        >
          Borrar
        </Button>
        <TripSaver
          tripData={this.props.tripData}
          delete={this.state.delete}
          updateTrip={this.state.update}
          updateDeleteState={this.updateDeleteState}
          success={"Your trip has been successfully deleted"}
          error={"Sorry, Your trip has not been successfully deleted"}
        ></TripSaver>
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {this.renderButtons(true)}
      </div>
    );
  }
}

ButtonPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(ButtonPanel);

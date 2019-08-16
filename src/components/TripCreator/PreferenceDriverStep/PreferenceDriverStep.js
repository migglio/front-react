import React from "react";
import TextField from "@material-ui/core/TextField";
import "../index.css";
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Restaurant from "@material-ui/icons/Restaurant";
import Security from "@material-ui/icons/Security";
import LocalCafe from "@material-ui/icons/LocalCafe";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import AttachMoney from "@material-ui/icons/AttachMoney";
import PersonOutline from "@material-ui/icons/PersonOutline";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Divider } from "material-ui";

const styles2 = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  subtitle: {
    paddingTop: "2vh",
    paddingBottom: "2vh"
  },
  input: {
    paddingTop: "2vh",
    paddingBottom: "2vh",
    width: "60%"
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  preferencesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "2vh"
  },
  details: {
    padding: "2vw"
  },
  icon: {
    height: 30,
    width: 30
  }
});

class PreferenceDriverStep extends React.Component {
  constructor(props) {
    super(props);
  }

  //Get value entered by user
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.props.handleUserInput(name, value);
  };

  handleReservation = e => {
    this.props.handleReservation();
  };

  handleFood = e => {
    this.props.handleFood();
  };

  handleMate = e => {
    this.props.handleMate();
  };

  handleDetails = e => {
    this.props.handleDetails(e.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Divider />
        <FormLabel className={classes.subtitle} component="legend">
          Información del auto
        </FormLabel>
        <div className={classes.inputsContainer}>
          <div className={classes.input}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              placeholder="Example: $200"
              min="1"
              id="inputPrice"
              defaultValue={this.props.tripData.steps[0].price}
              onChange={this.handleUserInput}
              InputProps={{
                min: "1",
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney />
                  </InputAdornment>
                )
              }}
              endAdornment={
                <InputAdornment position="end">
                  Precio por pasajero
                </InputAdornment>
              }
              error={this.props.tripData.errors["price"]}
              required
              helperText={this.props.tripData.errors["price"]}
            />
          </div>
          <div className={classes.input}>
            <TextField
              fullWidth
              name="seats"
              label="Seats"
              type="number"
              placeholder="Example: 3"
              min="1"
              id="inputSeats"
              defaultValue={this.props.tripData.steps[0].passengers.total}
              onChange={this.handleUserInput}
              InputProps={{
                min: "1",
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline />
                  </InputAdornment>
                )
              }}
              endAdornment={
                <InputAdornment position="end">Passengers</InputAdornment>
              }
              error={this.props.tripData.errors["seats"]}
              required
              helperText={this.props.tripData.errors["seats"]}
            />
          </div>
          <div className={classes.input}>
            <TextField
              fullWidth
              name="car"
              label="Car"
              type="text"
              placeholder="Example: Ford Focus"
              id="inputCar"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DirectionsCarIcon />
                  </InputAdornment>
                )
              }}
              defaultValue={this.props.tripData.car}
              onChange={this.handleUserInput}
              error={this.props.tripData.errors["car"]}
              required
              helperText={this.props.tripData.errors["car"]}
            />
          </div>
        </div>

        <Divider />

        <FormLabel className={classes.subtitle} component="legend">
          Preferencias del conductor
        </FormLabel>
        <div className={classes.preferencesContainer}>
          <Button name="reservation" onClick={this.handleReservation}>
            <Tooltip
              title={
                this.props.tripData.reservation
                  ? "Automatic Reservation"
                  : "Secure Reservation"
              }
              placement="top"
            >
              <div style={{ display: "flex" }}>
                <Security
                  className={classes.icon}
                  style={{
                    color: this.props.tripData.reservation
                      ? green[900]
                      : red[900]
                  }}
                />
              </div>
            </Tooltip>
          </Button>

          <Button name="food" onClick={this.handleFood}>
            <Tooltip
              title={
                this.props.tripData.food ? "Food Allowed" : "Food not Allowed"
              }
              placement="top"
            >
              <div style={{ display: "flex" }}>
                <Restaurant
                  className={classes.icon}
                  style={{
                    color: this.props.tripData.food ? green[900] : red[900]
                  }}
                />
              </div>
            </Tooltip>
          </Button>

          <Button name="mate" onClick={this.handleMate}>
            <Tooltip
              title={
                this.props.tripData.mate ? "Mate Allowed" : "Mate not Allowed"
              }
              placement="top"
            >
              <div style={{ display: "flex" }}>
                <LocalCafe
                  className={classes.icon}
                  style={{
                    color: this.props.tripData.mate ? green[900] : red[900]
                  }}
                />
              </div>
            </Tooltip>
          </Button>
        </div>
        <Divider />
        <div className={classes.details}>
          <TextField
            id="inputDetails"
            name="details"
            value={this.props.tripData.details}
            onChange={this.handleDetails}
            label="Details"
            multiline
            rows={4}
            rowsMax="4"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
                </InputAdornment>
              )
            }}
            fullWidth
            placeholder="Details..."
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles2)(PreferenceDriverStep);

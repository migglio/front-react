import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TripSaver from "../../TripSaver/TripSaver";
import ResumeTrip from "./ResumeTrip.js";
import MeetingDataView from "./MeetingDataView";
import PreferencesView from "./PreferencesView";
import Paper from "@material-ui/core/Paper";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Info from "@material-ui/icons/Info";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex",
    padding: 10,
    background: "#fafafa",
    flexDirection: "column",
    maxWidth: "90%",
    textAlign: "center"
  },
  stepper: {
    display: "flex"
  },
  button: {
    textAlign: "center",
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  icon: {
    height: 30,
    width: 30
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ["Encuentro", "Detalles", "Resumen"];
}

class OptionView extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      error: true,
      save: false,
      success: false,
      update: false
    };

    this.updateSavedState = this.updateSavedState.bind(this);
  }

  isStepFailed = step => {
    return step === 4;
  };

  handleNext = event => {
    const { activeStep } = this.state;

    this.setState({
      activeStep: activeStep + 1
    });
    if (activeStep == 2) {
      if (this.props.tripData.toUpdate) this.setState({ update: true });
      else this.setState({ save: true });
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getSection() {
    return this.getSection(this.state.activeStep);
  }

  //Validation methods
  validateFistStep() {
    return false; //borrar linea desp de terminar
    if (
      this.props.tripData.steps[0].location.lat === undefined ||
      this.props.tripData.steps[this.props.tripData.steps.length - 1].location
        .lat === undefined
    )
      return true;
    if (this.props.tripData.steps[0].time === "") return true;
    if (this.props.tripData.date === "") return true;
    return false;
  }

  validateSecondStep() {
    //    		return false; //borrar linea desp de terminar
    if (
      this.props.tripData.steps[0].passengers.total == "" ||
      this.getError(this.props.tripData.steps[0].passengers.total)
    )
      return true;

    if (this.props.tripData.car == "") return true;

    for (let index = 0; index < this.props.tripData.steps.length - 1; index++) {
      if (
        this.props.tripData.steps[index].price === "" ||
        this.getError(this.props.tripData.steps[index].price)
      )
        return true;
    }
    return false;
  }

  validateStep(step) {
    switch (step) {
      case 0:
        return this.validateFistStep();
        break;
      case 1:
        return this.validateSecondStep();
        break;
      case 2:
        return false;
        break;
      default:
        break;
    }
  }

  //Get value entered by user
  handleUserInput = (name, value) => {
    this.props.handleUserInput(name, value);
  };

  updateSavedState = value => {
    this.setState({ success: value });
  };

  getError(value) {
    if (!value) return "Field required";
    else if (value < 1) return "It must be a positive number";
    else return "";
  }

  //Returns View for select each city of the one trip
  getFirstStepView() {
    return (
      <MeetingDataView
        tripData={this.props.tripData}
        updateDate={this.props.updateDate}
        updateFrom={this.props.updateFrom}
        updateTo={this.props.updateTo}
        updateTime={this.props.updateTime}
        changeOrder={this.props.changeOrder}
      />
    );
  }

  //Returns View for select date, seats and price of trip
  getSecondStepView() {
    return (
      <PreferencesView
        tripData={this.props.tripData}
        handleUserInput={this.props.handleUserInput}
        handleReservation={this.props.handleReservation}
        handleMate={this.props.handleMate}
        handleFood={this.props.handleFood}
        handleDetails={this.props.handleDetails}
      />
    );
  }

  getThirdStepView() {
    return (
      <ResumeTrip tripData={this.props.tripData} success={this.state.success} />
    );
  }

  //Return a view for each step. UI method
  getSection(step) {
    switch (step) {
      case 0:
        return this.getFirstStepView();
        break;
      case 1:
        return this.getSecondStepView();
        break;
      case 2:
        return this.getThirdStepView();
        break;
      default:
        break;
    }
  }

  getButtonName() {
    const steps = getSteps();
    const { activeStep } = this.state;

    if (activeStep === steps.length - 1) {
      if (this.props.tripData.toUpdate) return "Update";
      else return "Save Trip";
    } else return "Next";
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper className={classes.stepper} activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};

            if (this.isStepFailed(index)) {
              labelProps.error = true;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <hr />
        {this.getSection(this.state.activeStep)}

        <div>
          {activeStep === steps.length ? (
            <div>
              {this.state.success ? (
                <Paper className={classes.root}>
                  <Typography
                    variant="title"
                    gutterBottom
                    style={{
                      color: green[900],
                      fontWeight: 700,
                      padding: "1%"
                    }}
                  >
                    <Info
                      className={classes.icon}
                      style={{ color: green[900] }}
                    />
                    Success
                  </Typography>
                  <Typography
                    variant="subheading"
                    gutterBottom
                    style={{ fontWeight: 700, padding: "1%" }}
                  >
                    {this.state.success
                      ? "You successfully added"
                      : "Sorry, Your trip was not successfully added"}
                  </Typography>
                </Paper>
              ) : (
                <Paper className={classes.root} elevation={1}>
                  <Typography
                    variant="title"
                    gutterBottom
                    style={{ color: red[900], fontWeight: 700, padding: "1%" }}
                  >
                    <Info
                      className={classes.icon}
                      style={{ color: red[900] }}
                    />
                    Failed
                  </Typography>
                  <Typography
                    variant="subheading"
                    gutterBottom
                    style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
                  >
                    {this.state.success
                      ? "You successfully added"
                      : "Sorry, Your trip was not successfully added"}
                  </Typography>
                </Paper>
              )}
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
              <Button
                href="/"
                onClick={this.handleReset}
                className={classes.button}
                variant="raised"
                color="primary"
              >
                Back to home
              </Button>
              <TripSaver
                id={this.props.tripData.idTrip.id}
                tripData={this.props.tripData}
                save={this.state.save}
                updateTrip={this.state.update}
                updateSavedState={this.updateSavedState}
                success={"Your trip has been successfully added"}
                error={"Sorry, Your trip has not been successfully added"}
              />
            </div>
          ) : (
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}
                variant="raised"
                color="primary"
              >
                Back
              </Button>
              <Button
                disabled={this.validateStep(activeStep)}
                variant="raised"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}
              >
                {this.getButtonName()}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(OptionView);

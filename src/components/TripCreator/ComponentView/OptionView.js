import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TripSaver from "../../TripSaver/TripSaver";
import ResumeTrip from "../resumeTripStep/ResumeTripStep";
import MeetingDataView from "../MeetingDataStep/MeetingDataStep";
import PreferencesView from "../PreferenceDriverStep/PreferenceDriverStep";
import Paper from "@material-ui/core/Paper";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Info from "@material-ui/icons/Info";
import { Divider } from "material-ui";

const styles = theme => ({
  root: {
    display: "flex",
    background: "#fff",
    flexDirection: "column",
    maxWidth: "100%",
    textAlign: "center"
  },
  stepper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "center"
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

const getSteps = () => {
  return ["Encuentro", "Detalles", "Resumen"];
};

const MEETING_STEP = 0;
const PREFERENCES_STEP = 1;
const RESUME_STEP = 2;

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
    if (activeStep === 2) {
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
    if (
      this.props.tripData.steps[0].passengers.total === "" ||
      this.getError(this.props.tripData.steps[0].passengers.total)
    )
      return true;

    if (this.props.tripData.car === "") return true;

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
      case 1:
        return this.validateSecondStep();
      case 2:
        return false;
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
    if (!value) return "Requerido";
    else if (value < 1) return "Debe ser un valor positivo";
    else return "";
  }

  getButtonName() {
    const steps = getSteps();
    const { activeStep } = this.state;

    if (activeStep === steps.length - 1) {
      if (this.props.tripData.toUpdate) return "ACTUALIZAR";
      else return "GUARDAR";
    } else return "CONTINUAR";
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
        <Divider />
        {this.state.activeStep === MEETING_STEP && (
          <MeetingDataView
            tripData={this.props.tripData}
            updateDate={this.props.updateDate}
            updateFrom={this.props.updateFrom}
            updateTo={this.props.updateTo}
            updateTime={this.props.updateTime}
            changeOrder={this.props.changeOrder}
          />
        )}
        {this.state.activeStep === PREFERENCES_STEP && (
          <PreferencesView
            tripData={this.props.tripData}
            handleUserInput={this.props.handleUserInput}
            handleReservation={this.props.handleReservation}
            handleMate={this.props.handleMate}
            handleFood={this.props.handleFood}
            handleDetails={this.props.handleDetails}
          />
        )}
        {this.state.activeStep === RESUME_STEP && (
          <ResumeTrip
            tripData={this.props.tripData}
            success={this.state.success}
          />
        )}

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
                VOLVER
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
        {(this.state.activeStep === MEETING_STEP ||
          this.state.activeStep === PREFERENCES_STEP) && (
          <ResumeTrip
            tripData={this.props.tripData}
            success={this.state.success}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(OptionView);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TripSaver from '../../TripSaver/TripSaver';

const styles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    textAlign: 'center',
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return [
    "Meeting information",
    "Restriction and details",
    "Resume"
  ];
}


class OptionView extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  state = {
    activeStep: 0,
    error:true,
    save:false
  };

  isStepFailed = step => {
    return step === 4;
  };

  handleNext = (event) => {
    const { activeStep } = this.state;

    this.setState({
      activeStep: activeStep + 1
      });
    if (activeStep == 2)
      this.setState({save:true});
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

  getSection(){
    return this.props.getSection(this.state.activeStep);

  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;


    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
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
        
        {this.getSection()}

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you have published a new trip
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
              <TripSaver tripData={this.props.tripData} save={this.state.save}></TripSaver>
            </div>
          ) : (
            <div>
                <Button
                  disabled={activeStep === 0 }
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  disabled={this.props.validateStep(activeStep) }   
                  variant="raised"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Save Trip" : "Next"}
                </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(OptionView);

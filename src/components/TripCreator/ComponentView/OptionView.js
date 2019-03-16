import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TripSaver from '../../TripSaver/TripSaver';
import ResumeTrip from './ResumeTrip.js';
import MeetingDataView from './MeetingDataView'
import PreferencesView from './PreferencesView'

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
    return this.getSection(this.state.activeStep);

  }

  	//Validation methods
	validateFistStep(){
    //		return false; //borrar linea desp de terminar
        if (this.props.tripData.steps[0].location.lat===undefined || this.props.tripData.steps[this.props.tripData.steps.length-1].location.lat===undefined)
          return true;
        if (this.props.tripData.steps[0].time==='')
          return true;
        if (this.props.tripData.date==='')
          return true;
        return false;
      }
    
      validateSecondStep(){
    //		return false; //borrar linea desp de terminar
        if (this.props.tripData.seats == ''  || this.getError(this.props.tripData.seats) )
          return true;
    
        if (this.props.tripData.car == '' )
          return true;
    
    
        for (let index = 0; index < this.props.tripData.steps.length-1; index++) {
          if ( (this.props.tripData.steps[index].price === '') || this.getError(this.props.tripData.steps[index].price) )
            return true
          
        }
        return false;
      }
    
      validateStep(step){
        switch(step){
          case 0: 
            return this.validateFistStep();
            break
          case 1: 
            return this.validateSecondStep();
            break
          case 2: 
            return false;
            break
          default:
            break
        }
      }
    
    //Get value entered by user
    handleUserInput = (name, value) => {
      this.props.handleUserInput(name, value);
    }

    getError(value){
      if (!value)
        return 'Field required'	
      else
      if (value<1)
        return 'It must be a positive number'
      else
        return ''
    }

      
      //Returns View for select each city of the one trip
      getFirstStepView(){
        return (
          <MeetingDataView tripData={this.props.tripData} updateDate={this.props.updateDate} updateFrom={this.props.updateFrom} updateTo={this.props.updateTo} updateTime={this.props.updateTime} changeOrder={this.props.changeOrder}></MeetingDataView>
        );
      }
    
      //Returns View for select date, seats and price of trip
      getSecondStepView(){
        return(
          <PreferencesView tripData={this.props.tripData} handleUserInput={this.props.handleUserInput} handleReservation={this.props.handleReservation} handleMate={this.props.handleMate} handleFood={this.props.handleFood} handleDetails={this.props.handleDetails}></PreferencesView>
        );
      }
    
      getThirdStepView(){
        return(
          <ResumeTrip tripData={this.props.tripData}></ResumeTrip>			
        );
      }	
      
    
      //Return a view for each step. UI method
      getSection(step){
        switch(step) {
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
        
        {this.getSection(this.state.activeStep)}

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
                  disabled={this.validateStep(activeStep) }   
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

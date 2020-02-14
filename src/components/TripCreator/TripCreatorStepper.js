import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TripSaver from "../TripSaver/TripSaver";
import ResumeTrip from "./resumeTripStep/ResumeTripStep";
import MeetingDataView from "./MeetingDataStep/MeetingDataStep";
import PreferencesView from "./PreferenceDriverStep/PreferenceDriverStep";
import Paper from "@material-ui/core/Paper";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Info from "@material-ui/icons/Info";
import { Divider } from "material-ui";
import { useState } from "react";

const styles = theme => ({
  root: {
    display: "flex",
    background: "#fff",
    flexDirection: "column",
    maxWidth: "90vw",
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

const TripCreatorStepper = ({
  classes,
  tripData,
  onChangeUserInput,
  updateDate,
  updateFrom,
  updateTo,
  updateTime,
  changeOrder,
  handleReservation,
  handleMate,
  handleFood,
  handleDetails
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [save, setSave] = useState(false);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleNext = event => {
    setActiveStep(activeStep + 1);

    if (activeStep === 2) {
      if (tripData.toUpdate) setUpdate(true);
      else setSave(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //Validation methods
  const validateFistStep = () => {
    const origin = tripData.steps[0];
    const destination = tripData.steps[tripData.steps.length - 1];

    if (!origin || !destination) return false;

    if (!origin.placeId || !destination.placeId) return true;
    if (tripData.steps[0].time === "") return true;
    if (tripData.date === "") return true;
    return false;
  };

  const validateSecondStep = () => {
    if (
      tripData.steps[0].passengers.total === "" ||
      getError(tripData.steps[0].passengers.total)
    )
      return true;

    if (tripData.car === "") return true;

    for (let index = 0; index < tripData.steps.length - 1; index++) {
      if (
        tripData.steps[index].price === "" ||
        getError(tripData.steps[index].price)
      )
        return true;
    }
    return false;
  };

  const validateStep = step => {
    switch (step) {
      case 0:
        return validateFistStep();
      case 1:
        return validateSecondStep();
      case 2:
        return false;
      default:
        break;
    }
  };

  //Get value entered by user
  const handleUserInput = (name, value) => {
    onChangeUserInput(name, value);
  };

  const getError = value => {
    if (!value) return "Requerido";
    else if (value < 1) return "Debe ser un valor positivo";
    else return "";
  };

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Divider />
      {activeStep === MEETING_STEP && (
        <MeetingDataView
          tripData={tripData}
          updateDate={updateDate}
          updateFrom={updateFrom}
          updateTo={updateTo}
          updateTime={updateTime}
          changeOrder={changeOrder}
        />
      )}
      {activeStep === PREFERENCES_STEP && (
        <PreferencesView
          tripData={tripData}
          handleUserInput={handleUserInput}
          handleReservation={handleReservation}
          handleMate={handleMate}
          handleFood={handleFood}
          handleDetails={handleDetails}
        />
      )}
      {activeStep === RESUME_STEP && (
        <ResumeTrip tripData={tripData} success={success} />
      )}

      <div>
        {activeStep === steps.length ? (
          <div>
            {success && (
              <InfoRequestResult
                classes={classes}
                label="Éxito"
                color={green[900]}
                description="Tu viaje se publicó correctamente"
              />
            )}
            {!success && (
              <InfoRequestResult
                classes={classes}
                label="Error"
                color={red[900]}
                description="Tu viaje no se publicó correctamente"
              />
            )}
            <Button onClick={handleReset} className={classes.button}>
              Publicar un viaje
            </Button>
            <Button
              href="/"
              onClick={handleReset}
              className={classes.button}
              variant="raised"
              color="primary"
            >
              Volver al Inicio
            </Button>
            <TripSaver
              id={tripData.idTrip && tripData.idTrip.id}
              tripData={tripData}
              save={save}
              updateTrip={update}
              updateSavedState={setSuccess}
              success={"Tu viaje se publicó correctamente"}
              error={"Tu viaje no se publicó correctamente"}
            />
          </div>
        ) : (
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
              variant="raised"
              color="primary"
            >
              VOLVER
            </Button>
            <Button
              disabled={validateStep(activeStep)}
              variant="raised"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 &&
                tripData.toUpdate &&
                "ACTUALIZAR"}
              {activeStep === steps.length - 1 &&
                !tripData.toUpdate &&
                "GUARDAR"}
              {activeStep !== steps.length - 1 && "CONTINUAR"}
            </Button>
          </div>
        )}
      </div>
      {(activeStep === MEETING_STEP || activeStep === PREFERENCES_STEP) && //TODO: ACORDARNE DE ACTIVAR
        false && <ResumeTrip tripData={tripData} success={success} />}
    </div>
  );
};

export default withStyles(styles)(TripCreatorStepper);

const InfoRequestResult = ({
  classes,
  label,
  color,
  description,
  isLoading
}) => {
  return (
    <Paper className={classes.root}>
      <Typography
        variant="title"
        gutterBottom
        style={{
          color,
          fontWeight: 700,
          padding: "1%"
        }}
      >
        <Info className={classes.icon} style={{ color }} />
        {label}
      </Typography>
      <Typography
        variant="subheading"
        gutterBottom
        style={{ fontWeight: 700, padding: "1%" }}
      >
        {description}
      </Typography>
    </Paper>
  );
};

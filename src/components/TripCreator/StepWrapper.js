import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import ResumeTrip from "./resumeTripStep/ResumeTripStep";
import { Divider } from "material-ui";

const stylesWrapper = theme => ({
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
  }
});

const steps = ["Encuentro", "Detalles", "Resumen"];

const MEETING_STEP = "MEETING_STEP";
const PREFERENCES_STEP = "PREFERENCES_STEP";

const stepper = [MEETING_STEP, PREFERENCES_STEP];

const StepWrapper = ({ classes, children, tripData, activeStep }) => {
  return (
    <>
      <div className={classes.root}>
        <Stepper className={classes.stepper} activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider />
        {children}
      </div>

      {(activeStep === MEETING_STEP || activeStep === PREFERENCES_STEP) && //TODO: ACORDARNE DE ACTIVAR
        false && <ResumeTrip tripData={tripData} />}
    </>
  );
};

export default withStyles(stylesWrapper)(StepWrapper);

/*
          <TripSaver
            id={tripData.idTrip && tripData.idTrip.id}
            tripData={tripData}
            save={save}
            updateTrip={update}
            updateSavedState={setSuccess}
            success={"Tu viaje se publicó correctamente"}
            error={"Tu viaje no se publicó correctamente"}
          />
  */

//NUEVO PASO
/*
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
  */

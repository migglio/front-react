import React from "react";
import { withStyles } from "material-ui/styles";
import Auth from "../Auth/Auth.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Divider } from "material-ui";
import useGetUrlParam from "../../libs/urlParams.js";
import { trips } from "../../api/Trips.js";
import { useState } from "react";
import { useEffect } from "react";
import MeetingDataStep from "./MeetingDataStep/MeetingDataStep.js";
import StepWrapper from "./StepWrapper.js";
import PreferenceDriverStep from "./PreferenceDriverStep/PreferenceDriverStep.js";

let styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "strech",
    justifyContent: "center"
  },
  title: {
    color: "#616161",
    padding: 20
  },
  body: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: "5vh",
    paddingLeft: "1vw",
    paddingRight: "1vw",
    paddingBottom: "5vh"
  },
  map: {
    maxWidth: 600,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: "1.2%",
    border: 1,
    borderColor: "#616161",
    borderStyle: "solid",
    borderRadius: "8px"
  },
  mapTitle: {
    color: "#616161",
    textAlign: "center",
    fontWeight: 700,
    padding: "1%"
  },
  icon: {
    height: 30,
    width: 30
  }
};

const moment = require("moment");

//Returns a new step with default values
const getStepEmpty = () => {
  //init default value easily
  return {
    placeId: null,
    id: null,
    label: null,
    value: null,
    price: "",
    time: "",
    date: "",
    passengers: { total: "", users: [], pendingUsers: [] }
  };
};

const tripDataDefault = {
  //TODO: owner harcoded CHANGEEE!!!!!
  owner: Auth.getUserID(),
  //each step should have a name, location, price and time
  steps: [getStepEmpty(), getStepEmpty()],
  //attributes in common both main and step trip but specially after a reservation
  //attributes in common both main and step trip
  date: "",
  reservation: false,
  food: false,
  mate: false,
  car: "",
  details: "",
  idTrip: null
};

const MEETING_STEP = "MEETING_STEP";
const PREFERENCES_STEP = "PREFERENCES_STEP";

const stepper = [MEETING_STEP, PREFERENCES_STEP];

const TripCreator = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(1);

  const [tripData, setTripData] = useState(tripDataDefault);
  const [loaded, setLoaded] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);

  const id = useGetUrlParam("id");

  //Carga de Datos
  useEffect(() => {
    const asyncFunction = async id => {
      const response = await trips().getTrip(id);
      setTripData(response);
      setLoaded(true);
      setToUpdate(true);
    };
    if (id) asyncFunction(id);
    else setLoaded(true);
  }, [id]);

  //VER SI VA ACA
  const getError = value => {
    if (!value) return "Field required";
    else if (value < 1) return "It must be a positive number";
    else return "";
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const hanldeCompleteMeetingStep = props => {
    console.log(props);
    setActiveStep(activeStep + 1);
  };

  return (
    <>
      {loaded && (
        <div className={classes.root}>
          <div className={classes.body}>
            <div className={classes.map}>
              <StepWrapper activeStep={activeStep}>
                {stepper[activeStep] === MEETING_STEP && (
                  <MeetingDataStep onComplete={hanldeCompleteMeetingStep} />
                )}
                {stepper[activeStep] === PREFERENCES_STEP && (
                  <PreferenceDriverStep />
                )}
              </StepWrapper>
              <Divider />
            </div>
          </div>
        </div>
      )}
      {!loaded && <CircularProgress />}
    </>
  );
};

export default withStyles(styles)(TripCreator);

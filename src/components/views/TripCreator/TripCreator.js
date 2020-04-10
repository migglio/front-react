import React from "react";
import { withStyles } from "material-ui/styles";
import Auth from "../../Auth/Auth.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Divider } from "material-ui";
import { useGetPath } from "../../../libs/urlParams.js";
import { trips } from "../../../api/Trips.js";
import { useState } from "react";
import { useEffect } from "react";
import MeetingDataStep from "./MeetingDataStep/MeetingDataStep.js";
import StepWrapper from "./StepWrapper.js";
import PreferenceDriverStep from "./PreferenceDriverStep/PreferenceDriverStep.js";
import ResumeTripStep from "./resumeTripStep/ResumeTripStep.js";
import TripSaverStep from "./tripSaverStep/TripSaverStep.js";

let styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "strech",
    justifyContent: "center",
  },
  title: {
    color: "#616161",
    padding: 20,
  },
  body: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: "5vh",
    paddingLeft: "1vw",
    paddingRight: "1vw",
    paddingBottom: "5vh",
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
    borderRadius: "8px",
  },
  mapTitle: {
    color: "#616161",
    textAlign: "center",
    fontWeight: 700,
    padding: "1%",
  },
  icon: {
    height: 30,
    width: 30,
  },
};

const MEETING_STEP = "MEETING_STEP";
const PREFERENCES_STEP = "PREFERENCES_STEP";
const RESUME_STEP = "RESUME_STEP";
const SAVING_STEP = "SAVING_STEP";

const stepper = [MEETING_STEP, PREFERENCES_STEP, RESUME_STEP, SAVING_STEP];

const TripCreator = ({ classes }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [owner, setOwner] = useState(Auth.getUserID());

  const [steps, setSteps] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState("12:00");

  const [price, setPrice] = useState(null);
  const [seats, setSeats] = useState(null);
  const [car, setCar] = useState(null);
  const [reservation, setReservation] = useState(false);
  const [food, setFood] = useState(false);
  const [mate, setMate] = useState(false);
  const [details, setDetails] = useState("");

  const [loaded, setLoaded] = useState(false);

  const id = useGetPath(2);

  const getTrip = async (id) => {
    const response = await trips().getTrip(id);
    setSteps(response.steps);
    setOwner(response.owner);
    setDate(response.steps[0].date);
    setTime(response.steps[0].time);
    setPrice(response.steps[0].price);
    setSeats(response.steps[0].passengers.total);
    setCar(response.vehiculo);
    setReservation(response.automaticReservation);
    setFood(response.food);
    setMate(response.mate);
    setDetails(response.description);

    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    if (id) getTrip(id);
    else setLoaded(true);
  }, [id]);

  const handleChangeActiveStep = (newActiveStep) => ({
    from,
    to,
    date,
    time,
  }) => {
    if (from && to && date && time) {
      setSteps([from, to]);
      setDate(date);
      setTime(time);
    }

    setActiveStep(newActiveStep);
  };

  const handleChangePreference = ({
    price,
    seats,
    car,
    reservation,
    food,
    mate,
    details,
  }) => {
    setPrice(price);
    setSeats(seats);
    setCar(car);
    setReservation(reservation);
    setFood(food);
    setMate(mate);
    setDetails(details);
  };

  const tripData = {
    owner,
    steps,
    date,
    time,
    price,
    seats,
    car,
    reservation,
    mate,
    food,
    details,
  };

  return (
    <>
      {loaded && (
        <div className={classes.root}>
          <div className={classes.body}>
            <div className={classes.map}>
              <StepWrapper tripData={tripData} activeStep={activeStep}>
                {stepper[activeStep] === MEETING_STEP && (
                  <MeetingDataStep
                    tripData={tripData}
                    onBack={handleChangeActiveStep(activeStep - 1)}
                    onComplete={handleChangeActiveStep(activeStep + 1)}
                  />
                )}
                {stepper[activeStep] === PREFERENCES_STEP && (
                  <PreferenceDriverStep
                    tripData={tripData}
                    onBack={handleChangeActiveStep(activeStep - 1)}
                    onChange={handleChangePreference}
                    onComplete={handleChangeActiveStep(activeStep + 1)}
                  />
                )}
                {stepper[activeStep] === RESUME_STEP && (
                  <ResumeTripStep
                    showButton
                    tripData={tripData}
                    onBack={() => setActiveStep(activeStep - 1)}
                    onSave={() => setActiveStep(activeStep + 1)}
                    open
                  />
                )}
                {stepper[activeStep] === SAVING_STEP && (
                  <TripSaverStep tripData={tripData} />
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

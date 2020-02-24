import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonRequest from "./ButtonRequest.js";
import ResumeTrip from "../views/TripCreator/resumeTripStep/ResumeTripStep";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileResume from "../shared/ProfileResume/ProfileResume";
import PassengerView from "./PassengerView";
import Auth from "../Auth/Auth.js";
import { withStyles } from "@material-ui/core/styles";
import { trips } from "../../api/Trips.js";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    margin: "4%"
  },
  tripContainer: {
    display: "flex",
    backgroundColor: "#fff",
    padding: "1.2%",
    border: 1,
    borderColor: "#616161",
    borderStyle: "solid",
    borderRadius: "8px",
    maxWidth: "98%",
    "@media (min-width:768px)": {
      width: "45%"
    }
  },
  driverContainer: {
    backgroundColor: "#fff",
    padding: "1.2%",
    border: 1,
    borderColor: "#616161",
    borderStyle: "solid",
    borderRadius: "8px",
    maxWidth: "98%",
    display: "none",
    "@media (min-width:768px)": {
      display: "flex",
      overflow: "auto",
      width: "45%",
      maxHeight: "50vh"
    }
  },
  tripColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  map: {
    display: "none",
    "@media (min-width:768px)": {
      display: "block"
    }
  },
  driverColumn: {
    display: "none",
    width: "100%",
    "@media (min-width:768px)": {
      display: "flex"
    }
  }
});

const DetailsView = props => {
  const [owner, setOwner] = useState(null);
  //each step should have a name, location, price and time
  const [steps, setSteps] = useState([]);
  //attributes in common both main and step trip
  const [date, setDate] = useState(null);
  const [reservation, setReservation] = useState(false);
  const [food, setFood] = useState(false);
  const [mate, setMate] = useState(false);
  const [car, setCar] = useState("");
  const [details, setDetails] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(false);

  //const id = queryString.parse(props.location.search).id;

  const data = { owner, steps, date, reservation, food, mate, car, details };

  let { id } = useParams();

  const getTrip = async id => {
    const response = await trips().getTrip(id);
    setSteps(response.steps);
    setDate(response.date);
    setReservation(response.automaticReservation);
    setFood(response.food);
    setMate(response.mate);
    setCar(response.vehiculo);
    setDetails(response.description);
    setOwner(response.owner);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getTrip(id);
  }, [id]);

  const joinToTheTrip = () => {
    //add the id of the new User
    if (reservation) steps[0].passengers.users.push(Auth.getUserID());
    else steps[0].passengers.pendingUsers.push(Auth.getUserID());
    setUpdate(true);
    setSteps(steps);
  };

  const checkPassengers = () => {
    const userLogged = Auth.getUserID();
    return (
      owner !== userLogged &&
      steps[0].passengers.users.indexOf(userLogged) === -1 &&
      steps[0].passengers.pendingUsers.indexOf(userLogged) === -1
    );
  };

  const { classes } = props;

  return (
    <div
      style={{
        textAlign: "center",
        "background-color": "#efefef",
        paddingBottom: 30
      }}
    >
      {!loaded && <CircularProgress />}
      {loaded && (
        <>
          <div className={classes.root}>
            <div className={classes.tripContainer}>
              <div className={classes.tripColumn}>
                <ResumeTrip tripData={data} open={true} />
                <PassengerView
                  tripData={data}
                  request={false}
                  update={update}
                  passengers={steps[0].passengers}
                />
                {checkPassengers() && (
                  <ButtonRequest
                    past={new Date(steps[0].date) < new Date()}
                    completed={
                      steps[0].passengers.total ===
                      steps[0].passengers.users.length
                    }
                    automatic={reservation}
                    joinToTheTrip={joinToTheTrip}
                  />
                )}
              </div>
            </div>
            <div className={classes.driverContainer}>
              <div className={classes.driverColumn}>
                <ProfileResume tripData={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withStyles(styles)(DetailsView);

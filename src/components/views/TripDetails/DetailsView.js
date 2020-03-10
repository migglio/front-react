import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonRequest from "./ButtonRequest.js";
import ResumeTrip from "../TripCreator/resumeTripStep/ResumeTripStep";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileResume from "../../shared/ProfileResume/ProfileResume";
import PassengerView from "./PassengerView";
import Auth from "../../Auth/Auth.js";
import { withStyles } from "@material-ui/core/styles";
import { trips } from "../../../api/Trips.js";
import {
  userJoined,
  userPending
} from "../../../constants/notificationTypes.js";
import { notifications } from "../../../api/Notifications.js";

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

const DetailsView = ({ classes }) => {
  const [owner, setOwner] = useState(null);
  //each step should have a name, location, price and time
  const [steps, setSteps] = useState(null);
  //attributes in common both main and step trip
  const [seats, setSeats] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [reservation, setReservation] = useState(false);
  const [food, setFood] = useState(false);
  const [mate, setMate] = useState(false);
  const [car, setCar] = useState("");
  const [details, setDetails] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState(false);

  //const id = queryString.parse(props.location.search).id;

  const data = {
    owner,
    steps,
    seats,
    date,
    time,
    reservation,
    food,
    mate,
    car,
    details
  };

  let { id } = useParams();

  const getTrip = async id => {
    const response = await trips().getTrip(id);
    setSteps(response.steps);
    setDate(response.steps[0].date);
    setTime(response.steps[0].time);
    setSeats(response.steps[0].passengers.total);
    setReservation(response.automaticReservation);
    setFood(response.food);
    setMate(response.mate);
    setCar(response.vehiculo);
    setDetails(response.description);
    setOwner(response.owner);
    setLoaded(true);
  };

  const putTrips = async id => {
    await trips().putTrips(id, data);
    setUpdate(false);
  };

  const postNotification = async (owner, idTrip, type, users) => {
    await notifications().postNotification(owner, idTrip, type, users);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getTrip(id);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const notificationType = reservation ? userJoined : userPending;
    if (update) {
      putTrips(id);
      postNotification(Auth.getUserID(), id, notificationType, [owner]);
    }
    //eslint-disable-next-line
  }, [update]);

  const joinToTheTrip = () => {
    //add the id of the new User
    let users = steps[0].passengers.users;
    let pendingUsers = steps[0].passengers.pendingUsers;
    if (reservation) {
      users.push(Auth.getUserID());
      setSeats(seats - 1);
    } else pendingUsers.push(Auth.getUserID());

    const newSteps = steps.slice();
    setSteps(newSteps);
    setUpdate(true);
  };

  const checkPassengers = () => {
    const userLogged = Auth.getUserID();
    return (
      owner !== userLogged &&
      steps[0].passengers.users.indexOf(userLogged) === -1 &&
      steps[0].passengers.pendingUsers.indexOf(userLogged) === -1
    );
  };

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
                <PassengerView steps={steps} request={false} />
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
                <ProfileResume ownerId={owner} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withStyles(styles)(DetailsView);

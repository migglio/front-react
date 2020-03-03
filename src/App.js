import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Header from "./components/shared/Header/Header";
import HomeView from "./components/views/Home/HomeView";
import TripCreator from "./components/views/TripCreator/TripCreator";
import TripsList from "./components/TripList/TripList.js";
import DetailsView from "./components/TripDetails/DetailsView.js";
import Profile from "./components/views/Profile/ProfileView";
import TripOffered from "./components/TripOffers/TripOffered";
import ViewWaitingPassengers from "./components/ViewWaitingRequests/ViewPassengerRequest";
import BookedTrips from "./components/BookedTrips/BookedTrips";
import NotificationView from "./components/views/Notifications/NotificationView";
import routes, {
  TRIP_WITH_ID_PATH,
  TRIP_PATH,
  TRIP_CREATOR_PATH
} from "./constants/routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./css/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

const PublicRoutes = () => {
  return (
    <div style={{ backgroundColor: "#efefef", minHeight: "100vh" }}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path={routes().trips[TRIP_CREATOR_PATH]}
          component={TripCreator}
        />
        <Route
          path={routes().trips[TRIP_WITH_ID_PATH] + "/:id"}
          component={DetailsView}
        />
        <Route path={routes().trips[TRIP_PATH]} component={TripsList} />
        <Route path="/Profile" component={Profile} />
        <Route path="/TripOffers" component={TripOffered} />
        <Route
          path="/ViewWaitingPassengers"
          component={ViewWaitingPassengers}
        />
        <Route path="/BookedTrips" component={BookedTrips} />
        <Route path="/NotificationView" component={NotificationView} />
      </Switch>
    </div>
  );
};

const App = () => {
  console.log("anda", theme);
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <PublicRoutes />
        </MuiThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

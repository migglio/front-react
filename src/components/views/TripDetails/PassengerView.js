import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SinglePassengerView from "./SinglePassengerView";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const PassengerView = ({ idTrip, request, tripData, steps }) => {
  return (
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        paddingTop: "2%"
      }}
    >
      <Paper>
        <Typography
          variant="title"
          style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
        >
          Pasajeros
        </Typography>
      </Paper>
      <SinglePassengerView
        subtitle="confirmed"
        idTrip={idTrip}
        tripData={tripData}
        steps={steps}
        request={request}
      />
    </div>
  );
};

export default withStyles(styles)(PassengerView);

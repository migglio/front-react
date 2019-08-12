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

class PassengerView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const { classes } = this.props;

    return (
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          paddingTop: "2%",
          paddingLeft: "20%",
          paddingRight: "20%"
        }}
      >
        <Paper>
          <Typography
            variant="title"
            gutterBottom
            style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
          >
            Pasajeros
          </Typography>
        </Paper>
        <SinglePassengerView
          subtitle="confirmed"
          idTrip={this.props.idTrip}
          tripData={this.props.tripData}
          passengers={this.props.passengers}
          request={this.props.request}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PassengerView);

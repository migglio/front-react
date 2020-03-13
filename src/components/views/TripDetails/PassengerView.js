import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SinglePassengerView from "./SinglePassengerView";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: "2%",
    width: "100%"
  },
  title: { color: "#054752", fontWeight: 700, padding: "1%" }
});

const PassengerView = ({ classes, request, onChange, steps }) => {
  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="title" className={classes.title}>
          Pasajeros
        </Typography>
      </Paper>
      <SinglePassengerView
        onChange={onChange}
        steps={steps}
        request={request}
      />
    </div>
  );
};

export default withStyles(styles)(PassengerView);

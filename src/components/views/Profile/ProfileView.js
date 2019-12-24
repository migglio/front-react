import React from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "material-ui";
import { withStyles } from "@material-ui/core/styles";
import ProfileResume from "../../shared/ProfileResume/ProfileResume";
import Auth from "../../Auth/Auth";
const styles = theme => ({
  root: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: "2%",
    paddingLeft: "25%",
    paddingRight: "25%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

const Profile = ({ classes }) => {
  const owner = Auth.getUserID();

  return (
    <div className={classes.root}>
      <Paper>
        <ProfileResume tripData={{ owner }} />
        <br />
        <Button
          href="/"
          className={classes.button}
          variant="raised"
          color="primary"
          fullWidth
        >
          Edit Profile
        </Button>
        <Button
          href="/TripOffers"
          className={classes.button}
          variant="raised"
          color="primary"
          fullWidth
        >
          Viajes Publicados
        </Button>
        <Button
          href="/"
          className={classes.button}
          variant="raised"
          color="primary"
          fullWidth
        >
          Reservas
        </Button>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Profile);

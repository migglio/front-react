import React from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "material-ui";
import { withStyles } from "@material-ui/core/styles";
import ProfileResume from "./ProfileResume";
import Auth from "../Auth/Auth";
const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: Auth.getUserID()
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          paddingTop: "2%",
          paddingLeft: "25%",
          paddingRight: "25%"
        }}
      >
        <Paper>
          <ProfileResume tripData={this.state}></ProfileResume>
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
  }
}

export default withStyles(styles)(Profile);

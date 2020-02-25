import React from "react";
import { Link, useLocation } from "react-router-dom";
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
    paddingLeft: "4px",
    paddingRight: "4px",
    paddingBottom: "2%",
    "@media (min-width:768px)": {
      paddingLeft: "25%",
      paddingRight: "25%"
    }
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 8
  },
  button: {
    padding: 4,
    minWidth: "200px"
  }
});

const Profile = ({ classes }) => {
  const owner = Auth.getUserID();

  return (
    <div className={classes.root}>
      <Paper>
        <ProfileResume ownerId={owner} />
        <div className={classes.buttonContainer}>
          <div className={classes.button}>
            <Button
              component={Link}
              to="/TripOffers"
              className={classes.button}
              variant="raised"
              color="primary"
              fullWidth
            >
              Viajes Publicados
            </Button>
          </div>
          <div className={classes.button}>
            <Button
              component={Link}
              to="/"
              className={classes.button}
              variant="raised"
              color="primary"
              fullWidth
            >
              Reservas
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Profile);

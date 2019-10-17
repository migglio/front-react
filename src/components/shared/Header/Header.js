import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Auth from "../../Auth/Auth.js";
import ProfileMenu from "../../Profile/ProfileMenu.js";
import NotificationsHeader from "../../Notifications/NotificationsHeader.js";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonHome: {
    alignItems: "center",
    color: "#fff"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {!this.props.isHome && (
              <IconButton
                component={Link}
                to="/"
                className={classes.menuButton}
                color="inherit"
              >
                <HomeIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title}>
              Carpooling App
            </Typography>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            />
            {Auth.isUserAuthenticated() ? (
              <div style={{ display: "flex" }}>
                <ProfileMenu />
                <NotificationsHeader />
              </div>
            ) : (
              <div>
                <Button color="inherit" href="/login">
                  Login
                </Button>
                <Button color="inherit" href="/register">
                  Register
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);

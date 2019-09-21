import React from "react";
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
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonHome: {
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
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Button className={classes.buttonHome} href="/">
              <Typography variant="h6" className={classes.title}>
                Carpooling App
              </Typography>
            </Button>

            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            />

            {Auth.isUserAuthenticated() ? (
              <div style={{ display: "flex" }}>
                <NotificationsHeader />
                <ProfileMenu />
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

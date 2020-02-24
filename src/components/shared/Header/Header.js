import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Auth from "../../Auth/Auth.js";
import ProfileMenu from "./ProfileMenu.js";
import { IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsMenu from "./NotificationsMenu.js";
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

const Header = ({ isHome, classes }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let location = useLocation();
  React.useEffect(() => {
    setLoggedIn(Auth.isUserAuthenticated());
  }, [location]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {!isHome && (
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
          {loggedIn ? (
            <div style={{ display: "flex" }}>
              <ProfileMenu />
              <NotificationsMenu />
            </div>
          ) : (
            <div>
              <Button color="inherit" href="/login" id="login-button">
                Iniciar Sesión
              </Button>
              <Button color="inherit" href="/register">
                Registrarse
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);

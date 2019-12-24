import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Auth from "../../Auth/Auth.js";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Typography from "material-ui/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState } from "react";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    zIndex: 2
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "#fff",
    backgroundColor: "#fff"
  }
};

const ProfileMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    Auth.deauthenticateUser();
  };

  const { classes } = props;
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        buttonRef={node => {
          setAnchorEl(node);
        }}
        aria-owns={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircleIcon />
        {Auth.getNickname()}
      </Button>
      <div>
        <Popper
          open={open}
          placement={"bottom-end"}
          anchorEl={anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem
                      component={Link}
                      to="/Profile"
                      onClick={handleClose}
                    >
                      <AccountCircle />
                      <Typography
                        variant="caption"
                        style={{ color: "#212121", paddingLeft: "1%" }}
                      >
                        Perfil
                      </Typography>
                    </MenuItem>
                    <hr />
                    <MenuItem
                      component={Link}
                      to="/BookedTrips"
                      onClick={handleClose}
                    >
                      <ViewAgenda />
                      <Typography
                        variant="caption"
                        style={{ color: "#212121", paddingLeft: "1%" }}
                      >
                        Reservas
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/TripOffers"
                      onClick={handleClose}
                    >
                      <ViewCarousel />
                      <Typography
                        variant="caption"
                        style={{ color: "#212121", paddingLeft: "1%" }}
                      >
                        Viajes Publicados
                      </Typography>
                    </MenuItem>
                    <hr />
                    <MenuItem
                      component={Link}
                      to="/"
                      onClick={handleCloseLogout}
                    >
                      <ExitToApp />
                      <Typography
                        variant="caption"
                        style={{ color: "#212121", paddingLeft: "1%" }}
                      >
                        Salir
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProfileMenu);

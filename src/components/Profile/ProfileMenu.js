import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Auth from "../Auth/Auth.js";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Typography from "material-ui/Typography";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class ProfileMenu extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseLogout = () => {
    this.setState({ anchorEl: null });
    Auth.deauthenticateUser();
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <div>
          <Button
            aria-owns={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <Avatar src="https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/12963492_10209579536151536_6662472157604379054_n.jpg?_nc_cat=100&_nc_ht=scontent.faep9-1.fna&oh=39a1c64cf2e477c9c4ff8e617780aa2f&oe=5D29225F" />
            {Auth.getNickname()}
          </Button>

          <Popper
            open={open}
            placement={"bottom-end"}
            anchorEl={this.anchorEl}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-appbar"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem
                        component={Link}
                        to="/Profile"
                        onClick={this.handleClose}
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
                        onClick={this.handleClose}
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
                        onClick={this.handleClose}
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
                        onClick={this.handleCloseLogout}
                      >
                        <ExitToApp />
                        <Typography
                          variant="caption"
                          style={{ color: "#212121", paddingLeft: "1%" }}
                        >
                          Logout
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
  }
}

export default withStyles(styles)(ProfileMenu);

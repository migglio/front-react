import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import Message from '@material-ui/icons/Message';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Auth from '../Auth/Auth.js'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ProfileMenu extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
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
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                <Avatar alt="Remy Sharp" src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217208501150893&height=50&width=50&ext=1554739566&hash=AeQKw7zkyBkC5RI9" />
                {Auth.getNickname()}
                </Button>

        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
        >
            <MenuItem component={Link} to="/Profile" onClick={this.handleClose} >
                <AccountCircle/>Perfil</MenuItem>
            <MenuItem  onClick={this.handleClose}><ViewAgenda/>Reservas</MenuItem>
            <MenuItem  onClick={this.handleClose}><ViewCarousel/>Viajes Publicados</MenuItem>
            <MenuItem  onClick={this.handleClose}><Message/>Mensajes</MenuItem>
            <MenuItem component={Link} to="/"  onClick={this.handleCloseLogout}><ExitToApp/>Logout</MenuItem>
        </Menu>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileMenu);

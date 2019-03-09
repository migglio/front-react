import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Auth from './Auth/Auth.js'
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class Header extends React.Component{

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar style={{ marginLeft:'15%',marginRight:'15%' }}>
        <Button color="inherit" href="/" >Car APP</Button>
          <Typography variant="title" color="inherit" className={classes.flex} >
            
          </Typography>
          
          {Auth.isUserAuthenticated() ?
          (<div style={{display:"flex"}}><Button color="inherit" onClick={Auth.deauthenticateUser} href="/" >LogOut</Button>
          <Avatar alt="Remy Sharp" src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217208501150893&height=50&width=50&ext=1554739566&hash=AeQKw7zkyBkC5RI9" />
          <Button color="inherit">{Auth.getNickname()}</Button>
          </div>
          ):(
            <div>
              <Button color="inherit"href="/TripDetails">Trip details</Button>
              <Button color="inherit"href="/TripCreator">Offer a Ride</Button>
              <Button color="inherit" href="/login" >Login</Button>
              <Button color="inherit"href="/register">Register</Button>
          </div>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)
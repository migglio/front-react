import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Auth from './Auth/Auth.js'

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
      <AppBar position="fixed" >
        <Toolbar style={{ marginLeft:'15%',marginRight:'15%' }}>
        <Button color="inherit" href="/" >Car APP</Button>
          <Typography variant="title" color="inherit" className={classes.flex} >
            
          </Typography>
          
          {Auth.isUserAuthenticated() ?
          (<div><Button color="inherit" onClick={Auth.deauthenticateUser} href="/" >LogOut</Button>
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
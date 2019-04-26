import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Notifications from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Typography from 'material-ui/Typography';
import NotificationTypes from './notificationTypes'
import axios from 'axios'
import handleServerResponse from '../../response'
import url from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress';
import Auth from '../Auth/Auth';
import NotificationSaver from './NotificationSaver';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  centerLink: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    fontSize: '12px',
    padding: '2%'
  },
  rightLink: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    fontSize: '11px',
    paddingRight: '2%'
  },
  margin: {
    margin: theme.spacing.unit,
  },
  divider: {
    width: '100%',
  },
  row: {
    marginTop: theme.spacing.unit * 2,
  },

});

const moment = require('moment');

class NotificationsHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notifications: [],
      open: false,
      invisible: false,
      loaded: false
    };
  }
  //Carga de Datos
  componentWillMount() {
    axios.all([this.loadTripList()])
    .then(axios.spread((res1) => {
      if(res1!==undefined){
        this.setState({
          notifications: res1.data,
          loaded:true
      })}
    }))
  }

  //load all the trips in which the user is
  loadTripList(){
    return axios.get(url.api + 'notifications/notReadNotifications', {params: {userId:Auth.getUserID()}})
    .catch((error) => {
        handleServerResponse(error, 'An error occured when getting the notification data')
    })
  }

  //mark every notifications as read
  markAsRead(){
    alert('entra')
    this.state.notifications.map(notification => {
      const users = notification.read;
      if (users.indexOf(Auth.getUserID()) > -1){
        users.push(Auth.getUserID());
        console.log(users);
        NotificationSaver.markAsRead(notification._id, users);  
      }
    })
  }


	  
  handleToggle = () => {
    this.setState({ open: !this.state.open, invisible:true });
  };

  handleClose = event => {
    this.setState({ open: false, invisible:false });
    if (this.anchorEl.contains(event.target)) {
      return;
    }
  };

    renderNotifications(){
      const { classes } = this.props;

      return(
          <div >
            {this.state.loaded?(
            <div>
            <Typography className={classes.root} variant="body1" gutterBottom style={{ alignItems: 'left', color:'#21212',fontWeight: 700, padding: '1%'}} >
              Notificaciones
            </Typography>
                <a className={classes.rightLink} href="/" onClick={this.markAsRead}>
                  <Typography className={classes.rightLink} variant="body1" >
                    Marcar todas como leidas
                  </Typography>
                </a>
                <hr/>
                {this.state.notifications.length > 0 ?
                  this.state.notifications.map(item => 
                      <div>
                        <MenuItem >
                          <Avatar alt="Remy Sharp" src="../../profile.jpg" />
                          <Typography variant="caption" style={{ color:'#212121', padding: '1%'}} >
                            <b>{item.nickname} </b> 
                            {NotificationTypes.getNotificationText(item.type)}
                            <br/>
                            <b>{moment(item.date).format('LLLL')}</b> 
                          </Typography>
                        </MenuItem>
                        <hr/>
                      </div>
                )
            :
            <div>
              <Typography className={classes.centerLink} variant="subheading" gutterBottom style={{ color:'#21212',fontWeight: 700, padding: '1%'}} >
                No tienes nuevas notificaciones
              </Typography>
              <hr/>
            </div>
            }
            <a className={classes.centerLink} href="/NotificationView">
                Ver todas 
            </a>
            </div>
            )
				:(<CircularProgress />)}
        </div> )     

  }

  handleBadgeVisibility = () => {
    this.setState(prevState => ({ invisible: !prevState.invisible }));
  };



  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
          {(!this.state.invisible && this.state.notifications.length > 0 ) ? (
            <Badge
            color="error"
            badgeContent={this.state.notifications.length}
            className={classes.margin}
          >
            <Notifications/>
          </Badge>)
          : <Notifications/>
          }
          </Button>
          <Popper open={open} placement={'bottom-end'} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {this.renderNotifications()}
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

NotificationsHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsHeader);

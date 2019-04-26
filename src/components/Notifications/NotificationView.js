import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from 'material-ui/Typography';
import NotificationTypes from './notificationTypes'
import axios from 'axios'
import handleServerResponse from '../../response'
import url from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper } from '@material-ui/core';
import List from "@material-ui/core/List";
import Auth from '../Auth/Auth';
import NotificationSaver from './NotificationSaver';
import NotificationButtons from './NotificationButtons';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingTop: '2%' 
  },
  centerLink: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 2,
  },

});

const moment = require('moment');

class NotificationView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          notifications: [],
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
            })
          }
    
          //mark every notifications as read
          this.markAsRead();
        }))
    }

    loadTripList(){
    return axios.get(url.api + 'notifications', {params: {userId:Auth.getUserID()}})
    .catch((error) => {
        handleServerResponse(error, 'An error occured when getting the trips data')
    })
    }

    //mark every notifications as read
    markAsRead(){
      this.state.notifications.map(notification => {
        const users = notification.read;
        if (users.indexOf(Auth.getUserID()) === -1){
          users.push(Auth.getUserID());
          console.log(users);
          NotificationSaver.markAsRead(notification._id, users);  
        }
      })
    }


    render(){
        const { classes } = this.props;
        return(  
            <div >
            {this.state.loaded?(
            <div className={classes.root}>
            <Paper>
                <Typography className={classes.centerLink} variant="subheading" gutterBottom style={{ color:'#21212',fontWeight: 700, padding: '1%'}} >
                    Notificaciones
                </Typography>
                <hr/>
                <List >
                    {this.state.notifications.length > 0 
                    ? 
                      this.state.notifications.map(item =>
                        <ul>
                            <div  className={classes.row}>
                                <Avatar src="https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/12963492_10209579536151536_6662472157604379054_n.jpg?_nc_cat=100&_nc_ht=scontent.faep9-1.fna&oh=39a1c64cf2e477c9c4ff8e617780aa2f&oe=5D29225F" />
                                <Typography variant="caption" style={{ color:'#212121', padding: '1%'}} >
                                <b>{item.nickname} </b> 
                                {NotificationTypes.getNotificationText(item.type)}
                                <br/>
                                <b>{moment(item.date).format('LLLL')}</b> 
                                </Typography>
                                <NotificationButtons notification={item}/>
                            </div>
                            <hr/>
                        </ul>
                        )
                    : null}
                        <ul>
                            <Typography className={classes.centerLink} variant="caption" gutterBottom style={{ color:'#21212',fontWeight: 700, padding: '1%'}} >
                                No tienes mas notificaciones
                            </Typography>
                        </ul>    
                </List> 

            </Paper>
            </div>
            )
        :(<CircularProgress />)}
    </div> )     
    }
}

export default withStyles(styles)(NotificationView);


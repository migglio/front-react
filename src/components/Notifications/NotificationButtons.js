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
import Button from '@material-ui/core/Button';

const styles = theme => ({
  Buttons: {
    display: 'flex',
    background: '#EB1B00',
    color:'white',
    marginRight: '3%',
  },
  rightButtons: {
    display: 'flex',
    marginLeft: 'auto',
  }

});

const moment = require('moment');

class NotificationView extends React.Component{
    constructor(props){
        super(props);
    }

    isEdition(type){
        return (type === 0)
    }
  

    render(){
        const { classes } = this.props;
        return(  
            <div className={classes.rightButtons}>
                {this.isEdition(this.props.notification.type) ? 
                    <Button href={'tripDetails?id='+this.props.notification.idTrip} variant="raised" size="small" className={classes.Buttons}>Detalles</Button>
                : null
                }
            </div> )     
    }
}

export default withStyles(styles)(NotificationView);


import React from 'react';
import axios from 'axios'
import handleServerResponse from '../../response'
import url from '../../config'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar, Button } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import StarIcon from '@material-ui/icons/Star';
import yellow from '@material-ui/core/colors/yellow';
import ProfileResume from './ProfileResume'
import Auth from '../Auth/Auth';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
      },    
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 80,
      height: 80,
    },
  });
  

class Profile extends React.Component{

    constructor(props){
		super(props);

		this.state = {
            owner: Auth.getUserID(),
		}
	}

    render(){
        const { classes } = this.props;

        return (
			<div style={{textAlign:"center",alignItems:"center",paddingTop:"2%",paddingLeft:"25%", paddingRight:"25%"}}>
                <Paper>
                    <ProfileResume tripData={this.state}></ProfileResume>
                    <br/>
                    <Button href="/" className={classes.button} variant="raised" color="primary" fullWidth>
                        Edit Profile
                    </Button>
                    <Button href="/" className={classes.button} variant="raised" color="primary" fullWidth>
                        Viajes Publicados
                    </Button>
                    <Button href="/" className={classes.button} variant="raised" color="primary" fullWidth>
                        Reservas
                    </Button>
                </Paper>
            </div>
         );
    }
}

export default withStyles(styles)(Profile); 
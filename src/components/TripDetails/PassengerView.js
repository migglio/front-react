import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import SinglePassengerView from './SinglePassengerView';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  });
  

class PassengerView extends React.Component{

    constructor(props){
		super(props);
	}

    render(){
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="headline" gutterBottom style={{ color:'#054752',fontWeight: 700, padding: '0%'}} >
                  Passengers
                </Typography>

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <SinglePassengerView subtitle="confirmed" passengers={this.props.passengers.users}></SinglePassengerView>
                  <SinglePassengerView subtitle="pending" passengers={this.props.passengers.pendingUsers}></SinglePassengerView>
                </Grid>
            </div>
         );
    }
}

export default withStyles(styles)(PassengerView);

/*
    <SinglePassengerView  passengers={this.props.passengers}></SinglePassengerView>
*/



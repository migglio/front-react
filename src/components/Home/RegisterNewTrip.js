import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Paper } from 'material-ui';

const styles = theme => ({

    paper2: {
      padding: theme.spacing.unit ,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },button: {
        textAlign: 'center',
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
  });
  
class RegisterNewTrip extends React.Component{
    constructor(props) {
        super(props)
    }
    

    render(){
        const { classes } = this.props;

        return (
        <div>
            <Grid 
            container
            spacing={16}
            className={classes.demo}
            alignItems='center'
            direction='row'
            justify='center'>
                <img src={ require('../../driver.jpg') } width="50%" height="50%"/>
                <Grid item className={classes.paper2}>
                        <h1> ¿Cansado de viajar solo?</h1>
                        <h1>Encuentra una compañia de viaje..</h1>
                        <p> Conoce nueva gente, convierte tu viaje mas divertivo y económico. </p> 
                        <p> Conoce nueva gente, convierte tu viaje mas divertivo y económico. </p> 
                        <Grid item className={classes.button}>
                            <Button href="../TripCreator" className={classes.button} variant="raised" color="primary">
                                Offer a Ride
                        </Button>
                </Grid>

                </Grid>
            </Grid>     
        </div>
    );
}

}
export default withStyles(styles)(RegisterNewTrip)

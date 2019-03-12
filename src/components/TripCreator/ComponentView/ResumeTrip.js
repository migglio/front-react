import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalCafeIcon from '@material-ui/icons/LocalCafe'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FlashOnIcon from '@material-ui/icons/FlashOn'
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Grid } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Restaurant from '@material-ui/icons/Restaurant';
import Security from '@material-ui/icons/Security';
import LocalCafe from '@material-ui/icons/LocalCafe';
import red from '@material-ui/core/colors/red';
import AccessTime from '@material-ui/icons/AccessTime';

const styles2 = theme => ({
  root: {
    padding: '1%',
   
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    height: 25,
    width: 25,
  },
  details: {
    'padding':'1%',
    justifyContent: 'space-between'
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  bigAvatar: {
    width: 50,
    height: 50,
  },
  separator:{
    borderRight: `2px solid ${theme.palette.divider}`
    ,},
  paddingTrip:{
    padding: '1% 3% 1% 1%'
  },
  columnFlex1:{
    "flex-grow":  "1",
  },
  columnFlex4:{
    "flex-grow":  "3",
    "text-align":  "left",
    marginLeft:'2%'
  },
  button:{
    background: '#EB1B00',
    color:'white',
    marginRight: '3%',
  }

});

const moment = require('moment');

class resumeTrip extends React.Component {
  constructor(props) {
    super(props)
    this.state={
        res:null,
        userData:null,
        userLoaded:false
    }
  }


  render(){
    const { classes } = this.props;

    return(
      <div className={classes.root}>

			<Grid container spacing={40}>
        <Grid class ='centerRow' item xs={10}>  
          <br/>
          <FormLabel component="legend">Schedule</FormLabel>
        </Grid>
        <br/>       
        <br/>
        <br/>
				<Grid container spacing={40} direction="row" alignItems="center" justify="center" item xs={10}>
          <div style={{ display: 'flex'}}>
            <AccessTime color="primary"/>
            <Typography variant="title" gutterBottom style={{ fontWeight: 500}}>
            {moment(this.props.tripData.date).format('LLLL')}
            </Typography>
          </div>
        </Grid>
				<Grid container spacing={40} direction="row" alignItems="center" justify="center" item xs={10}>
          <div style={{ display: 'flex'}}>
            <Tooltip title="Salida" placement="top">
            <LocationOnIcon color="secondary"/>
            </Tooltip>
            <Typography className={classes.secondaryHeading} gutterBottom>{this.props.tripData.steps[0].name }</Typography>
          </div>
          <ArrowForward className={classes.icon} style={{ color:blue[500]}}/>
          <div  style={{ display: 'flex'}}>
            <Tooltip title="Destino" placement="top">
            <LocationOnIcon style={{ color:green[400]}}/>
            </Tooltip>
            <Typography className={classes.secondaryHeading} gutterBottom>{this.props.tripData.steps[this.props.tripData.steps.length-1].name }</Typography>
          </div>
				</Grid>

				<Grid class ='centerRow' item xs={12} >
          <hr/>
					<FormLabel component="legend">Car specifications</FormLabel>
          <br/>
				</Grid>

				<Grid container spacing={40} direction="row" alignItems="center" justify="center" item xs={10}>
          <Tooltip title="Modelo del Auto" placement="top">
            <div style={{ display: 'flex'}}>
              <DirectionsCarIcon className={classes.icon} style={{ color:blue[900]}}/>
              <Typography className={classes.secondaryHeading} gutterBottom>{this.props.tripData.car}</Typography>
            </div>  
          </Tooltip>
          <Tooltip title="Plazas Disponibles" placement="top">
            <div style={{ display: 'flex'}}>
              <PermIdentityIcon className={classes.icon} style={{ color:blue[500]}}/>
              <Typography variant="subheading" style={{ color:green[800],fontWeight: 600 }}>
              {this.props.tripData.seats }
              </Typography>
            </div>
          </Tooltip>
				</Grid> 				
				<Grid class='centerRow' item xs={10} sm={6}>
          <div className={classNames(classes.columnFlex1,classes.paddingTrip)}>
            <div>
              <Typography variant="headline"  style={{ color:blue[800]}}>
                ${this.props.tripData.price}
              </Typography>
            </div>
            <Typography variant="caption"  >
                Por pasajero
            </Typography >
          </div>

        </Grid>
        <Grid class='centerRow' item xs={10} sm={6}>
          <hr/>
					<FormLabel component="legend">Driver's Preferences</FormLabel>
          <br/>
        </Grid>
				<Grid container spacing={40} direction="row" alignItems="center" justify="center" item xs={10}>
            <Tooltip title={this.props.tripData.reservation ? "Automatic Reservation": "Secure Reservation"} placement="top">
							<div style={{ display: 'flex'}}>
								<Security className={classes.icon} style={{ color: this.props.tripData.reservation ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
						<Tooltip title={this.props.tripData.reservation ? "Food Allowed": "Food not Allowed"} placement="top">
							<div style={{ display: 'flex'}}>
								<Restaurant className={classes.icon} style={{ color: this.props.tripData.food ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>
						<Tooltip title={this.props.tripData.mate ? "Mate Allowed": "Mate not Allowed"} placement="top">
							<div style={{ display: 'flex'}}>
								<LocalCafe className={classes.icon} style={{ color: this.props.tripData.mate ? green[900] : red[900]}}/>
							</div>  
						</Tooltip>

        </Grid>
        <Grid class='centerRow' item xs={10} sm={6}>
        <br/>
          <div style={{ width:'80%', display: 'flex' ,alignItems: 'center'}}>
            <Tooltip title="Descripción" placement="top">
              <AssignmentIcon/>
            </Tooltip>
            <Typography variant="caption"  >
                {(this.props.tripData.details === '') ? "El conductor no ha añadido comentarios":  this.props.tripData.details}
            </Typography>
          </div >
        <br/>
        </Grid>

			</Grid>

    </div>       
)
    }

}

resumeTrip.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles2)(resumeTrip);



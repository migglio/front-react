import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import AccessTime from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalCafeIcon from '@material-ui/icons/LocalCafe'
import AssignmentIcon from '@material-ui/icons/Assignment';
import StarIcon from '@material-ui/icons/Star';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FlashOnIcon from '@material-ui/icons/FlashOn'
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Axios from 'axios';
import url from '../../config'
import CircularProgress from '@material-ui/core/CircularProgress';

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

class ListElement extends React.Component {
  constructor(props) {
    super(props)
    this.state={
        res:null,
        userData:null,
        userLoaded:false
    }
  }

  componentWillMount(){
    Axios.get(url.api+'user/'+this.props.tripData.owner)
    .then((response)=>{
      this.setState({userData:response.data,userLoaded:true})//Check response.local
    })
    .catch(function (error) {
      alert(error);
    })
  }

  render() {
    const { classes } = this.props;
    
    return (
            <div className={classes.root}>
            <ExpansionPanel disabled={this.props.tripData.passangers.total - this.props.tripData.passangers.users.length<1} >

              <ExpansionPanelSummary  >
              <div className={classNames(classes.separator,classes.columnFlex1,classes.paddingTrip)}>
                  <Badge badgeContent={this.state.userLoaded?(this.state.userData.reviews.length):(<CircularProgress />)} color="secondary">
                  <Avatar alt="Remy Sharp" src="https://d2kwny77wxvuie.cloudfront.net/user/AR995eGDRYSjbJUHMtd2WQ/thumbnail_144x144.jpeg" className={classes.bigAvatar}/>
                  </Badge>
                  <Typography className={classes.heading}>
                    {this.state.userLoaded?(this.state.userData.firstname):(<CircularProgress />)}
                  </Typography>
                  <div >
                    <StarIcon style={{ color:yellow[900]}}/>
                    <Typography  style={{fontWeight: 600 }}>
                    {this.state.userLoaded?(
                    this.state.userData.reviews.reduce((p,c,i,a)=>{return p + (c.points/a.length)},0).toFixed(1)+'/5'):
                    (<CircularProgress />)}
                    </Typography>
                    <Typography variant="caption">
                      {this.state.userLoaded?(this.state.userData.reviews.length):(<CircularProgress />)}
                    </Typography>
                  </div>
              </div>
                
              <div className={classNames(classes.separator,classes.columnFlex4,classes.paddingTrip)}>
                
                <div style={{ display: 'flex'}}>
                  <AccessTime color="primary"/>
                  <Typography variant="title" gutterBottom style={{ fontWeight: 500}}>
                  {moment(this.props.tripData.date).format('LLLL')}
                  </Typography>
                </div>
                
                <div style={{ display: 'flex'}}>
                  <Tooltip title="Salida" placement="top">
                  <LocationOnIcon color="secondary"/>
                  </Tooltip>
                  <Typography className={classes.secondaryHeading} gutterBottom>{this.props.tripData.from}</Typography>
                </div>
                
                <div style={{ display: 'flex'}}>
                  <Tooltip title="Desitino" placement="top">
                  <LocationOnIcon style={{ color:green[400]}}/>
                  </Tooltip>
                  <Typography className={classes.secondaryHeading} gutterBottom>{this.props.tripData.to}</Typography>
                </div>

                <div style={{ display: 'flex'}}>
                  <DirectionsCarIcon className={classes.icon} style={{ color:blue[900]}}/>
                  <Typography className={classes.secondaryHeading} gutterBottom>{this.props.tripData.vehiculo}</Typography>
                </div>  
            </div>

                <div className={classNames(classes.columnFlex1,classes.paddingTrip)}>
                  <div>
                    <Typography variant="headline"  style={{ color:blue[800]}}>
                      ${this.props.tripData.price}
                    </Typography>
                  </div>
                  <Typography variant="caption"  >
                      Por pasajero
                  </Typography >
                  <Tooltip title="Plazas Disponibles" placement="top">
                    <div style={{ display: 'inline-flex',padding: '5%'}}>
                      <PermIdentityIcon className={classes.icon} style={{ color:blue[500]}}/>
                      <Typography variant="subheading" style={{ color:green[800],fontWeight: 600 }}>
                      {this.props.tripData.passangers.total - this.props.tripData.passangers.users.length}
                      </Typography>
                    </div>
                  </Tooltip>
                    <div style={{ display: 'block',padding: '2%'}}>
                      {this.props.tripData.automaticReservation?(<Tooltip title="Reserva Automatica" placement="top"><FlashOnIcon color="action" className={classes.icon} style={{ color:yellow[900]}}/></Tooltip>):('')}
                      <LocalCafeIcon color="action" className={classes.icon} style={{ color:blue[900]}}/>
                      <AcUnitIcon color="action" className={classes.icon} style={{ color:blue[900]}}/>
                     </div> 
                </div>
              
              </ExpansionPanelSummary>
              <Divider/>
              <ExpansionPanelDetails className={classes.details}>
                <div style={{ width:'80%',    display: 'flex' ,alignItems: 'center'}}>
                <Tooltip title="Descripción" placement="top">
                  <AssignmentIcon/>
                </Tooltip>
                <Typography variant="caption"  >
                    {this.props.tripData.description}
                </Typography>
                </div >
                <Button href={'tripDetails?id='+this.props.tripData._id} className={classes.button} variant="raised" >
                          Reservar
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>       
    )
  }
}

ListElement.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles2)(ListElement);
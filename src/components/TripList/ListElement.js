import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import AccessTime from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import Axios from "axios";
import url from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonPanel from "./ButtonPanel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarIcon from "@material-ui/icons/Star";
import { extensiveFormat } from "../../libs/dateFormatter";

const styles2 = (theme) => ({
  root: {
    padding: "1%",
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
    padding: "1%",
    justifyContent: "space-between",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  separator: {
    borderRight: `2px solid ${theme.palette.divider}`,
  },
  paddingTrip: {
    padding: "1% 3% 1% 1%",
  },
  columnFlex1: {
    "flex-grow": "1",
    maxWidth: 100,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  columnFlex4: {
    "flex-grow": "3",
    "text-align": "left",
    marginLeft: "2%",
  },
  button: {
    background: "#EB1B00",
    color: "white",
    marginRight: "3%",
  },
  ownerUserInfo: {
    "@media (max-width:768px)": {
      display: "none",
    },
  },
});

class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      userData: null,
      userLoaded: false,
    };
  }

  componentWillMount() {
    if (this.props.tripData.owner) {
      Axios.get(url.api + "user/" + this.props.tripData.owner)
        .then((response) => {
          this.setState({ userData: response.data, userLoaded: true }); //Check response.local
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} id={`tripCard-${this.props.key}`}>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <div
              className={classNames(
                classes.separator,
                classes.columnFlex1,
                classes.paddingTrip,
                classes.ownerUserInfo
              )}
            >
              <div style={{ width: 40 }}>
                <AccountCircleIcon style={{ width: 40 }} />
              </div>
              <Typography className={classes.heading}>
                {this.state.userLoaded ? (
                  this.state.userData.nickname
                ) : (
                  <CircularProgress />
                )}
              </Typography>
              <div>
                <Typography style={{ fontWeight: 600 }}>
                  {this.state.userLoaded ? (
                    <div style={{ alignItems: "center", display: "flex" }}>
                      {this.state.userData.count} <StarIcon />
                    </div>
                  ) : (
                    <CircularProgress />
                  )}
                </Typography>
              </div>
            </div>

            <div
              className={classNames(
                classes.separator,
                classes.columnFlex4,
                classes.paddingTrip
              )}
            >
              <div style={{ display: "flex" }}>
                <AccessTime color="primary" />
                <Typography
                  variant="title"
                  gutterBottom
                  style={{ fontWeight: 500 }}
                >
                  {`${extensiveFormat(this.props.tripData.steps[0].date)}, ${
                    this.props.tripData.steps[0].time
                  } HS`}
                </Typography>
              </div>

              <div style={{ display: "flex" }}>
                <Tooltip title="Salida" placement="top">
                  <LocationOnIcon color="secondary" />
                </Tooltip>
                <Typography className={classes.secondaryHeading} gutterBottom>
                  {this.props.tripData.steps[0].label}
                </Typography>
              </div>

              <div style={{ display: "flex" }}>
                <Tooltip title="Desitino" placement="top">
                  <LocationOnIcon style={{ color: green[400] }} />
                </Tooltip>
                <Typography className={classes.secondaryHeading} gutterBottom>
                  {this.props.tripData.steps[1].label}
                </Typography>
              </div>

              <div style={{ display: "flex" }}>
                <DirectionsCarIcon
                  className={classes.icon}
                  style={{ color: blue[900] }}
                />
                <Typography className={classes.secondaryHeading} gutterBottom>
                  {this.props.tripData.vehiculo}
                </Typography>
              </div>
            </div>

            <div
              className={classNames(classes.columnFlex1, classes.paddingTrip)}
            >
              <div>
                <Typography variant="headline" style={{ color: blue[800] }}>
                  ${this.props.tripData.steps[0].price}
                </Typography>
              </div>
              <Typography variant="caption">Por pasajero</Typography>
              <Tooltip title="Plazas Disponibles" placement="top">
                <div style={{ display: "inline-flex", padding: "5%" }}>
                  <PermIdentityIcon
                    className={classes.icon}
                    style={{ color: blue[500] }}
                  />
                  <Typography
                    variant="subheading"
                    style={{ color: green[800], fontWeight: 600 }}
                  >
                    {this.props.tripData.steps[0].passengers.total -
                      this.props.tripData.steps[0].passengers.users.length}
                  </Typography>
                </div>
              </Tooltip>
              <div style={{ display: "block", padding: "2%" }}>
                {this.props.tripData.automaticReservation ? (
                  <Tooltip title="Reserva Automatica" placement="top">
                    <FlashOnIcon
                      color="action"
                      className={classes.icon}
                      style={{ color: yellow[900] }}
                    />
                  </Tooltip>
                ) : (
                  ""
                )}
                <LocalCafeIcon
                  color="action"
                  className={classes.icon}
                  style={{ color: blue[900] }}
                />
                <AcUnitIcon
                  color="action"
                  className={classes.icon}
                  style={{ color: blue[900] }}
                />
              </div>
            </div>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails className={classes.details}>
            <div
              style={{ width: "80%", display: "flex", alignItems: "center" }}
            >
              <Tooltip title="Descripción" placement="top">
                <AssignmentIcon />
              </Tooltip>
              <Typography variant="caption">
                {this.props.tripData.description}
              </Typography>
            </div>
            <ButtonPanel
              newTrips={this.props.newTrips}
              tripData={this.props.tripData}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ListElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(ListElement);

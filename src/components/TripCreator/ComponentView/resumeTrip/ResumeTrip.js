import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import ArrowForward from "@material-ui/icons/ArrowForward";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FormLabel from "@material-ui/core/FormLabel";
import Restaurant from "@material-ui/icons/Restaurant";
import Security from "@material-ui/icons/Security";
import LocalCafe from "@material-ui/icons/LocalCafe";
import red from "@material-ui/core/colors/red";
import AccessTime from "@material-ui/icons/AccessTime";
import MyMapComponent from "../../GoogleMapAPI/Map";
import { Divider } from "material-ui";
import ToolTipTravel from "./ToolTipTravel";
import {
  SALIDA,
  DESTINO,
  MODELO_AUTO,
  PLAZAS_DISPONIBLES,
  RESERVA_AUTOMATICA,
  RESERVA_SEGURA,
  COMIDA_PERMITIDA,
  COMIDA_NO_PERMITIDA,
  MATE_PERMITIDO,
  MATE_NO_PERMITIDO
} from "./constants";

const styles2 = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  dateData: {
    display: "flex",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center"
  },
  mapTitle: {
    color: "#616161",
    textAlign: "center",
    fontWeight: 700,
    padding: "1%"
  },
  map: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2vh",
    paddingBottom: "2vh"
  },
  cities: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "2vh",
    paddingBottom: "2vh"
  },
  location: {
    display: "flex",
    flexDirection: "row"
  },
  subtitle: {
    paddingTop: "2vh",
    paddingBottom: "2vh"
  },
  preferencesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "2vh"
  },
  iconPreference: {
    paddingLeft: "2vw",
    paddingRight: "2vw"
  },
  carInformation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "2vh"
  },

  input: {
    paddingTop: "2vh",
    paddingBottom: "2vh",
    width: "60%"
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  preferencesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "2vh"
  },
  details: {
    padding: "2vw"
  },
  icon: {
    height: 30,
    width: 30
  }
});

const moment = require("moment");

class resumeTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
      userData: null,
      userLoaded: false
    };
  }

  render() {
    const { classes } = this.props;

    const origen = this.props.tripData.steps[0];
    const destino = this.props.tripData.steps[
      this.props.tripData.steps.length - 1
    ];

    return (
      <div className={classes.root}>
        <div className={classes.map}>
          <Typography variant="title" gutterBottom className={classes.mapTitle}>
            Sobre Mi Viaje
          </Typography>

          {this.props.tripData.steps[0].date && (
            <div className={classes.dateData}>
              <AccessTime color="primary" />
              <Typography
                variant="title"
                gutterBottom
                style={{ fontWeight: 500 }}
              >
                {moment(this.props.tripData.steps[0].date).format("LLLL")}
              </Typography>
            </div>
          )}

          <MyMapComponent steps={this.props.tripData.steps} />

          <div className={classes.cities}>
            {origen.name && destino.name && (
              <Fragment>
                <ToolTipTravel label={SALIDA} value={origen.name} />
                <ArrowForward
                  className={classes.icon}
                  style={{ color: blue[500] }}
                />
                <ToolTipTravel label={DESTINO} value={destino.name} />
              </Fragment>
            )}
          </div>
        </div>

        <FormLabel className={classes.subtitle} component="legend">
          Información del auto
        </FormLabel>

        <div className={classes.carInformation}>
          <div style={{ justifyContent: "center" }}>
            <ToolTipTravel
              label={MODELO_AUTO}
              value={this.props.tripData.car}
            />
            <ToolTipTravel
              label={PLAZAS_DISPONIBLES}
              value={origen.passengers.total - origen.passengers.users.length}
            />

            <div
              className={classNames(classes.columnFlex1, classes.paddingTrip)}
            >
              <div>
                <Typography variant="headline" style={{ color: blue[800] }}>
                  ${this.props.tripData.steps[0].price}
                </Typography>
              </div>
              <Typography variant="caption">Por pasajero</Typography>
            </div>
          </div>
        </div>

        <Divider />

        <FormLabel className={classes.subtitle} component="legend">
          Preferencias del conductor
        </FormLabel>

        <div className={classes.preferencesContainer}>
          <div className={classes.iconPreference}>
            <ToolTipTravel
              label={
                this.props.tripData.reservation
                  ? RESERVA_AUTOMATICA
                  : RESERVA_SEGURA
              }
              value={this.props.tripData.reservation}
            />
          </div>
          <div className={classes.iconPreference}>
            <ToolTipTravel
              label={
                this.props.tripData.food
                  ? COMIDA_PERMITIDA
                  : COMIDA_NO_PERMITIDA
              }
              value={this.props.tripData.food}
            />
          </div>
          <div className={classes.iconPreference}>
            <ToolTipTravel
              label={
                this.props.tripData.mate ? MATE_PERMITIDO : MATE_NO_PERMITIDO
              }
              value={this.props.tripData.mate}
            />
          </div>
        </div>

        <div style={{ width: "80%", display: "flex", alignItems: "center" }}>
          <Tooltip title="Descripción" placement="top">
            <AssignmentIcon />
          </Tooltip>
          <Typography variant="caption">
            {this.props.tripData.details === ""
              ? "El conductor no ha añadido comentarios"
              : this.props.tripData.details}
          </Typography>
        </div>
      </div>
    );
  }
}

resumeTrip.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles2)(resumeTrip);

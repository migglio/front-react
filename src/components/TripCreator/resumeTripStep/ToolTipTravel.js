import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import Security from "@material-ui/icons/Security";
import LocalCafe from "@material-ui/icons/LocalCafe";
import red from "@material-ui/core/colors/red";
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

const ToolTipTravel = props => {
  const { classes, label, value } = props;

  console.log(classes);
  return (
    <div className={classes.location}>
      {label === SALIDA && (
        <Tooltip title={label} placement="top">
          <LocationOnIcon color="secondary" />
        </Tooltip>
      )}
      {label === DESTINO && (
        <Tooltip title={label} placement="top">
          <LocationOnIcon style={{ color: green[400] }} color="secondary" />
        </Tooltip>
      )}
      {label === MODELO_AUTO && (
        <Tooltip title={label} placement="top">
          <DirectionsCarIcon
            className={classes.icon}
            style={{ color: blue[900] }}
          />
        </Tooltip>
      )}
      {label === PLAZAS_DISPONIBLES && (
        <Tooltip title={label} placement="top">
          <PermIdentityIcon
            className={classes.icon}
            style={{ color: blue[500] }}
          />
        </Tooltip>
      )}
      {(label === RESERVA_AUTOMATICA || label === RESERVA_SEGURA) && (
        <Tooltip title={label} placement="top">
          <Security
            className={classes.icon}
            style={{
              color: label === RESERVA_AUTOMATICA ? green[900] : red[900]
            }}
          />
        </Tooltip>
      )}
      {(label === COMIDA_PERMITIDA || label === COMIDA_NO_PERMITIDA) && (
        <Tooltip title={label} placement="top">
          <Security
            className={classes.icon}
            style={{
              color: label === COMIDA_PERMITIDA ? green[900] : red[900]
            }}
          />
        </Tooltip>
      )}
      {(label === MATE_PERMITIDO || label === MATE_NO_PERMITIDO) && (
        <Tooltip title={label} placement="top">
          <LocalCafe
            className={classes.icon}
            style={{
              color: label === MATE_PERMITIDO ? green[900] : red[900]
            }}
          />
        </Tooltip>
      )}
      <Typography
        variant="subheading"
        style={{ color: "#2d5c7d", fontWeight: 600 }}
      >
        {value}
      </Typography>
    </div>
  );
};

export default withStyles(styles2)(ToolTipTravel);

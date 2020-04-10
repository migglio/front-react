import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowForward from "@material-ui/icons/ArrowForward";
import blue from "@material-ui/core/colors/blue";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FormLabel from "@material-ui/core/FormLabel";
import AccessTime from "@material-ui/icons/AccessTime";
import MyMapComponent from "../../../shared/GoogleMapAPI/Map";
import { Divider } from "material-ui";
import ToolTipTravel from "./ToolTipTravel";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
  MATE_NO_PERMITIDO,
} from "./constants";
import CustomButton from "../../../shared/customButton/CustomButton";
import { useState } from "react";
import { useEffect } from "react";
import { extensiveFormat } from "../../../../libs/dateFormatter";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  dateData: {
    display: "flex",
    paddingTop: "2vh",
    paddingBottom: "2vh",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  mapTitle: {
    color: "#616161",
    textAlign: "center",
    fontWeight: 700,
    padding: "1%",
  },
  map: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2vh",
    paddingBottom: "2vh",
  },
  cities: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "2vh",
    paddingBottom: "2vh",
  },
  subtitle: {
    paddingTop: "2vh",
    paddingBottom: "2vh",
  },
  preferencesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "2vh",
  },
  iconPreference: {
    paddingLeft: "2vw",
    paddingRight: "2vw",
  },
  carInformation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "2vh",
  },
  description: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    width: "100%",
  },
  icon: {
    height: 30,
    width: 30,
  },
});

const ResumeTripStep = ({
  classes,
  tripData,
  showButton,
  open,
  onBack,
  onSave,
}) => {
  const [openDefault, setOpenDefault] = useState(false);

  useEffect(() => {
    setOpenDefault(open);
  }, [open]);

  const origen = tripData.steps[0];
  const destino = tripData.steps[tripData.steps.length - 1];

  const handleNext = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  console.log("detail", extensiveFormat(tripData.date));

  return (
    <div className={classes.root}>
      <div className={classes.map}>
        <ExpansionPanel expanded={openDefault}>
          <ExpansionPanelSummary
            onClick={() => setOpenDefault(!openDefault)}
            expandIcon={<ExpandMoreIcon />}
          >
            <div>
              <Typography variant="body1" className={classes.mapTitle}>
                Sobre Mi Viaje
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <>
            {tripData.date && (
              <div className={classes.dateData}>
                <AccessTime color="primary" />
                <Typography variant="title" style={{ fontWeight: 500 }}>
                  {`${extensiveFormat(tripData.date)}, ${tripData.time} HS`}
                </Typography>
              </div>
            )}

            <MyMapComponent steps={tripData.steps} />

            <div className={classes.cities}>
              {origen.name && destino.name && (
                <>
                  <ToolTipTravel label={SALIDA} value={origen.name} />
                  <ArrowForward
                    className={classes.icon}
                    style={{ color: blue[500] }}
                  />
                  <ToolTipTravel label={DESTINO} value={destino.name} />
                </>
              )}
            </div>

            {(tripData.car || tripData.seats || tripData.price) && (
              <FormLabel className={classes.subtitle} component="legend">
                Información del auto
              </FormLabel>
            )}
            <div className={classes.carInformation}>
              <div style={{ justifyContent: "center" }}>
                {tripData.price && (
                  <div
                    className={classNames(
                      classes.columnFlex1,
                      classes.paddingTrip
                    )}
                  >
                    <div>
                      <Typography
                        variant="headline"
                        style={{ color: blue[800] }}
                      >
                        ${tripData.price}
                      </Typography>
                    </div>
                    <Typography variant="caption">Por pasajero</Typography>
                  </div>
                )}
                {tripData.seats && (
                  <ToolTipTravel
                    label={PLAZAS_DISPONIBLES}
                    value={tripData.seats}
                  />
                )}
                {tripData.car && (
                  <ToolTipTravel label={MODELO_AUTO} value={tripData.car} />
                )}
              </div>
            </div>

            <Divider />

            {(tripData.car || tripData.seats || tripData.price) && (
              <>
                <FormLabel className={classes.subtitle} component="legend">
                  Preferencias del conductor
                </FormLabel>
                <div className={classes.preferencesContainer}>
                  <div className={classes.iconPreference}>
                    <ToolTipTravel
                      label={
                        tripData.reservation
                          ? RESERVA_AUTOMATICA
                          : RESERVA_SEGURA
                      }
                      value={tripData.reservation}
                    />
                  </div>
                  <div className={classes.iconPreference}>
                    <ToolTipTravel
                      label={
                        tripData.food ? COMIDA_PERMITIDA : COMIDA_NO_PERMITIDA
                      }
                      value={tripData.food}
                    />
                  </div>
                  <div className={classes.iconPreference}>
                    <ToolTipTravel
                      label={tripData.mate ? MATE_PERMITIDO : MATE_NO_PERMITIDO}
                      value={tripData.mate}
                    />
                  </div>
                </div>
                <div className={classes.description}>
                  <Tooltip title="Descripción" placement="top">
                    <AssignmentIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {!tripData.details
                      ? "El conductor no ha añadido comentarios"
                      : tripData.details}
                  </Typography>
                </div>
              </>
            )}
          </>
        </ExpansionPanel>
      </div>
      {showButton && (
        <div>
          <CustomButton label="VOLVER" onClick={handleBack} />
          <CustomButton label="GUARDAR" onClick={handleNext} />
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(ResumeTripStep);

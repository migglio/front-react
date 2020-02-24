import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import CustomButton from "../../../shared/customButton/CustomButton";
import Typography from "@material-ui/core/Typography";
import tripConfirmed from "../../../../images/tripSaved.svg";
import requestFailed from "../../../../images/requestFailed.svg";
import ContentLoader from "react-content-loader";
import { trips } from "../../../../api/Trips";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  title: {
    fontFamily: "Nunito",
    fontSize: "19px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.37",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#616161",
    padding: "1%"
  },
  customButtonContainer: { width: "80%" },
  imageContainer: { width: "300px", padding: "20px" },
  image: { width: "100%" }
});

const TripSaverStep = ({ classes, tripData }) => {
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const postTrips = async id => {
    const response = await trips().postTrips(tripData);
    setSuccess(response.success);
    setLoaded(true);
  };

  useEffect(() => {
    postTrips();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!loaded && (
        <div className={classes.root}>
          <div
            style={{
              padding: "20px",
              width: "100%",
              height: "100%"
            }}
          >
            <ContentLoader
              style={{
                width: "100%",
                height: "100%"
              }}
              height={540}
              width={500}
              speed={1}
              primaryColor="#f7f8ff"
              secondaryColor="#d9e8df"
            >
              <rect x="40" y="0" rx="8" ry="8" width="450" height="20" />
              <rect x="40" y="30" rx="8" ry="8" width="450" height="500" />
            </ContentLoader>
          </div>
        </div>
      )}
      {loaded && (
        <div className={classes.root}>
          {success && (
            <>
              <Typography className={classes.title}>
                El viaje ha sido guardado correctamente
              </Typography>
              <div className={classes.imageContainer}>
                <img className={classes.image} alt="" src={tripConfirmed} />
              </div>
            </>
          )}

          {!success && (
            <>
              <Typography className={classes.title}>
                ¡Lo sentimos! El viaje no ha sido guardado correctamente
              </Typography>
              <div className={classes.imageContainer}>
                <img className={classes.image} alt="" src={requestFailed} />
              </div>
            </>
          )}

          <div className={classes.customButtonContainer}>
            <CustomButton label="VOLVER AL INICIO" to="/" />
          </div>
        </div>
      )}
    </>
  );
};

export default withStyles(styles)(TripSaverStep);

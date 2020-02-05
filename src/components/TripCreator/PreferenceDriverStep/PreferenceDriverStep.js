import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "material-ui";
import { useState } from "react";
import PriceSelector from "../../shared/priceSelector/PriceSelector";
import SeatSelector from "../../shared/seatSelector/SeatSelector";
import CarSelector from "../../shared/carSelector/CarSelector";
import ReservationSelector from "../../shared/reservationSelector/ReservationSelector";
import FoodSelector from "../../shared/foodSelector/FoodSelector";
import MateSelector from "../../shared/mateSelector/MateSelector";
import DetailsSelector from "../../shared/detailsSelector/DetailsSelector";
import CustomButton from "../../shared/customButton/CustomButton";

const styles2 = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
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

const PreferenceDriverStep = ({ classes }) => {
  const [price, setPrice] = useState(null);

  return (
    <div className={classes.root}>
      <FormLabel className={classes.subtitle} component="legend">
        Información del auto
      </FormLabel>

      <div className={classes.inputsContainer}>
        <PriceSelector label="Precio" />
        <SeatSelector label="Pasajeros" />
        <CarSelector label="Vehículo" />
      </div>

      <Divider />

      <FormLabel className={classes.subtitle} component="legend">
        Preferencias del conductor
      </FormLabel>

      <div className={classes.preferencesContainer}>
        <ReservationSelector />
        <FoodSelector />
        <MateSelector />
      </div>

      <Divider />

      <DetailsSelector label="Detalles" />

      <div>
        <CustomButton label="VOLVER" />
        <CustomButton
          label="CONTINUAR"
          //onClick={handleNext}
          //disabled={!allComplete}
        />
      </div>
    </div>
  );
};

export default withStyles(styles2)(PreferenceDriverStep);

/*
<div className={classes.preferencesContainer}>


*/

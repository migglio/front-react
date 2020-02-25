import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import { Divider } from "material-ui";
import { useState } from "react";
import PriceSelector from "../../../shared/priceSelector/PriceSelector";
import SeatSelector from "../../../shared/seatSelector/SeatSelector";
import CarSelector from "../../../shared/carSelector/CarSelector";
import ReservationSelector from "../../../shared/reservationSelector/ReservationSelector";
import FoodSelector from "../../../shared/foodSelector/FoodSelector";
import MateSelector from "../../../shared/mateSelector/MateSelector";
import DetailsSelector from "../../../shared/detailsSelector/DetailsSelector";
import CustomButton from "../../../shared/customButton/CustomButton";
import { useEffect } from "react";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  subtitle: {
    paddingTop: "2vh",
    paddingBottom: "2vh"
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
  }
});

const PreferenceDriverStep = ({
  classes,
  tripData,
  onComplete,
  onBack,
  onChange
}) => {
  const [allComplete, setAllComplete] = useState(false);

  const [price, setPrice] = useState(tripData.price);
  const [seats, setSeats] = useState(tripData.seats);
  const [car, setCar] = useState(tripData.car);
  const [reservation, setReservation] = useState(tripData.reservation);
  const [food, setFood] = useState(tripData.food);
  const [mate, setMate] = useState(tripData.mate);
  const [details, setDetails] = useState(tripData.details);

  useEffect(() => {
    setAllComplete(price && seats && car);
  }, [price, seats, car]);

  const handleNext = () => {
    if (onComplete && allComplete) {
      onComplete({ price, seats, car, reservation, food, mate, details });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack({ price, seats, car, reservation, food, mate, details });
    }
  };

  useEffect(() => {
    console.log("det", details);
    onChange({ price, seats, car, reservation, food, mate, details });
  }, [onChange, price, seats, car, reservation, food, mate, details]);

  return (
    <div className={classes.root}>
      <FormLabel className={classes.subtitle} component="legend">
        Información del auto
      </FormLabel>

      <div className={classes.inputsContainer}>
        <PriceSelector
          label="Precio"
          defaultValue={price}
          onChange={setPrice}
        />
        <SeatSelector
          label="Pasajeros"
          defaultValue={seats}
          onChange={setSeats}
        />
        <CarSelector label="Vehículo" defaultValue={car} onChange={setCar} />
      </div>

      <Divider />

      <FormLabel className={classes.subtitle} component="legend">
        Preferencias del conductor
      </FormLabel>

      <div className={classes.preferencesContainer}>
        <ReservationSelector value={reservation} onChange={setReservation} />
        <FoodSelector value={food} onChange={setFood} />
        <MateSelector value={mate} onChange={setMate} />
      </div>

      <Divider />

      <DetailsSelector label="Detalles" value={details} onChange={setDetails} />

      <div>
        <CustomButton label="VOLVER" onClick={handleBack} />
        <CustomButton
          label="CONTINUAR"
          onClick={handleNext}
          disabled={!allComplete}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(PreferenceDriverStep);

import React from "react";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SwapVerticalCircle from "@material-ui/icons/SwapVerticalCircle";
import blue from "@material-ui/core/colors/blue";
import DateSelector from "../../../shared/DateSelector/DateSelector";
import { withStyles } from "@material-ui/core/styles";
import CitySearcher from "../../../shared/GoogleMapAPI/CitySearcher";
import { useState } from "react";
import TimeSelector from "../../../shared/timeSelector/TimeSelector";
import { useEffect } from "react";
import CustomButton from "../../../shared/customButton/CustomButton";

const styles2 = theme => ({
  root: {
    padding: 20
  },
  searchButton: {
    paddingBottom: "2vh"
  },
  icon: {
    height: 30,
    width: 30
  },
  dateContainer: {
    display: "flex",
    paddingTop: "3vh",
    flexDirection: "row"
  },
  dateSelector: {
    paddingBottom: "3vh",
    width: "100%"
  }
});

const MeetingDataStep = ({ classes, tripData, onComplete }) => {
  const [allComplete, setAllComplete] = useState(false);

  const [from, setFrom] = useState(tripData.steps ? tripData.steps[0] : null);
  const [to, setTo] = useState(
    tripData.steps ? tripData.steps[tripData.steps.length - 1] : null
  );
  const [date, setDate] = useState(tripData.date);
  const [time, setTime] = useState(tripData.time);

  const changeOrder = () => {
    const aux = from;
    setFrom(to);
    setTo(aux);
  };

  useEffect(() => {
    setAllComplete(from && to && date && time);
  }, [from, to, date, time]);

  const handleNext = () => {
    const allComplete = from && to && date && time;
    if (onComplete && allComplete) {
      const fromSelected = {
        ...from,
        price: null,
        time: null,
        date: null,
        passengers: { total: null, users: [], pendingUsers: [] }
      };
      onComplete({ from: fromSelected, to, date, time });
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.searchButton}>
          <CitySearcher
            placeholder="Desde"
            onComplete={setFrom}
            defaultValue={from ? from.label : null}
            label={from ? from.label : null}
          />
        </div>
        <Button onClick={changeOrder}>
          <SwapVerticalCircle
            className={classes.icon}
            style={{ color: blue[900] }}
          />
        </Button>
        <div className={classes.searchButton}>
          <CitySearcher
            placeholder="Hasta"
            onComplete={setTo}
            defaultValue={to ? to.label : null}
            label={to ? to.label : null}
          />
        </div>
        <Divider />
        <div className={classes.dateContainer}>
          <DateSelector label="Fecha de viaje" onChange={setDate} date={date} />
          <TimeSelector label="Hora de viaje" onChange={setTime} value={time} />
        </div>
      </div>
      <div>
        <CustomButton label="VOLVER" disabled={true} />
        <CustomButton
          label="CONTINUAR"
          onClick={handleNext}
          disabled={!allComplete}
        />
      </div>
    </>
  );
};

export default withStyles(styles2)(MeetingDataStep);

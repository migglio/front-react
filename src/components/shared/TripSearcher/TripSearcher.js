import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Paper } from "material-ui";
import { withStyles } from "material-ui/styles";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
import CitySearcher from "../GoogleMapAPI/CitySearcher";
import DateSelector from "../../shared/DateSelector/DateSelector";

const styles = (theme) => ({
  root: { display: "flex", flexWrap: "wrap", justifyContent: "center" },

  paper2: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 8,
    minHeight: 80,
    display: "flex",
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  container: { padding: 16 },
  button: {
    display: "flex",
    borderRadius: 50,
    margin: theme.spacing.unit,
    width: "200px",
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const TripSearcher = (props) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = useState(null);

  const { classes } = props;

  const updateFrom = (value) => {
    setFrom(value.placeId);
  };

  const updateTo = (value) => {
    setTo(value.placeId);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  let params =
    "from=" + (from ? from : "") + "&to=" + (to ? to : "") + "&date=" + date;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper2}>
          <CitySearcher
            placeholder="Desde"
            onComplete={updateFrom}
            name={from}
            steps={[{ name: to }]}
          />
        </Paper>
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper2}>
          <CitySearcher
            placeholder="Hasta"
            onComplete={updateTo}
            name={to}
            steps={[{ name: from }]}
          />
        </Paper>
      </div>
      <div className={classes.container}>
        <Paper className={classes.paper2}>
          <DateSelector onChange={handleDateChange} />
        </Paper>
      </div>
      <div className={classes.container}>
        <div className={classes.paper2}>
          <Button
            component={Link}
            onClick={() => (window.location = `/trips?${params}`)}
            //disabled={!from && !to}
            className={classes.button}
            variant="contained"
            color="primary"
            id="search-button"
          >
            Buscar
            <Search className={classes.rightIcon}>send</Search>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(TripSearcher);

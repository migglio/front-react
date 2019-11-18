import React from "react";
import { Link } from "react-router-dom";
import { Paper } from "material-ui";
import { withStyles } from "material-ui/styles";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
import DateSelector from "../DateSelector";
import CitySearcher from "../shared/GoogleMapAPI/CitySearcher";
import routes, { TRIP_PATH } from "../../constants/routes";
const styles = theme => ({
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
    justifyContent: "center"
  },
  container: { padding: 16 },
  button: {
    display: "flex",
    borderRadius: 50,
    margin: theme.spacing.unit,
    width: "200px"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      date: "",
      redirect: false,
      res: null
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateFrom = this.updateFrom.bind(this);
    this.updateTo = this.updateTo.bind(this);
  }

  render() {
    const { classes } = this.props;

    const params =
      "from=" +
      (this.state.from ? this.state.from : "") +
      "&to=" +
      (this.state.to ? this.state.to : "") +
      "&date=" +
      this.state.date;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Paper className={classes.paper2}>
            <CitySearcher
              callback={this.updateFrom}
              name={this.state.from}
              steps={[{ name: this.state.to }]}
            />
          </Paper>
        </div>
        <div className={classes.container}>
          <Paper className={classes.paper2}>
            <CitySearcher
              callback={this.updateTo}
              name={this.state.to}
              steps={[{ name: this.state.from }]}
            />
          </Paper>
        </div>
        <div className={classes.container}>
          <Paper className={classes.paper2}>
            <DateSelector callback={this.handleDateChange} />
          </Paper>
        </div>
        <div className={classes.container}>
          <div className={classes.paper2}>
            <Button
              component={Link}
              to={routes().trips[TRIP_PATH] + "?" + params}
              //disabled={!this.state.from && !this.state.to}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Buscar
              <Search className={classes.rightIcon}>send</Search>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  updateFrom(f) {
    this.setState({ from: f.name });
  }

  updateTo(t) {
    this.setState({ to: t.name });
  }

  handleDateChange(d) {
    this.setState({ date: d });
  }
}

export default withStyles(styles)(SearchBar);

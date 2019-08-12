import React from "react";
import { Paper } from "material-ui";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
import DateSelector from "../DateSelector";
import MySearchPlaceComponent from "../TripCreator/GoogleMapAPI/CitySearcher";
const styles = theme => ({
  paper2: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 11,
    minHeight: 80,
    display: "flex",
    minWidth: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit
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
    return (
      <div>
        <Grid
          container
          spacing={16}
          className={classes.demo}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item>
            <Paper className={classes.paper2}>
              <MySearchPlaceComponent
                callback={this.updateFrom}
                name={this.state.from}
                steps={[{ name: this.state.to }]}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper2}>
              <MySearchPlaceComponent
                callback={this.updateTo}
                name={this.state.to}
                steps={[{ name: this.state.from }]}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper2}>
              <DateSelector callback={this.handleDateChange} />
            </Paper>
          </Grid>
          <Button
            href={
              "/tripsList?from=" +
              this.state.from +
              "&to=" +
              this.state.to +
              "&date=" +
              this.state.date
            }
            className={classes.button}
            variant="raised"
            color="primary"
          >
            Search
            <Search className={classes.rightIcon}>send</Search>
          </Button>
        </Grid>
        <p />
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

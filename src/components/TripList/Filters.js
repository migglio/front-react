import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputRange from "react-input-range";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    width: "25%",
    padding: "1%"
  },
  ".input-range": {
    "min-height": "35px"
  }
});

class Filters extends React.Component {
  constructor(props) {
    super(props);
    //Default State
    this.state = {
      value: {
        max: Math.max.apply(
          null,
          this.props.trips.map(item => item.steps[0].price)
        ),
        min: Math.min.apply(
          null,
          this.props.trips.map(item => item.steps[0].price)
        )
      },
      max: this.props.max,
      min: 0,
      automaticRes: false,
      plazasDisp: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeAutomaticRes = this.handleChangeAutomaticRes.bind(this);
    this.handleChangePlazasDisp = this.handleChangePlazasDisp.bind(this);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">Precio</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ padding: "21px 24px 40px", margin: "0 5% 0 5%" }}
          >
            <InputRange
              draggableTrack
              formatLabel={value => `$${value}`}
              maxValue={this.props.max}
              minValue={this.props.min}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">Tipo Reserva</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: "column" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.automaticRes}
                  onChange={this.handleChangeAutomaticRes}
                  color="primary"
                />
              }
              label="Reserva Automatica"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.plazasDisp}
                  value="checkedC"
                  color="primary"
                />
              }
              onChange={this.handleChangePlazasDisp}
              label="Solo con plazas disponibles"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  handleChange(value) {
    this.setState({ value });
    this.props.filterTrips(
      value,
      this.state.automaticRes,
      this.state.plazasDisp
    );
  }

  handleChangeAutomaticRes(value) {
    this.setState({ automaticRes: value.target.checked });
    this.props.filterTrips(
      this.state.value,
      value.target.checked,
      this.state.plazasDisp
    );
  }

  handleChangePlazasDisp(value) {
    this.setState({ plazasDisp: value.target.checked });
    this.props.filterTrips(
      this.state.value,
      this.state.automaticRes,
      value.target.checked
    );
  }
}

export default withStyles(styles)(Filters);

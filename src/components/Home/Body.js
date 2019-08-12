import React from "react";
import PlaceSelector from "./PlaceSelector";
import { withStyles } from "material-ui/styles";
import RegisterNewTrip from "./RegisterNewTrip";
import Background from "../../driver-woman.jpeg";

let imgUrl = "../../driver-woman.jpeg";
let styles = {
  root: {
    backgroundImage: "url(" + Background + ")",
    backgroundSize: "cover",
    overflow: "hidden",
    "min-height": "320px"
  }
};

class Body extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <PlaceSelector />
        </div>
        <RegisterNewTrip />
      </div>
    );
  }
}

export default withStyles(styles)(Body);

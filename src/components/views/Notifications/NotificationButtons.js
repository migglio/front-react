import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import routes, { TRIP_PATH } from "../../../constants/routes";

const styles = theme => ({
  Buttons: {
    display: "flex",
    background: "#EB1B00",
    color: "white",
    marginRight: "3%"
  },
  rightButtons: {
    display: "flex",
    marginLeft: "auto"
  }
});

class NotificationView extends React.Component {
  isEdition(type) {
    return type === 0;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rightButtons}>
        {this.isEdition(this.props.notification.type) ? (
          <Button
            component={Link}
            to={
              routes().trips[TRIP_PATH] + "/" + this.props.notification.idTrip
            }
            variant="raised"
            size="small"
            className={classes.Buttons}
          >
            Detalles
          </Button>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(NotificationView);

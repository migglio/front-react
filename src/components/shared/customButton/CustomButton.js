import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const stylesCustomButton = theme => ({
  button: {
    textAlign: "center",
    margin: theme.spacing.unit,
    width: "100%"
  }
});

const CustomButton = ({ classes, label, disabled, onClick, to }) => {
  return (
    <Button
      disabled={disabled}
      variant="raised"
      color="primary"
      onClick={onClick}
      className={classes.button}
      component={Link}
      to={to}
    >
      {label}
    </Button>
  );
};

export default withStyles(stylesCustomButton)(CustomButton);

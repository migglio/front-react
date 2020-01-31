import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const stylesCustomButton = theme => ({
  button: {
    textAlign: "center",
    margin: theme.spacing.unit
  }
});

const CustomButton = ({ classes, label, disabled, onClick }) => {
  return (
    <Button
      disabled={disabled}
      variant="raised"
      color="primary"
      onClick={onClick}
      className={classes.button}
    >
      {label}
    </Button>
  );
};

export default withStyles(stylesCustomButton)(CustomButton);

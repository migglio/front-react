import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Restaurant from "@material-ui/icons/Restaurant";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  icon: {
    height: 30,
    width: 30
  }
});

const FoodSelector = ({ classes }) => {
  const [food, setFood] = useState(false);

  const handleChange = () => {
    setFood(!food);
  };

  const title = food ? "Comida Permitida" : "Comida Prohibida";
  return (
    <Button name="food" onClick={handleChange}>
      <Tooltip title={title} placement="top">
        <div style={{ display: "flex" }}>
          <Restaurant
            className={classes.icon}
            style={{
              color: food ? green[900] : red[900]
            }}
          />
        </div>
      </Tooltip>
    </Button>
  );
};

export default withStyles(styles)(FoodSelector);

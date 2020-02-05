import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import LocalCafe from "@material-ui/icons/LocalCafe";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  icon: {
    height: 30,
    width: 30
  }
});

const MateSelector = ({ classes }) => {
  const [mate, setMate] = useState(false);

  const handleChange = () => {
    setMate(!mate);
  };

  const title = mate ? "Comida Permitida" : "Comida Prohibida";
  return (
    <Button name="mate" onClick={handleChange}>
      <Tooltip title={title} placement="top">
        <div style={{ display: "flex" }}>
          <LocalCafe
            className={classes.icon}
            style={{
              color: mate ? green[900] : red[900]
            }}
          />
        </div>
      </Tooltip>
    </Button>
  );
};

export default withStyles(styles)(MateSelector);

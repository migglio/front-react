import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIcon from "@material-ui/icons/Assignment";

const styles = theme => ({
  details: {
    padding: "2vw"
  }
});

const DetailsSelector = ({ classes, label, onChange, value }) => {
  const [details, setDetails] = useState(value);

  const handleChange = event => {
    setDetails(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className={classes.details}>
      <TextField
        id="inputDetails"
        name="details"
        value={details}
        onChange={handleChange}
        label={label}
        multiline
        rows={4}
        rowsMax="4"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AssignmentIcon />
            </InputAdornment>
          )
        }}
        fullWidth
        placeholder="Agrega cualquier información extra que creas relevante"
      />
    </div>
  );
};

export default withStyles(styles)(DetailsSelector);

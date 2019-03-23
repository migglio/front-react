import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PersonAdd from '@material-ui/icons/PersonAdd';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function getType(automatic){
    if (automatic)
        return 'Join to the trip'
    return 'Send Request'
}



function ButtonRequest(props) {
  const { classes } = props;
  return (
    <div>
      <Button disabled={props.completed} variant="contained" color="primary" className={classes.button} onClick={props.joinToTheTrip}>
        <PersonAdd />
        {getType(props.automatic)}
     </Button>

    </div>
    
  );
}

ButtonRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonRequest);

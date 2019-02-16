import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";

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
  //TODO: VER PORQUE NO MUESTRA EL ICONO USANDO "send" 
  return (
      <Button variant="contained" color="primary" className={classes.button}>
        {getType(props.automatic)}
        <Icon className={classes.rightIcon}></Icon>
    </Button>
    
  );
}

ButtonRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonRequest);

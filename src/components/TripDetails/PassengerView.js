import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import SinglePassengerView from './SinglePassengerView';

const styles = theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  });
  

class PassengerView extends React.Component{

    constructor(props){
		super(props);
	}

    render(){
        const { classes } = this.props;

        return (
            <div>
                <h1>Passengers</h1>
                <SinglePassengerView passengers={this.props.passengers}></SinglePassengerView>

            </div>
         );
    }
}

export default withStyles(styles)(PassengerView);

/*
    <SinglePassengerView  passengers={this.props.passengers}></SinglePassengerView>
*/



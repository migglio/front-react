import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MySearchPlaceComponent from './GoogleMapAPI/CitySearcher.js'

export default class TravelSteps extends React.Component {

    constructor(props){
        super(props);
        this.updateLocation = this.updateLocation.bind(this);
    }

    updateLocation(stepLocation, index, name){
      const stepWithName = this.props.newStep();
      stepWithName.location = stepLocation;
      stepWithName.name = name;
      this.props.addStep(stepWithName, index);
    }

    deleteStep(index) {
      this.props.deleteStep(index);
    }

    renderSteps(){
      //clone the array
      const stepsList = this.props.steps.slice();
      stepsList.splice(0, 1);
      stepsList.splice(stepsList.length-1, 1);
      return ( stepsList.map((step, index) =>
        <ListItem>
          <MySearchPlaceComponent callback={this.updateLocation} steps={this.props.steps} idx={index} name={step.name} />

          <IconButton key={index} onClick={this.deleteStep.bind(this, index)} >
          <DeleteIcon aria-label="Delete" color="primary" />
        </IconButton>

      </ListItem>
  ) );
    }

    render(props){
      return(  
        <div>
            <Typography variant="title">
              Cities in the middle
            </Typography>
            <List>
              {this.renderSteps()}
            </List>
        </div>
      );
    }
}
	

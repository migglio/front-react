import React from 'react';
import PlaceSelector from './PlaceSelector';
import { withStyles } from 'material-ui/styles';
import RegisterNewTrip from './RegisterNewTrip'
let imgUrl = 'https://d1ovtcjitiy70m.cloudfront.net/vi-1/images/rebranding/homeblock_main_desktop.jpg'
let styles = {
    root: {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        overflow: 'hidden',
        'min-height':'320px',
    }
}


class Body extends React.Component{
    
  render(){
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <PlaceSelector />      
        </div>
        <br/><br/><br/><br/>  
        <RegisterNewTrip/>
      </div>
  );
}

}

export default withStyles(styles)(Body)
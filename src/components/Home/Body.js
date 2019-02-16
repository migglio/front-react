import React from 'react';
import PlaceSelector from './PlaceSelector';
import { withStyles } from 'material-ui/styles';

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
    <div className={classes.root}>
      <PlaceSelector />
    </div>  
  );
}

}

export default withStyles(styles)(Body)
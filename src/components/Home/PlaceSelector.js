import React from 'react';
import { withStyles } from 'material-ui/styles';
import SearchBar from './SearchBar';

const styles = theme => ({
    root: {
      flexGrow: 1,
      'margin-top': "25%",
    },
    paper2: {
      padding: theme.spacing.unit ,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },button: {
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

  
class PlaceSelector extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            from:'',
            to:'',
            date:new Date(),
            redirect:false,
            res:null
        }
    }

    render(){
        const { classes } = this.props;
        return (
        <div>
            <div className={classes.root}>
                <SearchBar/>
            </div> 
        </div>  
    );
}

}

export default withStyles(styles)(PlaceSelector)
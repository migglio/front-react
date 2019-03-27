import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import UserRequest from '../UserRequestDB/UserRequest'
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  });
  

class SinglePassengerView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            users : []
        }

        this.addUser = this.addUser.bind(this);
    }

    addUser(user){
        const userList = this.state.users;
        userList.push(user);
        this.setState({users: userList});
    }

    
    componentWillMount(){
        for (let index = 0; index < this.props.passengers.length; index++) {
            UserRequest.getUser(this.props.passengers[index], this.addUser);        
        }
    }

    render(){
        const { classes } = this.props;

        return (
            <div style={{justifyContent: 'center'}}>
                <Typography variant="caption" gutterBottom style={{ color:'#054752',fontWeight: 700, padding: '0%'}} >
                  {this.props.subtitle}
                </Typography>

                <List dense className={classes.root}>
                {this.state.users.map(user => (
                <ListItem key={user.nickname} button>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217208501150893&height=50&width=50&ext=1554739566&hash=AeQKw7zkyBkC5RI9" className={classes.bigAvatar}/>
                    </ListItemAvatar>
                    <ListItemText primary={user.nickname} secondary={user.mail}/>
                </ListItem>
                ))}
            </List>
            </div>
         );
    }
}

export default withStyles(styles)(SinglePassengerView);



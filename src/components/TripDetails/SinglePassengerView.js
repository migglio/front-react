import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import UserRequest from '../UserRequestDB/UserRequest'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ValidationButtons from '../ViewWaitingRequests/ValidationButtons'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class SinglePassengerView extends React.Component {
  //constructor
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      request: this.props.request,
      checked: [],
      users: [],
      pendingUsers: []
    };
  
    this.addUser = this.addUser.bind(this);
    this.addPendingUser = this.addPendingUser.bind(this);

    this.getSelected = this.getSelected.bind(this);
  }

  componentWillMount(){
    for (let index = 0; index < this.props.passengers.users.length; index++) 
        UserRequest.getUser(this.props.passengers.users[index], this.addUser);            

    for (let index = 0; index < this.props.passengers.pendingUsers.length; index++) 
      UserRequest.getUser(this.props.passengers.pendingUsers[index], this.addPendingUser);        
  }


  //manage the checkbox
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });

  };

  //manage tabs view
  handleChange = (event, value) => {
    this.setState({ value });
  };

  //manage tabs view
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  //callback from getting data of confirm users from db  
  addUser(user){
    const userList = this.state.users;
    userList.push(user);
    this.setState({users: userList});
  }

  //callback from getting data of pending users from db
  addPendingUser(user){
    const userList = this.state.pendingUsers;
    userList.push(user);
    this.setState({pendingUsers: userList});
  }

  //this method is called when a confirm or deny button is clicked
  getSelected(callback){
    callback(this.props.passengers, this.state.checked);
  }

  //render a list of passengers
  renderUsers(users) {
    const { classes } = this.props;

    if (users.length === 0)
    return (
      <Typography variant="subheading" gutterBottom style={{ color:'#054752',fontWeight: 700, padding: '1%'}} >
        No hay ningún pasajero
      </Typography>)
    else
      return (
          <div style={{justifyContent: 'center'}}>
              <List dense className={classes.root}>
                  {users.map((user, index) => (
                  <ListItem key={user.nickname} button>
                      <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217208501150893&height=50&width=50&ext=1554739566&hash=AeQKw7zkyBkC5RI9" className={classes.bigAvatar}/>
                      </ListItemAvatar>
                      <ListItemText primary={user.nickname} secondary={user.mail}/>
                      {(this.state.value === 1) && (this.state.request) ?
                      <ListItemSecondaryAction>
                        <Checkbox
                          onChange={this.handleToggle(index)}
                          checked={this.state.checked.indexOf(index) !== -1}
                        />
                      </ListItemSecondaryAction>
                      : null}
                  </ListItem>
                  ))}
              </List>
          </div>
      );

  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Confirmados" />
            <Tab label="Pendientes" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}> {this.renderUsers(this.state.users)}</TabContainer>
          <TabContainer dir={theme.direction}>{this.renderUsers(this.state.pendingUsers)}</TabContainer>
        </SwipeableViews>
        {(this.state.value === 1) && (this.state.request) ?
          <ValidationButtons disabled={this.state.checked.length === 0} getSelected={this.getSelected} tripData={this.props.tripData} idTrip={this.props.idTrip}/>          
        : null}

      </div>
    );
  }
}

SinglePassengerView.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SinglePassengerView);

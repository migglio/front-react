import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ValidationButtons from "../../ViewWaitingRequests/ValidationButtons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import { useEffect } from "react";
import ContentLoader from "react-content-loader";
import { users as usersApi } from "../../../api/Users";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

const SinglePassengerView = ({
  classes,
  theme,
  idTrip,
  tripData,
  steps,
  request
}) => {
  const [checked, setChecked] = useState([]);
  const [value, setValue] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [users, setUsers] = useState(steps[0].passengers.users);
  const [pendingUsers, setPendingUsers] = useState(
    steps[0].passengers.pendingUsers
  );

  const getUsers = async users => {
    const result = await usersApi().getUsers(users);
    return result;
  };

  const getUsersPendingAndConfirmed = async passengers => {
    const users = await getUsers(steps[0].passengers.users);
    const pending = await getUsers(steps[0].passengers.pendingUsers);

    setUsers(users);
    setPendingUsers(pending);
  };

  useEffect(() => {
    setLoaded(false);
    getUsersPendingAndConfirmed(steps[0].passengers);
    setLoaded(true);

    //eslint-disable-next-line
  }, [steps]);

  //this method is called when a confirm or deny button is clicked
  const getSelected = callback => {
    //callback(passengers, checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(event, value) => setValue(value)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          centered
        >
          <Tab label="Confirmados" />
          <Tab label="Pendientes" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme && theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={setValue}
      >
        <ListUsers
          index={0}
          dir={theme && theme.direction}
          classes={classes}
          checked={checked}
          setChecked={setChecked}
          users={users ? users : []}
          value={value}
          request={request}
          isLoading={!loaded}
        />
        <ListUsers
          index={1}
          dir={theme && theme.direction}
          classes={classes}
          checked={checked}
          setChecked={setChecked}
          users={pendingUsers ? pendingUsers : []}
          value={value}
          request={request}
          isLoading={!loaded}
        />
      </SwipeableViews>
      {value === 1 && request ? (
        <ValidationButtons
          disabled={checked.length === 0}
          getSelected={getSelected}
        />
      ) : null}
    </div>
  );
};

export default withStyles(styles)(SinglePassengerView);

//render a list of passengers
const ListUsers = ({
  index,
  dir,
  classes,
  checked,
  setChecked,
  users,
  value,
  request,
  isLoading
}) => {
  //manage the checkbox
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(value);
    else newChecked.splice(currentIndex, 1);

    setChecked(newChecked);
  };

  return (
    <div dir={dir} style={{ padding: 8 * 3 }}>
      {isLoading && (
        <List dense className={classes.root}>
          <ListItem key={"loading-1"} button>
            <ListItemAvatar>
              <AccountCircleIcon />
            </ListItemAvatar>
            <ContentLoader
              style={{
                width: "100%",
                height: "100%"
              }}
              height={20}
              width={250}
              speed={1}
              primaryColor="#f7f8ff"
              secondaryColor="#d9e8df"
            >
              <rect x="40" y="0" rx="8" ry="8" width="450" height="20" />
            </ContentLoader>
          </ListItem>
        </List>
      )}
      {!isLoading && users && users.length === 0 && (
        <Typography
          variant="subheading"
          style={{ color: "#054752", fontWeight: 700, padding: "1%" }}
        >
          No hay ningún pasajero
        </Typography>
      )}
      {!isLoading && users && users.length > 0 && (
        <div style={{ justifyContent: "center" }}>
          <List dense className={classes.root}>
            {users.map((user, index) => (
              <ListItem key={user.nickname} button>
                <ListItemAvatar>
                  <AccountCircleIcon />
                </ListItemAvatar>
                <ListItemText primary={user.nickname} secondary={user.mail} />
                {value === 1 && request && (
                  <ListItemSecondaryAction>
                    <Checkbox
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                    />
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

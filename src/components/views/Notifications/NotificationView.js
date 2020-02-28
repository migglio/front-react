import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "material-ui/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import NotificationButtons from "./NotificationButtons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { notifications as notificacionsApi } from "../../../api/Notifications";
import { notificationDescriptionsManager } from "../../../constants/notificationTypes";
import Auth from "../../Auth/Auth";
import { Divider } from "material-ui";
import listEmpty from "../../../images/listEmpty.svg";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    minHeigth: "500px",
    width: "96vw",
    "@media (min-width:768px)": {
      width: "500px"
    }
  },
  centerLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    paddingTop: 8
  },
  rightLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    fontSize: "11px",
    paddingRight: "8px"
  },
  margin: {
    margin: theme.spacing.unit
  },
  divider: {
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.unit * 2
  },
  imageContainer: {
    width: "80vw",
    "@media (min-width:768px)": {
      width: "350px"
    }
  },
  image: {
    width: "100%"
  }
});

const moment = require("moment");

const NotificationView = ({ classes }) => {
  const [notifications, setNotifications] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getNotifications = async () => {
    const response = await notificacionsApi().getNotifications(
      Auth.getUserID()
    );
    setNotifications(response);
    console.log("response", response);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getNotifications();

    //eslint-disable-next-line
  }, []);

  //mark every notifications as read
  /* const markAsRead = () => {
    notifications.map(notification => {
      const users = notification.read;
      if (users.indexOf(Auth.getUserID()) === -1) {
        users.push(Auth.getUserID());
        console.log(users);
        notifications.markAsRead(notification._id, users);
      }
      return true;
    });
  }; */

  return (
    <>
      {loaded && (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography
              className={classes.centerLink}
              variant="subheading"
              gutterBottom
              style={{
                color: "#21212",
                fontWeight: 700,
                padding: "1%"
              }}
            >
              Notificaciones
            </Typography>
            <List className={classes.root}>
              {notifications.length > 0 &&
                notifications.map(item => (
                  <ul>
                    <div className={classes.row}>
                      <AccountCircleIcon />

                      <Typography
                        variant="caption"
                        style={{ color: "#212121", padding: "1%" }}
                      >
                        <b>{item.nickname} </b>
                        {notificationDescriptionsManager[item.type]}
                        <br />
                        <b>
                          {moment(item.date)
                            .locale("es")
                            .format("LLLL")}
                        </b>
                      </Typography>
                      <NotificationButtons notification={item} />
                    </div>
                    <hr />
                  </ul>
                ))}
              <ul>
                <Divider />
                <div className={classes.centerLink}>
                  <div className={classes.imageContainer}>
                    <img className={classes.image} alt="" src={listEmpty} />
                  </div>
                </div>

                <Typography
                  className={classes.centerLink}
                  variant="caption"
                  gutterBottom
                  style={{ color: "#21212", fontWeight: 700, padding: "1%" }}
                >
                  No tienes mas notificaciones
                </Typography>
              </ul>
            </List>
          </Paper>
        </div>
      )}
      {!loaded && <CircularProgress />}
    </>
  );
};

export default withStyles(styles)(NotificationView);

import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "material-ui/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import Auth from "../../Auth/Auth";
import NotificationButtons from "./NotificationButtons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { notifications as notificacionsApi } from "../../../api/Notifications";
import { notificationDescriptionsManager } from "../../../constants/notificationTypes";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    paddingLeft: "20%",
    paddingRight: "20%",
    paddingTop: "2%",
    zIndex: 4,
    minHeigth: "500px",
    minWidth: "500px"
  },
  centerLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  rightLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    fontSize: "11px",
    paddingRight: "2%"
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
  }
});

const moment = require("moment");

const NotificationView = ({ classes }) => {
  const [notifications, setNotifications] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //Carga de Datos
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await notificacionsApi().getNotifications();
      setNotifications(response.notificacions);
      setLoaded(true);
    };
    asyncFunction();

    //eslint-disable-next-line
  }, []);

  //mark every notifications as read
  const markAsRead = () => {
    notifications.map(notification => {
      const users = notification.read;
      if (users.indexOf(Auth.getUserID()) === -1) {
        users.push(Auth.getUserID());
        console.log(users);
        notifications.markAsRead(notification._id, users);
      }
      return true;
    });
  };

  return (
    <>
      {loaded && (
        <div className={classes.root}>
          <Paper className={classes.root}>
            <Typography
              className={classes.centerLink}
              variant="subheading"
              gutterBottom
              style={{
                color: "#21212",
                fontWeight: 700,
                padding: "1%",
                zIndex: 2
              }}
            >
              Notificaciones
            </Typography>
            <hr />
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

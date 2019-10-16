import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "material-ui/Typography";
import NotificationTypes from "./notificationTypes";
import axios from "axios";
import handleServerResponse from "../../response";
import url from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import Auth from "../Auth/Auth";
import NotificationSaver from "./NotificationSaver";
import NotificationButtons from "./NotificationButtons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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

class NotificationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loaded: false
    };
  }

  //Carga de Datos
  componentWillMount() {
    axios.all([this.loadTripList()]).then(
      axios.spread(res1 => {
        if (res1 !== undefined) {
          this.setState({
            notifications: res1.data,
            loaded: true
          });
        }

        //mark every notifications as read
        this.markAsRead();
      })
    );
  }

  loadTripList() {
    return axios
      .get(url.api + "notifications", { params: { userId: Auth.getUserID() } })
      .catch(error => {
        handleServerResponse(
          error,
          "An error occured when getting the trips data"
        );
      });
  }

  //mark every notifications as read
  markAsRead() {
    this.state.notifications.map(notification => {
      const users = notification.read;
      if (users.indexOf(Auth.getUserID()) === -1) {
        users.push(Auth.getUserID());
        console.log(users);
        NotificationSaver.markAsRead(notification._id, users);
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.state.loaded ? (
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
                {this.state.notifications.length > 0
                  ? this.state.notifications.map(item => (
                      <ul>
                        <div className={classes.row}>
                          <AccountCircleIcon />

                          <Typography
                            variant="caption"
                            style={{ color: "#212121", padding: "1%" }}
                          >
                            <b>{item.nickname} </b>
                            {NotificationTypes.getNotificationText(item.type)}
                            <br />
                            <b>{moment(item.date).format("LLLL")}</b>
                          </Typography>
                          <NotificationButtons notification={item} />
                        </div>
                        <hr />
                      </ul>
                    ))
                  : null}
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
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(NotificationView);

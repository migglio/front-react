import React, { Fragment, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import Notifications from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Typography from "material-ui/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Auth from "../../Auth/Auth";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { notifications as notificationsApi } from "../../../api/Notifications";
import { notificationDescriptionsManager } from "../../../constants/notificationTypes";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    zIndex: 2
  },
  button: { color: "#fff" },
  centerLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "12px",
    padding: "2%"
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
    marginTop: theme.spacing.unit * 2
  }
});

const moment = require("moment");

let anchorEl = null;

const NotificationsMenu = props => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getNotifications = async () => {
    const response = await notificationsApi().getNotifications(
      Auth.getUserID()
    );
    setNotifications(response);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getNotifications();
  }, []);

  //mark every notifications as read
  const markAsRead = () => {
    notifications.map(notification => {
      const users = notification.read;
      if (users.indexOf(Auth.getUserID()) > -1) {
        users.push(Auth.getUserID());
        notifications.markAsRead(notification._id, users);
      }
      return true;
    });
  };

  const handleToggle = () => {
    setOpen(!open);
    setInvisible(true);
  };

  const handleClose = event => {
    setOpen(false);
    setInvisible(true);

    if (anchorEl.contains(event.target)) {
      return;
    }
  };

  const renderNotifications = () => {
    const { classes } = props;

    return (
      <Fragment>
        {loaded ? (
          <div>
            <Typography
              className={classes.root}
              variant="body1"
              gutterBottom
              style={{
                alignItems: "left",
                color: "#21212",
                fontWeight: 700,
                padding: "1%"
              }}
            >
              Notificaciones
            </Typography>
            <a className={classes.rightLink} href="/" onClick={markAsRead}>
              <Typography className={classes.rightLink} variant="body1">
                Marcar todas como leidas
              </Typography>
            </a>
            <hr />
            {notifications.length > 0 ? (
              notifications.map(item => (
                <div>
                  <MenuItem>
                    <AccountCircleIcon />

                    <Typography
                      variant="caption"
                      style={{ color: "#212121", padding: "1%" }}
                    >
                      <b>{item.nickname} </b>
                      {notificationDescriptionsManager[item.type]}
                      <br />
                      <b>{moment(item.date).format("LLLL")}</b>
                    </Typography>
                  </MenuItem>
                  <hr />
                </div>
              ))
            ) : (
              <div style={{ minWidth: "320px" }}>
                <Typography
                  className={classes.centerLink}
                  variant="subheading"
                  gutterBottom
                  style={{ color: "#21212", fontWeight: 700, padding: "1%" }}
                >
                  No tienes nuevas notificaciones
                </Typography>
                <hr />
              </div>
            )}
            <a className={classes.centerLink} href="/NotificationView">
              Ver todas
            </a>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <div>
        <Button
          className={classes.button}
          buttonRef={node => {
            anchorEl = node;
          }}
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {!invisible && notifications.length > 0 ? (
            <Badge
              color="error"
              badgeContent={notifications.length}
              className={classes.margin}
            >
              <Notifications />
            </Badge>
          ) : (
            <Notifications />
          )}
        </Button>
        <Popper
          open={open}
          placement={"bottom-end"}
          anchorEl={anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>{renderNotifications()}</MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withStyles(styles)(NotificationsMenu);

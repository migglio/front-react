import React, { useEffect, useState } from "react";
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
import { Divider } from "material-ui";
import { extensiveFormat } from "../../../libs/dateFormatter";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "center",
    zIndex: 2,
  },
  notificationsSize: {
    maxWidth: "90vw",
    maxHeight: "80vh",
    width: "400px",
    overflow: "auto",
  },
  title: {
    alignItems: "left",
    color: "#21212",
    fontWeight: 700,
    padding: "1%",
  },
  button: { color: "#fff" },
  centerLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "12px",
    padding: "2%",
  },
  rightLink: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    fontSize: "11px",
    paddingRight: "2%",
  },
  margin: {
    margin: theme.spacing.unit,
  },
  divider: {
    width: "100%",
  },
  row: {
    marginTop: theme.spacing.unit * 2,
  },
});

let anchorEl = null;

const NotificationsMenu = (props) => {
  const userLogged = Auth.getUserID();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getNotifications = async () => {
    const response = await notificationsApi().getNotificationsNotRead(
      Auth.getUserID()
    );
    setNotifications(response);
    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    if (userLogged) getNotifications();
  }, [userLogged]);

  //mark every notifications as read
  const markNotificationsAsRead = () => {
    notifications.map((notification) => {
      const users = notification.read;
      if (users.includes(Auth.getUserID())) {
        users.push(Auth.getUserID());
        notifications().putNotification(notification._id, users);
      }
      return true;
    });
  };

  const handleToggle = () => {
    setOpen(!open);
    setInvisible(true);
  };

  const handleClose = (event) => {
    setOpen(false);
    setInvisible(true);

    if (anchorEl.contains(event.target)) {
      return;
    }
  };

  const renderNotifications = () => {
    const { classes } = props;

    return (
      <div className={classes.notificationsSize}>
        {loaded ? (
          <>
            <Typography className={classes.title} variant="body1">
              Notificaciones
            </Typography>
            <a
              className={classes.rightLink}
              href="/"
              onClick={markNotificationsAsRead}
            >
              <Typography className={classes.rightLink} variant="body1">
                Marcar todas como leidas
              </Typography>
            </a>
            <Divider />

            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div>
                  <MenuItem>
                    <AccountCircleIcon />

                    <Typography
                      variant="caption"
                      style={{
                        color: "#212121",
                        padding: "1%",
                      }}
                    >
                      <b>{item.owner.nickname.toUpperCase()} </b>
                      {notificationDescriptionsManager[item.type]}
                      <br />
                      <b> {`${extensiveFormat(item.date)}`}</b>
                    </Typography>
                  </MenuItem>
                  <Divider />
                </div>
              ))
            ) : (
              <div style={{ minWidth: "320px" }}>
                <Typography
                  className={classes.centerLink}
                  variant="subheading"
                  style={{ color: "#21212", fontWeight: 700, padding: "8px" }}
                >
                  No tienes nuevas notificaciones
                </Typography>
                <Divider />
              </div>
            )}
            <a className={classes.centerLink} href="/NotificationView">
              Ver todas
            </a>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        buttonRef={(node) => {
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
                placement === "bottom" ? "center top" : "center bottom",
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
  );
};

export default withStyles(styles)(NotificationsMenu);

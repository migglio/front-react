import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import unicen from "../../../images/unicen.png";
const styles = theme => ({
  root: {
    display: "flex",
    paddingBottom: "3rem",
    paddingTop: "3rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232360",
    minHeight: "50vh"
  },
  container: {
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    "@media (min-width:1366px)": {
      alignItems: "normal"
    }
  },
  unicenInfo: {
    display: "flex",
    paddingTop: "1rem",
    color: theme.colours.white,
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  tesisDescription: {
    fontSize: "0.8rem",
    paddingTop: "0.5rem",
    paddingBottom: "3rem",
    color: theme.colours.white,
    lineHeight: "28px"
  },
  mainImage: {
    width: "15rem"
  },
  infoSection: {
    display: "flex",
    width: "100%",
    color: theme.colours.white,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    "@media (min-width:1366px)": {
      justifyContent: "baseline",
      textAlign: "left",
      alignItems: "flex-start",
      width: "25%"
    }
  },
  textGroup: {
    paddingBottom: "2rem"
  },
  title: {
    color: theme.colours.white,
    fontWeight: "bold",
    fontSize: "normal",
    lineHeight: "30px"
  },
  subtitle: {
    color: theme.colours.white,
    fontSize: "0.9rem",
    whiteSpace: "pre-line"
  }
});

const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.unicenInfo}>
          <div className={classes.infoSection}>
            <img className={classes.mainImage} src={unicen} alt="" />
            <Typography
              color="textPrimary"
              className={classes.tesisDescription}
            >
              {"2020 - Tesis de grado - Ingeniería de Sistemas"}
            </Typography>
          </div>
          <div className={classes.infoSection}>
            <TextGroup
              classes={classes}
              title={"Director"}
              subtitle={"Alejandro Zunino"}
            />
            <TextGroup
              classes={classes}
              title={"Codirector"}
              subtitle={"Daniela Godoy"}
            />
          </div>
          <div className={classes.infoSection}>
            <TextGroup
              classes={classes}
              title={"Autor"}
              subtitle={"Emiliano Migliorata"}
            />
            <TextGroup
              classes={classes}
              title={"Autor"}
              subtitle={"Juan Ricardo Dahl"}
            />
          </div>

          <div className={classes.infoSection}>
            <TextGroup
              classes={classes}
              title={"Contacto"}
              subtitle={"emigliorata@gmail.com \n juandahl20@gmail.com"}
            />
            <div className={classes.textGroup}>
              <a
                href={"http://www.exa.unicen.edu.ar"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Typography color="textPrimary" className={classes.subtitle}>
                  {"www.exa.unicen.edu.ar"}
                </Typography>
              </a>

              <a
                href={"http://www.unicen.edu.ar"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Typography color="textPrimary" className={classes.subtitle}>
                  {"www.unicen.edu.ar"}
                </Typography>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Footer);

const TextGroup = ({ classes, title, subtitle }) => {
  return (
    <div className={classes.textGroup}>
      <Typography color="textPrimary" className={classes.title}>
        {title}
      </Typography>
      <Typography
        display="initial"
        color="textPrimary"
        className={classes.subtitle}
      >
        {subtitle}
      </Typography>
    </div>
  );
};

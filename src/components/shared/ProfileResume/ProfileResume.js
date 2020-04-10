import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useEffect } from "react";
import { users } from "../../../api/Users";
import profile from "../../../images/profile.svg";
import ContentLoader from "react-content-loader";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  userDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageContainer: {
    width: "80%",
    "@media (min-width:768px)": {
      width: "350px",
    },
  },
  image: {
    width: "100%",
  },
});

const ProfileResume = ({ classes, ownerId }) => {
  const [nickname, setNickname] = useState(null);
  const [mail, setMail] = useState(null);
  const [countOfTrips, setCountOfTrips] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const getUser = async (id) => {
    const response = await users().getUser(id);
    setNickname(response.nickname);
    setMail(response.mail);
    setCountOfTrips(response.count);

    setLoaded(true);
  };

  //Carga de Datos
  useEffect(() => {
    getUser(ownerId);
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {!loaded && (
        <div className={classes.root}>
          <div
            style={{
              padding: "20px",
              width: "100%",
              height: "100%",
            }}
          >
            <ContentLoader
              style={{
                width: "100%",
                height: "100%",
              }}
              height={540}
              width={500}
              speed={1}
              primaryColor="#f7f8ff"
              secondaryColor="#d9e8df"
            >
              <rect x="40" y="0" rx="8" ry="8" width="450" height="20" />
              <rect x="40" y="30" rx="8" ry="8" width="450" height="500" />
            </ContentLoader>
          </div>
        </div>
      )}

      {loaded && (
        <div className={classes.userDataContainer}>
          <Typography
            variant="headline"
            gutterBottom
            style={{ color: "#054752", fontWeight: 700, padding: "0%" }}
          >
            {nickname}
          </Typography>
          <Typography
            variant="subheading"
            gutterBottom
            style={{ color: "#054752", fontWeight: 700, padding: "0%" }}
          >
            {mail}
          </Typography>

          <Typography variant="caption">
            {countOfTrips === 1
              ? `${countOfTrips} viaje publicado historicamente`
              : `${countOfTrips} viajes publicados historicamente`}
          </Typography>
          <div className={classes.imageContainer}>
            <img className={classes.image} alt="" src={profile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(ProfileResume);

import React, { useEffect, useState } from "react";
import DrawerContainer from "./DrawerContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { trips } from "../../api/Trips";

const queryString = require("query-string");

const TripList = ({ location }) => {
  const [tripList, setTripList] = useState([]);
  const data = queryString.parse(location.search);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await trips().getTrips(data);
      setTripList(response);
      setLoaded(true);
    };
    asyncFunction();
  }, [data]);

  return (
    <div
      style={{
        textAlign: "center",
        paddingLeft: "15%",
        paddingRight: "15%",
        "background-color": "#efefef",
        paddingTop: "1%"
      }}
    >
      {loaded ? (
        <DrawerContainer trips={tripList} data={data} />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default TripList;

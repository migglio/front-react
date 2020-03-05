import axios from "axios";
import url from "../config";

const users = () => {
  return {
    getUser: async id => {
      const response = await axios.get(url.api + "user/" + id);
      return response.data;
    },
    getUsers: async users => {
      const data = { users };
      const response = await axios.get(url.api + "user/expandedUsers", {
        params: data
      });
      return response.data;
    }
  };
};

export { users };

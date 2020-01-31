import axios from "axios";
import url from "../config";

const users = () => {
  return {
    getUser: async (id, data) => {
      const response = await axios.get(url.api + "user/" + id);

      return response;
    }
  };
};

export { users };

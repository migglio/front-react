import queryString from "query-string";
import { useLocation } from "react-router-dom";

const useGetUrlParam = param => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  return params[param];
};

export default useGetUrlParam;

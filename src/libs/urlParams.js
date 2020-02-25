import queryString from "query-string";
import { useLocation } from "react-router-dom";

const useGetUrlParam = param => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  return params[param];
};

const useGetPath = position => {
  const pathname = useLocation().pathname;
  const id = pathname.split("/")[position];
  return id;
};

export default useGetUrlParam;
export { useGetPath };

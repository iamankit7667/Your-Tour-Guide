import axios from "axios";

const getBaseUrl = () => {
  let url = "http://localhost:9000/";
  return url;
};

export default axios.create({
  baseURL: getBaseUrl(),
});

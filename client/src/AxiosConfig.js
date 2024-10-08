import axios from "axios";

const getBaseUrl = () => {
  let url;
  // switch ("production") {
    switch ("development") {
    case "production":
      url = "https://backend-your-tour-guide.onrender.com/";
      break;
    case "development":
    default:
      url = "http://localhost:9000/";
  }
  return url;
};

export default axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000,
});


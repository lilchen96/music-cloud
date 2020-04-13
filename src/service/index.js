import axios from "axios";
import api from "@/service/api";

axios.defaults.baseURL = "";

export default options => {
  axios({
    ...options,
    url: api[options.url]
  });
};

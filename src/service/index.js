import axios from "axios";
import api from "@/service/api";

axios.defaults.baseURL = "";

export default options =>
    axios({
        ...options,
        url: api[options.url],
        timeout: 1000 // 超时时间设置1min
    });

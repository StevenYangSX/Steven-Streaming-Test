import axios from "axios";

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: "https://api.twitch.tv/",
  timeout: 3000, // 请求超时时间
});

export default axiosInstance;

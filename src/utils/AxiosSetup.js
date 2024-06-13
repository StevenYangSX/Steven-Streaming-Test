import axiosInstance from "./HttpRequest";

const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      //     const currentUserInfo = store.getState().userInfoReducer.userInfo;
      //     const userToken = store.getState().userInfoReducer.token;
      //   if (currentUserInfo && userToken && config.url !== "/health") {
      //     config.headers["Authorization"] = "Bearer " + userToken;
      //   }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("respoins axios ", response);
      const ApiStatusCode = response.status;
      switch (ApiStatusCode) {
        case 200:
          return response.data;
        // [ 示例 ] code === 0 代表没有错误
        case 400:
          return Promise.reject(response.data || { msg: "未知错误" });
        case 40000:
        case 400001:
        case 400011:
        case 400012:
          //return Promise.reject(response.data || { msg: "未知错误" });
          return Promise.reject(response.data || { msg: "未知错误" });
        // [ 示例 ] 其它和后台约定的 code
        // errorCreate(response.data.msg);
        // break;
        case 410000:
        case 410001:
        case 410002:
        case 410003:
        case 52000:
        case 51000:
        case 50000:
          return Promise.reject(response.data || { message: "Unknown Error!" });
        default:
          break;
      }
    },
    (error) => {
      // const navigate = useNavigate();
      if (error && !error.response) {
        return Promise.reject(error);
      }
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            return Promise.reject("error.response.data");
            break;
          case 401:
            return Promise.reject("Authentication Failed. Please Login");
          case 40000:
            error.message = "未授权，请登录";
            break;
          case 403:
            return Promise.reject({ message: "No permission for this API" });
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`;
            break;
          case 408:
            error.message = "请求超时";
            break;
          case 500:
            error.message = "服务器内部错误";
            break;
          case 501:
            error.message = "服务未实现";
            break;
          case 502:
            error.message = "网关错误";
            break;
          case 503:
            error.message = "服务不可用";
            break;
          case 504:
            error.message = "网关超时";
            break;
          case 505:
            error.message = "HTTP版本不受支持";
            break;
          default:
            break;
        }
      }
    }
  );
};

export default setupAxiosInterceptors;

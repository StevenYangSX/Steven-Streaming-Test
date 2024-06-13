import axiosInstance from "../utils/HttpRequest";

export const appAuthApi = () => {
  return axiosInstance({
    url: "https://id.twitch.tv/oauth2/token",
    method: "post",
    data,
  });
};

export const getStreamsListApi = () => {
  return axiosInstance({
    url: "helix/streams",
    method: "get",
  });
};

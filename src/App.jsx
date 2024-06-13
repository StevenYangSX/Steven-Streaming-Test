import { useState, useEffect } from "react";
import setupAxiosInterceptors from "./utils/AxiosSetup";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import useTwitchAuth from "./customHooks/UseTwitchAuth";
import axiosInstance from "./utils/HttpRequest";
import { getStreamsListApi } from "./api/publicApi";
import { Route, Routes } from "react-router-dom";
import StreamRoom from "./pages/streamRoom/StreamRoom";
function App() {
  const { token, error } = useTwitchAuth();
  const [isAuthed, setIsAuthend] = useState(false);
  const [streamList, setStreamList] = useState([]);
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  useEffect(() => {
    if (token) {
      console.log("check token", token);
      axiosInstance.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = "Bearer " + token;
          config.headers["Client-ID"] = "wd13hz6ux9rnld70b6fmzk38t9xget";
          return config;
        },
        (error) => {
          console.log("eeeee", error);
          Promise.reject(error);
        }
      );
      setIsAuthend(true);
    }
  }, [token]);

  useEffect(() => {
    const fetchStreamList = async () => {
      const response = await getStreamsListApi();
      setStreamList(response.data);
    };
    if (isAuthed) {
      fetchStreamList();
    }
  }, [isAuthed]);

  return (
    <>
      <Routes>
        <Route index element={<HomePage streamList={streamList} />} />
        <Route path="/live/:userName" element={<StreamRoom />} />
      </Routes>
    </>
  );
}

export default App;

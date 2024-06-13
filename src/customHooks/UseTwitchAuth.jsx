import { useState, useEffect } from "react";
import axios from "axios";

const useTwitchAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem("twitch-token"));
  const [error, setError] = useState(null);

  const CLIENT_ID = "wd13hz6ux9rnld70b6fmzk38t9xget";

  const CLIENT_SECRET = "t7e39jplqvpiw935221f6ehpfhmem3";

  const GRANT_TYPE = "client_credentials";

  useEffect(() => {
    const fetchToken = async () => {
      const url = "https://id.twitch.tv/oauth2/token";
      const params = new URLSearchParams();
      params.append("client_id", CLIENT_ID);
      params.append("client_secret", CLIENT_SECRET);
      params.append("grant_type", GRANT_TYPE);

      try {
        const response = await axios.post(url, params);

        setToken(response.data.access_token);
        localStorage.setItem("twitch-token", response.data.access_token);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      }
    };

    if (!token) {
      fetchToken();
    }
  }, []);

  return { token, error };
};
export default useTwitchAuth;

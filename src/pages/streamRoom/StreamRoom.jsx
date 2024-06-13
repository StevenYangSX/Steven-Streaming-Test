import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
const StreamRoom = () => {
  let { userName } = useParams();
  return (
    <>
      <ReactPlayer
        url={`https://www.twitch.tv/${userName}`}
        controls
        width="100%"
        height="80vh"
        playing={true}
      />
    </>
  );
};

export default StreamRoom;

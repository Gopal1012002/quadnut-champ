import React, { useState } from "react";
import "../../assets/css/video-player.css";
import { FaSquareCaretLeft, FaSquareCaretRight } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const TextReader = ({ text, playNextVideo, playPrevVideo }) => {

  return (
    <div className="container-fluid height-pdf-viewer" onContextMenu={(e) => e.preventDefault()}>
      {/* <div className="left-play-button">
          <GrFormPrevious size={35} onClick={playPrevVideo} />
        </div>
        <div className="right-play-button">
          <GrFormNext size={35} onClick={playNextVideo} />
        </div> */}
      <div
        className="pdf-viewer-container height-pdf-viewer  p-2"
        style={{
          height: "100vh", // Adjust as needed
          overflowY: "scroll",
          border: "1px solid #ccc", // Optional: for visual clarity
        //   textAlign:"center"
          
        }}
      >
        
        <div dangerouslySetInnerHTML={{__html:text}} />
      </div>
    </div>
  );
};

export default TextReader;

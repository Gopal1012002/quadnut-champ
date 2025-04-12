import React, { useEffect, useState, useRef } from "react";
import "../../assets/css/video-player.css";
import useVideoPlayer from "../../hooks/useVideoPlayer";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import {
  IoPause,
  IoPauseSharp,
  IoPlay,
  IoPlaySharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Circles } from "react-loader-spinner";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";

const VideoPlayer = (props) => {
  const videoElement = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
  } = useVideoPlayer(videoElement, {
    previewDuration: props?.previewDuration,
    videoComplete: props?.videoComplete,
  });

  useEffect(() => {
    if (props.play) {
      togglePlay();
    }
  }, []);

  return (
    <div className="container-fluid" onContextMenu={(e) => e.preventDefault()}>
      <div className="video-wrapper">
        {isLoading && (
          <div
            className="loader-container"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <Circles
              height="80"
              width="80"
              color="black"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <div className="left-play-button">
          <GrFormPrevious size={35} onClick={props.playPrevVideo} />
        </div>
        <div className="right-play-button">
          <GrFormNext size={35} onClick={props.playNextVideo} />
        </div>
        <video
          // onCanPlayThrough={handleVideoLoaded}
          onLoadStart={() => setIsLoading(true)}
          onLoadedMetadata={() => setIsLoading(false)}
          src={props.video}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          controlsList="nodownload"
          style={
            isLoading ? { visibility: "hidden" } : { visibility: "visible" }
          }
        ></video>
        <div className="controls bg-dark">
          <input
            type="range"
            min="0"
            max="100"
            className="w-100 custom-range"
            value={isNaN(playerState.progress) ? 0 : playerState.progress ?? 0}
            onChange={(e) => handleVideoProgress(e)}
          />
          <div className="prev-btn play-btn">
            <TbPlayerTrackPrevFilled onClick={props.playPrevVideo} />
          </div>
          <div className="play-btn" onClick={togglePlay}>
            {!playerState.isPlaying ? <IoPlay /> : <IoPause />}
          </div>
          <div className="next-btn play-btn">
            <TbPlayerTrackNextFilled  onClick={props.playNextVideo} />
          </div>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
          </button>
          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option className="speed" value="0.50">
              0.50x
            </option>
            <option className="speed" value="0.75">
              0.75x
            </option>
            <option className="speed" value="1">
              {/* <BsSpeedometer color="white" /> */}
              1x
            </option>
            <option className="speed" value="1.25">
              1.25x
            </option>
            <option className="speed" value="2">
              2x
            </option>
            <option className="speed" value="3">
              3x
            </option>
            <option className="speed" value="4">
              4x
            </option>
          </select>
          <div className="screen-btn play-btn" onClick={toggleFullscreen}>
            <MdFullscreen />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

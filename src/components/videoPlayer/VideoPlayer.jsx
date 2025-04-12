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
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { FaPause, FaPlay, FaPlayCircle } from "react-icons/fa";
import { BsSpeedometer } from "react-icons/bs";

const VideoPlayer = (props) => {
  const videoElement = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  let hideControlsTimeout;

  // Show controls
  const handleMouseMove = () => {
    setShowControls(true);
  };

  // Ensure controls disappear when mouse leaves
  const handleMouseLeave = () => {
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 1000);
    // setShowControls(false);
  };
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
    handlAudioChange,
    currentTimeStamps,
    totalTimeStamps
  } = useVideoPlayer(videoElement, {
    previewDuration: props?.previewDuration,
    videoComplete: props?.videoComplete,
  });

  useEffect(() => {
    if (props.play) {
      togglePlay();
    }
  }, []);
  useEffect(()=>{
    const sliderEl = document.getElementById("sliderEl");
    const tempSliderValue = 0.5;
    const progress = (tempSliderValue / sliderEl.max) * 100;
    sliderEl.style.background = `linear-gradient(to right, red ${progress}%, #ccc ${progress}%)`;
  },[])
  const handleAudioChange = (event) => {
    const sliderEl = document.getElementById("sliderEl");
    const tempSliderValue = event.target.value;
    const progress = (tempSliderValue / sliderEl.max) * 100;
    sliderEl.style.background = `linear-gradient(to right, red ${progress}%, #ccc ${progress}%)`;
    handlAudioChange(event);
  };

  return (
    <div className="container-fluid" onContextMenu={(e) => e.preventDefault()}>
      <div className="video-wrapper" onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
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
        <div className="middle-play-button">
          <div className={`play-btn-wrapper ${showControls ? "visible-controls" : "hidden-controls"}` } >
            {
            !playerState.isPlaying ? 
              <FaPlay  className="center-play-btn-icon"  onClick={togglePlay} /> : 
              <FaPause  className="center-play-btn-icon"  onClick={togglePlay}  />
            }
            
          </div>
        </div>
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
        <div 
        className={`controls background-low-opacity ${showControls ? "visible-controls" : "hidden-controls"}`}
        >
          <input
            type="range"
            min="0"
            max="100"
            className="w-100 custom-range-bar"
            value={isNaN(playerState.progress) ? 0 : playerState.progress ?? 0}
            onChange={(e) => handleVideoProgress(e)}
          />
          <div className="control-division">
            <div className="control-left">
              <button className="mute-btn" onClick={toggleMute}>
                {!playerState.isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
              </button>
              <div className="sound-recorder d-flex align-items-center">
                <input
                  type="range"
                  min="0"
                  defaultValue={0.5}
                  max="1"
                  step="any"
                  onChange={handleAudioChange}
                  id="sliderEl"
                  className="sound-recorder-bar"
                />
              </div>
              <div className="timestamps-front">
                {currentTimeStamps == 0 ?  `00:00` : currentTimeStamps} / {totalTimeStamps == 0 ? `00:00` : totalTimeStamps}
              </div>
            </div>
            <div className="control-middle">
              <div className="prev-btn play-btn">
                <TbPlayerTrackPrevFilled onClick={props.playPrevVideo} />
              </div>
              <div className="play-btn" onClick={togglePlay}>
                {!playerState.isPlaying ? <IoPlay /> : <IoPause />}
              </div>
              <div className="next-btn play-btn">
                <TbPlayerTrackNextFilled onClick={props.playNextVideo} />
              </div>
            </div>
            <div className="control-right">
              <select
                className="velocity-dropdown"
                value={playerState.speed}
                onChange={(e) => handleVideoSpeed(e)}
              >
                <option className="speed-option" value="0.50">
                  0.50x
                </option>
                <option className="speed-option" value="0.75">
                  0.75x
                </option>
                <option className="speed-option" value="1">
                  1x
                </option>
                <option className="speed-option" value="1.25">
                  1.25x
                </option>
                <option className="speed-option" value="2">
                  2x
                </option>
                <option className="speed-option" value="3">
                  3x
                </option>
                <option className="speed-option" value="4">
                  4x
                </option>
              </select>
              <div className="screen-btn play-btn" onClick={toggleFullscreen}>
                <MdFullscreen />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

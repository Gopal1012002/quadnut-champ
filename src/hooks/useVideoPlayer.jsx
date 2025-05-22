import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { formatTime } from "../utils/dynamic.util";

const useVideoPlayer = (videoElement, props) => {
  const [currentTimeStamps, setCurrentTimeStamps] = useState(0);
  const [totalTimeStamps, setTotalTimeStamps] = useState(0);
  const onCompletePreview = () => {
    Swal.fire({
      title: "Your Preview Has Ended!",
      text: "Thank you for watching the preview. To continue, please proceed with the full content.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06AE92",
      cancelButtonColor: "#364a63",
      confirmButtonText: props?.isPurchased ? "Watch Here" : "Upgrade Now",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        props.handleEnroll();
      }
    });
  };

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  const togglePlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));

  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    if (!videoElement.current) return;

    const currentTime = videoElement.current.currentTime || 0; // Default to 0 if undefined
    const duration = videoElement.current.duration || 0; // Default to 0 if undefined
    const totalTime = formatTime(duration);
    const currentTimeStamp = formatTime(currentTime);
    // Update state
    setTotalTimeStamps(totalTime);
    setCurrentTimeStamps(currentTimeStamp);
    const progress = (currentTime / duration) * 100;
    setPlayerState((prevState) => ({
      ...prevState,
      progress,
    }));
    if (duration == 0) {
      setPlayerState((prevState) => ({
        ...prevState,
        progress: 0,
      }));
    }

    // Pause and show alert if the preview duration is exceeded
    if (props.previewDuration && props.previewDuration != -1 && currentTime >= (props.previewDuration * 60)) {
      // videoElement.current.pause();
      // videoElement.current.currentTime = props.previewDuration;
      videoElement.current.pause();
      setPlayerState((prevState) => ({
        ...prevState,
        isPlaying: false,
      }));

      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      onCompletePreview();
    }
    if (duration == currentTime) {
      if (duration && currentTime) {
        props.videoComplete();
      }
      videoElement.current.pause();
      setPlayerState((prevState) => ({
        ...prevState,
        isPlaying: false,
        progress: 0,
      }));
    }
  };

  const handlAudioChange = (e) => {
    if (e.target.value == 0) {
      makeMute();
    } else {
      unMute();
    }
    videoElement.current.volume = e.target.value;
  }

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    setPlayerState((prevState) => ({
      ...prevState,
      progress: manualChange,
    }));
    const value = event.target.value;
    setPlayerState((prev) => ({ ...prev, progress: value }));

    const percentage = (value / 100) * 100;

    event.target.style.background = `linear-gradient(to right, red 0%, red ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState((prevState) => ({
      ...prevState,
      speed,
    }));
  };

  const toggleMute = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMuted: !prevState.isMuted,
    }));
  };

  const unMute = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMuted: false,
    }));
  };

  const makeMute = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isMuted: true,
    }));
  }

  const toggleFullscreen = () => {
    if (videoElement.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoElement.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  useEffect(() => {
    const video = videoElement.current;
    if (video) {
      video.addEventListener("timeupdate", handleOnTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleOnTimeUpdate);
      };
    }
  }, [videoElement, handleOnTimeUpdate]);

  return {
    playerState,
    togglePlay,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    toggleFullscreen,
    handlAudioChange,
    totalTimeStamps,
    currentTimeStamps
  };
};

export default useVideoPlayer;
